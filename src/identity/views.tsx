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

export const CHANGE_EMAIL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_EMAIL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_CONFIRM_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_EMAIL_CONFIRM_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_REQUESTED_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_EMAIL_REQUESTED_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_EMAIL_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_PASSWORD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_PASSWORD_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CONFIRM_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CONFIRM_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CONFIRM_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CONFIRM_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const DELETE_ACCOUNT_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const DELETE_ACCOUNT_VIEW = Symbol() as InjectionKey<ReactNode>;
export const DELETED_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const DELETED_VIEW = Symbol() as InjectionKey<ReactNode>;
export const FORGOT_PASSWORD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const FORGOT_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const FORGOT_PASSWORD_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const FORGOT_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const LOGIN_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const LOGIN_VIEW = Symbol() as InjectionKey<ReactNode>;
export const PERSONAL_DATA_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const PERSONAL_DATA_VIEW = Symbol() as InjectionKey<ReactNode>;
export const REGISTER_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const REGISTER_VIEW = Symbol() as InjectionKey<ReactNode>;
export const REGISTER_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const REGISTER_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const RESET_PASSWORD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const RESET_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const RESET_PASSWORD_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const RESET_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const UNAUTHORIZED_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const UNAUTHORIZED_VIEW = Symbol() as InjectionKey<ReactNode>;

export const USERS_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_ADD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_ADD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_EDIT_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_EDIT_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_ROLES_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_ROLES_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_LOCK_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_LOCK_VIEW = Symbol() as InjectionKey<ReactNode>;

export const LOCKOUT_REASONS_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const LOCKOUT_REASONS_VIEW = Symbol() as InjectionKey<ReactNode>;
export const LOCKOUT_REASONS_ADD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const LOCKOUT_REASONS_ADD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const LOCKOUT_REASONS_EDIT_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const LOCKOUT_REASONS_EDIT_VIEW = Symbol() as InjectionKey<ReactNode>;

