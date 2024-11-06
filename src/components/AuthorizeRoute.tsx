import { useEffect } from 'react';
import { useAuthorized, useAuthContext, useNavigate, inject } from '@/react-utils';
import { DASHBOARD_ROUTE } from '@/keys.ts';
import { LOGIN_ROUTE, UNAUTHORIZED_ROUTE } from '@identity/urls.ts';
import type { AuthorizeContentProps } from '@/react-ui';
import type { PropsWithChildren, ReactNode } from 'react';

export type AuthorizeRouteProps = Pick<AuthorizeContentProps, 'any'|'roles'> & {
	mustBeLoggedOut?: boolean
}

export default function AuthorizeRoute(props: PropsWithChildren<AuthorizeRouteProps>) {
	const { roles, any, mustBeLoggedOut, children } = props;
	const navigate = useNavigate();
	const authContext = useAuthContext();
	const { isLoggedIn } = authContext;
	const isAuthorized = useAuthorized(roles, any);

	useEffect(() => {
		const authorized = mustBeLoggedOut ? !isLoggedIn : isAuthorized;
		if (authorized) return;

		if (mustBeLoggedOut) {
			navigate(DASHBOARD_ROUTE);
		} else {
			let route = isLoggedIn
				? inject(UNAUTHORIZED_ROUTE)
				: inject(LOGIN_ROUTE);

			if (window.location.pathname === inject(LOGIN_ROUTE)) {
				return;
			}

			navigate(`${route}?returnUrl=${window.location.pathname}`);
		}
	}, [isAuthorized]);

	let output: ReactNode|null;
	if (mustBeLoggedOut) output = isAuthorized ? null : children;
	else output = isAuthorized ? children : null;
	return <>{output}</>;
}