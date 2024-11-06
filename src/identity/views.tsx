import { inject, registerRoutes } from '@/react-utils';
import { DASHBOARD_LAYOUT, DASHBOARD_NARROW_LAYOUT } from '@/keys.ts';
import * as ROUTES from '@identity/urls.ts';
import AuthorizeRoute from '@/components/AuthorizeRoute.tsx';
import { roles } from '@/constants.ts';

import Register from '@identity/views/account/register/Index.tsx';
import RegisterSuccessful from '@identity/views/account/register/Successful.tsx';
import Confirm from '@identity/views/account/confirm/Index.tsx';
import ConfirmSuccessful from '@identity/views/account/confirm/Successful.tsx';
import Login from '@identity/views/account/Login.tsx';
import ForgotPassword from '@identity/views/account/forgot-password/Index';
import ForgotPasswordSuccessful from '@identity/views/account/forgot-password/Successful';
import ResetPassword from '@identity/views/account/reset-password/Index';
import ResetPasswordSuccessful from '@identity/views/account/reset-password/Successful';
import ChangeEmail from '@identity/views/account/change-email/Index';
import ChangeEmailRequested from '@identity/views/account/change-email/Requested';
import ChangeEmailConfirm from '@identity/views/account/change-email/Confirm';
import ChangeEmailSuccessful from '@identity/views/account/change-email/Successful';
import ChangePassword from '@identity/views/account/change-password/Index';
import ChangePasswordSuccessful from '@identity/views/account/change-password/Successful';
import PersonalData from '@identity/views/account/PersonalData';
import DeleteAccount from '@identity/views/account/Delete';
import Deleted from '@identity/views/account/Deleted';
import UserIndex from '@identity/views/users/Index.tsx';
import LockoutReasonIndex from '@identity/views/lockout-reasons/Index.tsx';
import UserUpsert from '@identity/views/users/Upsert.tsx';
import UserRoles from '@identity/views/users/Roles.tsx';
import UserLock from '@identity/views/users/Lock.tsx';
import LockoutReasonUpsert from '@identity/views/lockout-reasons/Upsert.tsx';
import Unauthorized from '@identity/views/Unauthorized.tsx';

import type { ReactNode } from 'react';
import type { InjectionKey } from '@/react-utils';

export const CHANGE_EMAIL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_CONFIRM_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_REQUESTED_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CONFIRM_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CONFIRM_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const DELETE_ACCOUNT_VIEW = Symbol() as InjectionKey<ReactNode>;
export const DELETED_VIEW = Symbol() as InjectionKey<ReactNode>;
export const FORGOT_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const FORGOT_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const LOGIN_VIEW = Symbol() as InjectionKey<ReactNode>;
export const PERSONAL_DATA_VIEW = Symbol() as InjectionKey<ReactNode>;
export const REGISTER_VIEW = Symbol() as InjectionKey<ReactNode>;
export const REGISTER_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const RESET_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const RESET_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const UNAUTHORIZED_VIEW = Symbol() as InjectionKey<ReactNode>;

export const USERS_UPSERT_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_ROLES_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_LOCK_VIEW = Symbol() as InjectionKey<ReactNode>;

export const LOCKOUT_REASONS_UPSERT_VIEW = Symbol() as InjectionKey<ReactNode>;