export function setupIdentityViews() {
	registerRoutes(
		inject(USERS_LAYOUT, true) ?? DASHBOARD_LAYOUT,
		{
			path: inject(ROUTES.USERS_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(USERS_VIEW, true) ?? <UserIndex/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(LOCKOUT_REASONS_LAYOUT, true) ?? DASHBOARD_LAYOUT,
		{
			path: inject(ROUTES.LOCKOUT_REASONS_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(LOCKOUT_REASONS_VIEW, true) ?? <LockoutReasonIndex/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(REGISTER_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.REGISTER_ROUTE),
			element: (
				<AuthorizeRoute mustBeLoggedOut>
					{inject(REGISTER_VIEW, true) ?? <Register/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(REGISTER_SUCCESSFUL_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.REGISTER_SUCCESSFUL_ROUTE),
			element: inject(REGISTER_SUCCESSFUL_VIEW, true) ?? <RegisterSuccessful/>
		}
	);

	registerRoutes(
		inject(CONFIRM_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.CONFIRM_ROUTE),
			element: (
				<AuthorizeRoute mustBeLoggedOut>
					{inject(CONFIRM_VIEW, true) ?? <Confirm/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(CONFIRM_SUCCESSFUL_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.CONFIRM_SUCCESSFUL_ROUTE),
			element: inject(CONFIRM_SUCCESSFUL_VIEW, true) ?? <ConfirmSuccessful/>
		}
	);

	registerRoutes(
		inject(LOGIN_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.LOGIN_ROUTE),
			element: (
				<AuthorizeRoute mustBeLoggedOut>
					{inject(LOGIN_VIEW, true) ?? <Login/>}
				</AuthorizeRoute>)
		}
	);

	registerRoutes(
		inject(FORGOT_PASSWORD_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.FORGOT_PASSWORD_ROUTE),
			element: (
				<AuthorizeRoute mustBeLoggedOut>
					{inject(FORGOT_PASSWORD_VIEW, true) ?? <ForgotPassword/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(FORGOT_PASSWORD_SUCCESSFUL_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.FORGOT_PASSWORD_SUCCESSFUL_ROUTE),
			element: inject(FORGOT_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ForgotPasswordSuccessful/>
		}
	);

	registerRoutes(
		inject(RESET_PASSWORD_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.RESET_PASSWORD_ROUTE),
			element: (
				<AuthorizeRoute mustBeLoggedOut>
					{inject(RESET_PASSWORD_VIEW, true) ?? <ResetPassword/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(RESET_PASSWORD_SUCCESSFUL_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.RESET_PASSWORD_SUCCESSFUL_ROUTE),
			element: inject(RESET_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ResetPasswordSuccessful/>
		}
	);

	registerRoutes(
		inject(CHANGE_EMAIL_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.CHANGE_EMAIL_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(CHANGE_EMAIL_VIEW, true) ?? <ChangeEmail/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(CHANGE_EMAIL_REQUESTED_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.CHANGE_EMAIL_REQUESTED_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(CHANGE_EMAIL_REQUESTED_VIEW, true) ?? <ChangeEmailRequested/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(CHANGE_EMAIL_CONFIRM_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.CHANGE_EMAIL_CONFIRM_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(CHANGE_EMAIL_CONFIRM_VIEW, true) ?? <ChangeEmailConfirm/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(CHANGE_EMAIL_SUCCESSFUL_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.CHANGE_EMAIL_SUCCESSFUL_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(CHANGE_EMAIL_SUCCESSFUL_VIEW, true) ?? <ChangeEmailSuccessful/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(CHANGE_PASSWORD_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.CHANGE_PASSWORD_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(CHANGE_PASSWORD_VIEW, true) ?? <ChangePassword/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(CHANGE_PASSWORD_SUCCESSFUL_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.CHANGE_PASSWORD_SUCCESSFUL_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(CHANGE_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ChangePasswordSuccessful/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(PERSONAL_DATA_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.PERSONAL_DATA_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(PERSONAL_DATA_VIEW, true) ?? <PersonalData/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(DELETE_ACCOUNT_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.DELETE_ACCOUNT_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(DELETE_ACCOUNT_VIEW, true) ?? <DeleteAccount/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(DELETED_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.DELETED_ROUTE),
			element: inject(DELETED_VIEW, true) ?? <Deleted/>
		}
	);

	registerRoutes(
		inject(USERS_ADD_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.USERS_ADD_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(USERS_ADD_VIEW, true) ?? <UserUpsert/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(USERS_EDIT_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: `${inject(ROUTES.USERS_ROUTE)}/:id`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(USERS_EDIT_VIEW, true) ?? <UserUpsert/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(USERS_ROLES_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: `${inject(ROUTES.USERS_ROUTE)}/:id/roles`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(USERS_ROLES_VIEW, true) ?? <UserRoles/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(USERS_LOCK_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: `${inject(ROUTES.USERS_ROUTE)}/:id/lock`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(USERS_LOCK_VIEW, true) ?? <UserLock/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(LOCKOUT_REASONS_ADD_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(ROUTES.LOCKOUT_REASONS_ADD_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(LOCKOUT_REASONS_ADD_VIEW, true) ?? <LockoutReasonUpsert/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(LOCKOUT_REASONS_EDIT_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: `${inject(ROUTES.LOCKOUT_REASONS_ROUTE)}/:id`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(LOCKOUT_REASONS_EDIT_VIEW, true) ?? <LockoutReasonUpsert/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		inject(UNAUTHORIZED_LAYOUT, true) ?? DASHBOARD_NARROW_LAYOUT,
		{
			path: `${inject(ROUTES.UNAUTHORIZED_ROUTE)}`,
			element: inject(UNAUTHORIZED_VIEW, true) ?? <Unauthorized/>
		}
	);
}