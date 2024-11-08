import { InjectionKey, provide } from '@/react-utils';

// region Account

export const CHANGE_EMAIL_ROUTE = Symbol() as InjectionKey<string>;
export const CHANGE_EMAIL_CONFIRM_ROUTE = Symbol() as InjectionKey<string>;
export const CHANGE_EMAIL_REQUESTED_ROUTE = Symbol() as InjectionKey<string>;
export const CHANGE_EMAIL_SUCCESSFUL_ROUTE = Symbol() as InjectionKey<string>;
export const CHANGE_PASSWORD_ROUTE = Symbol() as InjectionKey<string>;
export const CHANGE_PASSWORD_SUCCESSFUL_ROUTE = Symbol() as InjectionKey<string>;
export const CONFIRM_ROUTE = Symbol() as InjectionKey<string>;
export const CONFIRM_SUCCESSFUL_ROUTE = Symbol() as InjectionKey<string>;
export const DELETE_ACCOUNT_ROUTE = Symbol() as InjectionKey<string>;
export const DELETED_ROUTE = Symbol() as InjectionKey<string>;
export const DOWNLOAD_PERSONAL_DATA_ROUTE = Symbol() as InjectionKey<string>;
export const FORGOT_PASSWORD_ROUTE = Symbol() as InjectionKey<string>;
export const FORGOT_PASSWORD_SUCCESSFUL_ROUTE = Symbol() as InjectionKey<string>;
export const LOGIN_ROUTE = Symbol() as InjectionKey<string>;
export const PERSONAL_DATA_ROUTE = Symbol() as InjectionKey<string>;
export const REGISTER_ROUTE = Symbol() as InjectionKey<string>;
export const REGISTER_SUCCESSFUL_ROUTE = Symbol() as InjectionKey<string>;
export const RESET_PASSWORD_ROUTE = Symbol() as InjectionKey<string>;
export const RESET_PASSWORD_SUCCESSFUL_ROUTE = Symbol() as InjectionKey<string>;
export const UNAUTHORIZED_ROUTE = Symbol() as InjectionKey<string>;

// endregion

// region Users

export const USERS_ROUTE = Symbol() as InjectionKey<string>;
export const USERS_ADD_ROUTE = Symbol() as InjectionKey<string>;

// endregion

// region Lockout reasons

export const LOCKOUT_REASONS_ROUTE = Symbol() as InjectionKey<string>;
export const LOCKOUT_REASONS_ADD_ROUTE = Symbol() as InjectionKey<string>;

// endregion

export function setupIdentityUrls() {
	provide(REGISTER_ROUTE, '/dashboard/account/register', false);
	provide(REGISTER_SUCCESSFUL_ROUTE, '/dashboard/account/register/successful', false);
	provide(CONFIRM_ROUTE, '/dashboard/account/confirm', false);
	provide(CONFIRM_SUCCESSFUL_ROUTE, '/dashboard/account/confirm/successful', false);
	provide(LOGIN_ROUTE, '/dashboard/account/login', false);
	provide(FORGOT_PASSWORD_ROUTE, '/dashboard/account/forgot-password', false);
	provide(FORGOT_PASSWORD_SUCCESSFUL_ROUTE, '/dashboard/account/forgot-password/successful', false);
	provide(RESET_PASSWORD_ROUTE, '/dashboard/account/reset-password', false);
	provide(RESET_PASSWORD_SUCCESSFUL_ROUTE, '/dashboard/account/reset-password/successful', false);
	provide(CHANGE_EMAIL_ROUTE, '/dashboard/account/change-email', false);
	provide(CHANGE_EMAIL_REQUESTED_ROUTE, '/dashboard/account/change-email/requested', false);
	provide(CHANGE_EMAIL_CONFIRM_ROUTE, '/dashboard/account/change-email/confirm', false);
	provide(CHANGE_EMAIL_SUCCESSFUL_ROUTE, '/dashboard/account/change-email/successful', false);
	provide(CHANGE_PASSWORD_ROUTE, '/dashboard/account/change-password', false);
	provide(CHANGE_PASSWORD_SUCCESSFUL_ROUTE, '/dashboard/account/change-password/successful', false);
	provide(PERSONAL_DATA_ROUTE, '/dashboard/account/personal-data', false);
	provide(DOWNLOAD_PERSONAL_DATA_ROUTE, '/api/account/personal-data', false);
	provide(DELETE_ACCOUNT_ROUTE, '/dashboard/account/delete', false);
	provide(DELETED_ROUTE, '/dashboard/account/deleted', false);
	provide(UNAUTHORIZED_ROUTE, '/dashboard/unauthorized', false);

	provide(USERS_ROUTE, '/dashboard/users', false);
	provide(USERS_ADD_ROUTE, '/dashboard/users/add', false);

	provide(LOCKOUT_REASONS_ROUTE, '/dashboard/lockout-reasons', false);
	provide(LOCKOUT_REASONS_ADD_ROUTE, '/dashboard/lockout-reasons/add', false);
}