import { InjectionKey, provide } from '@/react-utils';

// region Account

export const CHANGE_EMAIL_URL = Symbol() as InjectionKey<string>;
export const CHANGE_EMAIL_CONFIRM_URL = Symbol() as InjectionKey<string>;
export const CHANGE_EMAIL_REQUESTED_URL = Symbol() as InjectionKey<string>;
export const CHANGE_EMAIL_SUCCESSFUL_URL = Symbol() as InjectionKey<string>;
export const CHANGE_PASSWORD_URL = Symbol() as InjectionKey<string>;
export const CHANGE_PASSWORD_SUCCESSFUL_URL = Symbol() as InjectionKey<string>;
export const CONFIRM_URL = Symbol() as InjectionKey<string>;
export const CONFIRM_SUCCESSFUL_URL = Symbol() as InjectionKey<string>;
export const DELETE_ACCOUNT_URL = Symbol() as InjectionKey<string>;
export const DELETED_URL = Symbol() as InjectionKey<string>;
export const DOWNLOAD_PERSONAL_DATA_URL = Symbol() as InjectionKey<string>;
export const FORGOT_PASSWORD_URL = Symbol() as InjectionKey<string>;
export const FORGOT_PASSWORD_SUCCESSFUL_URL = Symbol() as InjectionKey<string>;
export const LOGIN_URL = Symbol() as InjectionKey<string>;
export const PERSONAL_DATA_URL = Symbol() as InjectionKey<string>;
export const REGISTER_URL = Symbol() as InjectionKey<string>;
export const REGISTER_SUCCESSFUL_URL = Symbol() as InjectionKey<string>;
export const RESET_PASSWORD_URL = Symbol() as InjectionKey<string>;
export const RESET_PASSWORD_SUCCESSFUL_URL = Symbol() as InjectionKey<string>;
export const ACCOUNT_LOCKED_URL = Symbol() as InjectionKey<string>;

// endregion

// region Users

export const USERS_URL = Symbol() as InjectionKey<string>;
export const USERS_ADD_URL = Symbol() as InjectionKey<string>;
export const USERS_EDIT_URL = Symbol() as InjectionKey<string>;
export const USERS_ROLES_URL = Symbol() as InjectionKey<string>;
export const USERS_LOCK_URL = Symbol() as InjectionKey<string>;

// endregion

// region Lockout reasons

export const LOCKOUT_REASONS_URL = Symbol() as InjectionKey<string>;
export const LOCKOUT_REASONS_ADD_URL = Symbol() as InjectionKey<string>;
export const LOCKOUT_REASONS_EDIT_URL = Symbol() as InjectionKey<string>;

// endregion

export function setupIdentityUrls() {
	provide(REGISTER_URL, '/dashboard/account/register', false);
	provide(REGISTER_SUCCESSFUL_URL, '/dashboard/account/register/successful', false);
	provide(CONFIRM_URL, '/dashboard/account/confirm', false);
	provide(CONFIRM_SUCCESSFUL_URL, '/dashboard/account/confirm/successful', false);
	provide(LOGIN_URL, '/dashboard/account/login', false);
	provide(FORGOT_PASSWORD_URL, '/dashboard/account/forgot-password', false);
	provide(FORGOT_PASSWORD_SUCCESSFUL_URL, '/dashboard/account/forgot-password/successful', false);
	provide(RESET_PASSWORD_URL, '/dashboard/account/reset-password', false);
	provide(RESET_PASSWORD_SUCCESSFUL_URL, '/dashboard/account/reset-password/successful', false);
	provide(CHANGE_EMAIL_URL, '/dashboard/account/change-email', false);
	provide(CHANGE_EMAIL_REQUESTED_URL, '/dashboard/account/change-email/requested', false);
	provide(CHANGE_EMAIL_CONFIRM_URL, '/dashboard/account/change-email/confirm', false);
	provide(CHANGE_EMAIL_SUCCESSFUL_URL, '/dashboard/account/change-email/successful', false);
	provide(CHANGE_PASSWORD_URL, '/dashboard/account/change-password', false);
	provide(CHANGE_PASSWORD_SUCCESSFUL_URL, '/dashboard/account/change-password/successful', false);
	provide(PERSONAL_DATA_URL, '/dashboard/account/personal-data', false);
	provide(DOWNLOAD_PERSONAL_DATA_URL, '/api/account/personal-data', false);
	provide(DELETE_ACCOUNT_URL, '/dashboard/account/delete', false);
	provide(DELETED_URL, '/dashboard/account/deleted', false);
	provide(ACCOUNT_LOCKED_URL, '/dashboard/account/locked', false);

	provide(USERS_URL, '/dashboard/users', false);
	provide(USERS_ADD_URL, '/dashboard/users/add', false);
	provide(USERS_EDIT_URL, '/dashboard/users/:id', false);
	provide(USERS_ROLES_URL, '/dashboard/users/:id/roles', false);
	provide(USERS_LOCK_URL, '/dashboard/users/:id/lock', false);

	provide(LOCKOUT_REASONS_URL, '/dashboard/lockout-reasons', false);
	provide(LOCKOUT_REASONS_ADD_URL, '/dashboard/lockout-reasons/add', false);
	provide(LOCKOUT_REASONS_EDIT_URL, '/dashboard/lockout-reasons/:id', false);
}