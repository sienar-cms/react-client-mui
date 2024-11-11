import { provide } from '@/react-utils';
import { DASHBOARD_LAYOUT, DASHBOARD_NARROW_LAYOUT } from '@/keys.ts';
import type { ReactNode } from 'react';
import type { InjectionKey } from '@/react-utils';

export const USERS_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_ADD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_EDIT_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_ROLES_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_LOCK_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;

export const LOCKOUT_REASONS_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const LOCKOUT_REASONS_ADD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const LOCKOUT_REASONS_EDIT_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;

export const CHANGE_EMAIL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_EMAIL_CONFIRM_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_EMAIL_REQUESTED_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_EMAIL_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_PASSWORD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_PASSWORD_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CONFIRM_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CONFIRM_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const DELETE_ACCOUNT_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const DELETED_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const FORGOT_PASSWORD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const FORGOT_PASSWORD_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const LOGIN_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const PERSONAL_DATA_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const REGISTER_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const REGISTER_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const RESET_PASSWORD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const RESET_PASSWORD_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const ACCOUNT_LOCKOUT_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;

export function setupIdentityLayouts() {
	provide(USERS_LAYOUT, DASHBOARD_LAYOUT, false);
	provide(USERS_ADD_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(USERS_EDIT_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(USERS_ROLES_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(USERS_LOCK_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);

	provide(LOCKOUT_REASONS_LAYOUT, DASHBOARD_LAYOUT, false);
	provide(LOCKOUT_REASONS_ADD_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);
	provide(LOCKOUT_REASONS_EDIT_LAYOUT, DASHBOARD_NARROW_LAYOUT, false);

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
}