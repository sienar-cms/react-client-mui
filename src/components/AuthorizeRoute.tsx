﻿import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorized, useAuthContext, inject } from '@/react-utils';
import { DASHBOARD_ROUTE } from '@/keys.ts';
import { LOGIN_ROUTE, UNAUTHORIZED_ROUTE } from '@/account/keys.ts';
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
		const routeName = mustBeLoggedOut
			? DASHBOARD_ROUTE
			: isLoggedIn ? UNAUTHORIZED_ROUTE : LOGIN_ROUTE;
		if (!authorized) navigate(inject(routeName));
	}, [isAuthorized]);

	let output: ReactNode|null;
	if (mustBeLoggedOut) output = isAuthorized ? null : children;
	else output = isAuthorized ? children : null;
	return <>{output}</>;
}