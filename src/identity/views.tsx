import { AuthorizeRoute, inject, provide, registerRoutes } from '@/react-utils';
import { DASHBOARD_LAYOUT, DASHBOARD_NARROW_LAYOUT } from '@/keys.ts';
import * as ROUTES from '@identity/urls.ts';
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
import AccountLocked from '@identity/views/account/AccountLocked.tsx';
import UserIndex from '@identity/views/users/Index.tsx';
import LockoutReasonIndex from '@identity/views/lockout-reasons/Index.tsx';
import UserUpsert from '@identity/views/users/Upsert.tsx';
import UserRoles from '@identity/views/users/Roles.tsx';
import UserLock from '@identity/views/users/Lock.tsx';
import LockoutReasonUpsert from '@identity/views/lockout-reasons/Upsert.tsx';

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
export const ACCOUNT_LOCKOUT_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const ACCOUNT_LOCKOUT_VIEW = Symbol() as InjectionKey<ReactNode>;

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

	provide(REGISTER_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(REGISTER_SUCCESSFUL_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(CONFIRM_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(CONFIRM_SUCCESSFUL_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(LOGIN_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(FORGOT_PASSWORD_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(FORGOT_PASSWORD_SUCCESSFUL_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(RESET_PASSWORD_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(RESET_PASSWORD_SUCCESSFUL_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(ACCOUNT_LOCKOUT_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(CHANGE_EMAIL_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(CHANGE_EMAIL_REQUESTED_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(CHANGE_EMAIL_CONFIRM_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(CHANGE_EMAIL_SUCCESSFUL_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(CHANGE_PASSWORD_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(CHANGE_PASSWORD_SUCCESSFUL_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(PERSONAL_DATA_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(DELETE_ACCOUNT_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(DELETED_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);

	provide(USERS_LAYOUT, DASHBOARD_LAYOUT, false);
	provide(USERS_ADD_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(USERS_EDIT_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(USERS_ROLES_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(USERS_LOCK_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);

	provide(LOCKOUT_REASONS_LAYOUT, DASHBOARD_LAYOUT, false);
	provide(LOCKOUT_REASONS_ADD_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(LOCKOUT_REASONS_EDIT_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);

	registerRoutes(
		USERS_LAYOUT,
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
		LOCKOUT_REASONS_LAYOUT,
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
		REGISTER_LAYOUT,
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
		REGISTER_SUCCESSFUL_LAYOUT,
		{
			path: inject(ROUTES.REGISTER_SUCCESSFUL_ROUTE),
			element: inject(REGISTER_SUCCESSFUL_VIEW, true) ?? <RegisterSuccessful/>
		}
	);

	registerRoutes(
		CONFIRM_LAYOUT,
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
		CONFIRM_SUCCESSFUL_LAYOUT,
		{
			path: inject(ROUTES.CONFIRM_SUCCESSFUL_ROUTE),
			element: inject(CONFIRM_SUCCESSFUL_VIEW, true) ?? <ConfirmSuccessful/>
		}
	);

	registerRoutes(
		LOGIN_LAYOUT,
		{
			path: inject(ROUTES.LOGIN_ROUTE),
			element: (
				<AuthorizeRoute mustBeLoggedOut>
					{inject(LOGIN_VIEW, true) ?? <Login/>}
				</AuthorizeRoute>)
		}
	);

	registerRoutes(
		FORGOT_PASSWORD_LAYOUT,
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
		FORGOT_PASSWORD_SUCCESSFUL_LAYOUT,
		{
			path: inject(ROUTES.FORGOT_PASSWORD_SUCCESSFUL_ROUTE),
			element: inject(FORGOT_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ForgotPasswordSuccessful/>
		}
	);

	registerRoutes(
		RESET_PASSWORD_LAYOUT,
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
		RESET_PASSWORD_SUCCESSFUL_LAYOUT,
		{
			path: inject(ROUTES.RESET_PASSWORD_SUCCESSFUL_ROUTE),
			element: inject(RESET_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ResetPasswordSuccessful/>
		}
	);

	registerRoutes(
		ACCOUNT_LOCKOUT_LAYOUT,
		{
			path: inject(ROUTES.ACCOUNT_LOCKED_ROUTE),
			element: (
				<AuthorizeRoute mustBeLoggedOut>
					{inject(ACCOUNT_LOCKOUT_VIEW, true) ?? <AccountLocked/>}
				</AuthorizeRoute>
			)
		}
	)

	registerRoutes(
		CHANGE_EMAIL_LAYOUT,
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
		CHANGE_EMAIL_REQUESTED_LAYOUT,
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
		CHANGE_EMAIL_CONFIRM_LAYOUT,
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
		CHANGE_EMAIL_SUCCESSFUL_LAYOUT,
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
		CHANGE_PASSWORD_LAYOUT,
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
		CHANGE_PASSWORD_SUCCESSFUL_LAYOUT,
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
		PERSONAL_DATA_LAYOUT,
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
		DELETE_ACCOUNT_LAYOUT,
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
		DELETED_LAYOUT,
		{
			path: inject(ROUTES.DELETED_ROUTE),
			element: inject(DELETED_VIEW, true) ?? <Deleted/>
		}
	);

	registerRoutes(
		USERS_ADD_LAYOUT,
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
		USERS_EDIT_LAYOUT,
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
		USERS_ROLES_LAYOUT,
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
		USERS_LOCK_LAYOUT,
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
		LOCKOUT_REASONS_ADD_LAYOUT,
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
		LOCKOUT_REASONS_EDIT_LAYOUT,
		{
			path: `${inject(ROUTES.LOCKOUT_REASONS_ROUTE)}/:id`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(LOCKOUT_REASONS_EDIT_VIEW, true) ?? <LockoutReasonUpsert/>}
				</AuthorizeRoute>
			)
		}
	);
}