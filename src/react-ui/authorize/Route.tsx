import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorized, useIsLoggedInSelector, SIENAR_URLS, inject } from '@/react-utils';
import type { AuthorizeContentProps } from './Content';
import type { PropsWithChildren, ReactNode } from 'react';

export type AuthorizeRouteProps = Pick<AuthorizeContentProps, 'any'|'roles'> & {
	mustBeLoggedOut?: boolean
}

export default function Route(props: PropsWithChildren<AuthorizeRouteProps>) {
	const { roles, any, mustBeLoggedOut, children } = props;
	const navigate = useNavigate();
	const isLoggedIn = useIsLoggedInSelector();
	const isAuthorized = useAuthorized(roles, any);

	useEffect(() => {
		const authorized = mustBeLoggedOut ? !isLoggedIn : isAuthorized;
		const routeName = mustBeLoggedOut
			? SIENAR_URLS.DASHBOARD
			: isLoggedIn ? SIENAR_URLS.UNAUTHORIZED : SIENAR_URLS.LOGIN;
		if (!authorized) navigate(inject(routeName));
	}, [isAuthorized]);

	let output: ReactNode|null;
	if (mustBeLoggedOut) output = isAuthorized ? null : children;
	else output = isAuthorized ? children : null;
	return <>{output}</>;
}