export function setupIdentityViews() {
	registerRoutes(
		DASHBOARD_LAYOUT,
		{
			path: inject(ROUTES.USERS_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(USERS_UPSERT_VIEW, true) ?? <UserIndex/>}
				</AuthorizeRoute>
			)
		},
		{
			path: inject(ROUTES.LOCKOUT_REASONS_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(LOCKOUT_REASONS_UPSERT_VIEW, true) ?? <LockoutReasonIndex/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.REGISTER_ROUTE),
			element: inject(REGISTER_VIEW, true) ?? <Register/>
		},
		{
			path: inject(ROUTES.REGISTER_SUCCESSFUL_ROUTE),
			element: inject(REGISTER_SUCCESSFUL_VIEW, true) ?? <RegisterSuccessful/>
		},
		{
			path: inject(ROUTES.CONFIRM_ROUTE),
			element: inject(CONFIRM_VIEW, true) ?? <Confirm/>
		},
		{
			path: inject(ROUTES.CONFIRM_SUCCESSFUL_ROUTE),
			element: inject(CONFIRM_SUCCESSFUL_VIEW, true) ?? <ConfirmSuccessful/>
		},
		{
			path: inject(ROUTES.LOGIN_ROUTE),
			element: inject(LOGIN_VIEW, true) ?? <Login/>
		},
		{
			path: inject(ROUTES.FORGOT_PASSWORD_ROUTE),
			element: inject(FORGOT_PASSWORD_VIEW, true) ?? <ForgotPassword/>
		},
		{
			path: inject(ROUTES.FORGOT_PASSWORD_SUCCESSFUL_ROUTE),
			element: inject(FORGOT_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ForgotPasswordSuccessful/>
		},
		{
			path: inject(ROUTES.RESET_PASSWORD_ROUTE),
			element: inject(RESET_PASSWORD_VIEW, true) ?? <ResetPassword/>
		},
		{
			path: inject(ROUTES.RESET_PASSWORD_SUCCESSFUL_ROUTE),
			element: inject(RESET_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ResetPasswordSuccessful/>
		},
		{
			path: inject(ROUTES.CHANGE_EMAIL_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(CHANGE_EMAIL_VIEW, true) ?? <ChangeEmail/>}
				</AuthorizeRoute>
			)
		},
		{
			path: inject(ROUTES.CHANGE_EMAIL_REQUESTED_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(CHANGE_EMAIL_REQUESTED_VIEW, true) ?? <ChangeEmailRequested/>}
				</AuthorizeRoute>
			)
		},
		{
			path: inject(ROUTES.CHANGE_EMAIL_CONFIRM_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(CHANGE_EMAIL_CONFIRM_VIEW, true) ?? <ChangeEmailConfirm/>}
				</AuthorizeRoute>
			)
		},
		{
			path: inject(ROUTES.CHANGE_EMAIL_SUCCESSFUL_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(CHANGE_EMAIL_SUCCESSFUL_VIEW, true) ?? <ChangeEmailSuccessful/>}
				</AuthorizeRoute>
			)
		},
		{
			path: inject(ROUTES.CHANGE_PASSWORD_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(CHANGE_PASSWORD_VIEW, true) ?? <ChangePassword/>}
				</AuthorizeRoute>
			)
		},
		{
			path: inject(ROUTES.CHANGE_PASSWORD_SUCCESSFUL_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(CHANGE_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ChangePasswordSuccessful/>}
				</AuthorizeRoute>
			)
		},
		{
			path: inject(ROUTES.PERSONAL_DATA_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(PERSONAL_DATA_VIEW, true) ?? <PersonalData/>}
				</AuthorizeRoute>
			)
		},
		{
			path: inject(ROUTES.DELETE_ACCOUNT_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(DELETE_ACCOUNT_VIEW, true) ?? <DeleteAccount/>}
				</AuthorizeRoute>
			)
		},
		{
			path: inject(ROUTES.DELETED_ROUTE),
			element: inject(DELETED_VIEW, true) ?? <Deleted/>
		},
		{
			path: inject(ROUTES.USERS_ADD_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(USERS_UPSERT_VIEW, true) ?? <UserUpsert/>}
				</AuthorizeRoute>
			)
		},
		{
			path: `${inject(ROUTES.USERS_ROUTE)}/:id`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(USERS_UPSERT_VIEW, true) ?? <UserUpsert/>}
				</AuthorizeRoute>
			)
		},
		{
			path: `${inject(ROUTES.USERS_ROUTE)}/:id/roles`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(USERS_ROLES_VIEW, true) ?? <UserRoles/>}
				</AuthorizeRoute>
			)
		},
		{
			path: `${inject(ROUTES.USERS_ROUTE)}/:id/lock`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(USERS_LOCK_VIEW, true) ?? <UserLock/>}
				</AuthorizeRoute>
			)
		},
		{
			path: inject(ROUTES.LOCKOUT_REASONS_ADD_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(LOCKOUT_REASONS_UPSERT_VIEW, true) ?? <LockoutReasonUpsert/>}
				</AuthorizeRoute>
			)
		},
		{
			path: `${inject(ROUTES.LOCKOUT_REASONS_ROUTE)}/:id`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(LOCKOUT_REASONS_UPSERT_VIEW, true) ?? <LockoutReasonUpsert/>}
				</AuthorizeRoute>
			)
		},
		{
			path: `${inject(ROUTES.UNAUTHORIZED_ROUTE)}`,
			element: inject(UNAUTHORIZED_VIEW, true) ?? <Unauthorized/>
		}
	);
}