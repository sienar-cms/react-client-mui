import { provide } from '@sienar/react-utils';

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
import type { InjectionKey } from '@sienar/react-utils';

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
export const ACCOUNT_LOCKOUT_VIEW = Symbol() as InjectionKey<ReactNode>;

export const USERS_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_ADD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_EDIT_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_ROLES_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_LOCK_VIEW = Symbol() as InjectionKey<ReactNode>;

export const LOCKOUT_REASONS_VIEW = Symbol() as InjectionKey<ReactNode>;
export const LOCKOUT_REASONS_ADD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const LOCKOUT_REASONS_EDIT_VIEW = Symbol() as InjectionKey<ReactNode>;

export function setupIdentityViews() {
	provide(REGISTER_VIEW, <Register/>, false)
	provide(REGISTER_SUCCESSFUL_VIEW, <RegisterSuccessful/>, false);
	provide(CONFIRM_VIEW, <Confirm/>, false);
	provide(CONFIRM_SUCCESSFUL_VIEW, <ConfirmSuccessful/>, false);
	provide(LOGIN_VIEW, <Login/>, false);
	provide(FORGOT_PASSWORD_VIEW, <ForgotPassword/>, false);
	provide(FORGOT_PASSWORD_SUCCESSFUL_VIEW, <ForgotPasswordSuccessful/>, false);
	provide(RESET_PASSWORD_VIEW, <ResetPassword/>, false);
	provide(RESET_PASSWORD_SUCCESSFUL_VIEW, <ResetPasswordSuccessful/>, false);
	provide(ACCOUNT_LOCKOUT_VIEW, <AccountLocked/>, false);
	provide(CHANGE_EMAIL_VIEW, <ChangeEmail/>, false);
	provide(CHANGE_EMAIL_REQUESTED_VIEW, <ChangeEmailRequested/>, false);
	provide(CHANGE_EMAIL_CONFIRM_VIEW, <ChangeEmailConfirm/>, false);
	provide(CHANGE_EMAIL_SUCCESSFUL_VIEW, <ChangeEmailSuccessful/>, false);
	provide(CHANGE_PASSWORD_VIEW, <ChangePassword/>, false);
	provide(CHANGE_PASSWORD_SUCCESSFUL_VIEW, <ChangePasswordSuccessful/>, false);
	provide(PERSONAL_DATA_VIEW, <PersonalData/>, false);
	provide(DELETE_ACCOUNT_VIEW, <DeleteAccount/>, false);
	provide(DELETED_VIEW, <Deleted/>, false);

	provide(USERS_VIEW, <UserIndex/>, false);
	provide(USERS_ADD_VIEW, <UserUpsert/>, false);
	provide(USERS_EDIT_VIEW, <UserUpsert/>, false);
	provide(USERS_ROLES_VIEW, <UserRoles/>, false);
	provide(USERS_LOCK_VIEW, <UserLock/>, false);

	provide(LOCKOUT_REASONS_VIEW, <LockoutReasonIndex/>, false);
	provide(LOCKOUT_REASONS_ADD_VIEW, <LockoutReasonUpsert/>, false);
	provide(LOCKOUT_REASONS_EDIT_VIEW, <LockoutReasonUpsert/>, false);
}