import { useEffect, useState } from 'react';
import { StatusPage } from '@/react-ui';
import { useAuthorized, useAuthContext, useNavigate, inject } from '@/react-utils';
import { LOGIN_ROUTE, UNAUTHORIZED_ROUTE } from '@identity/urls.ts';
import type { AuthorizeProps } from '@/react-utils/components/Authorize.tsx';
import type { PropsWithChildren } from 'react';

export type AuthorizeRouteProps = Pick<AuthorizeProps, 'any'|'roles'> & {
	mustBeLoggedOut?: boolean
}

export default function AuthorizeRoute(props: PropsWithChildren<AuthorizeRouteProps>) {
	const { roles, any, mustBeLoggedOut, children } = props;
	const navigate = useNavigate();
	const authContext = useAuthContext();
	const { isLoggedIn } = authContext;
	const isAuthorizedToApp = useAuthorized(roles, any);
	const [ secondsUntilRedirect, setSecondsUntilRedirect ] = useState(5);
	const isAuthorizedToViewPage = mustBeLoggedOut ? !isLoggedIn : isAuthorizedToApp;

	useEffect(() => {
		if (isAuthorizedToViewPage) return;

		if (secondsUntilRedirect > 0) {
			const timeoutId = setTimeout(() => setSecondsUntilRedirect(secondsUntilRedirect - 1), 1000);
			return () => clearTimeout(timeoutId);
		}

		if (mustBeLoggedOut) {
			navigate(UNAUTHORIZED_ROUTE);
		} else {
			let route = isLoggedIn
				? inject(UNAUTHORIZED_ROUTE)
				: inject(LOGIN_ROUTE);

			if (window.location.pathname === inject(LOGIN_ROUTE)) {
				return;
			}

			navigate(`${route}?returnUrl=${window.location.pathname}`);
		}

	}, [isAuthorizedToApp, secondsUntilRedirect]);

	if (isAuthorizedToViewPage) return <>{children}</>;

	let pageTitle: string;
	let pageContent: string;
	let pageName: string;

	switch (true) {
		default:
			pageTitle = 'You must be logged in';
			pageContent = 'You must be logged in to view this page.';
			pageName = 'login';
			break;
	}

	return (
		<StatusPage title={pageTitle}>
			{pageContent} You will be redirected to the {pageName} page in {secondsUntilRedirect} second{secondsUntilRedirect !== 1 && 's'}.
		</StatusPage>
	);
}