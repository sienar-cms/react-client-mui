import type { InjectionKey, MenuLinkProvider } from '@/react-utils';
import type { ReactNode } from 'react';

// region Menus

export const USER_SETTINGS_MENU = Symbol() as InjectionKey<MenuLinkProvider>;

// endregion

// region Routes

export const LOGIN_ROUTE = Symbol() as InjectionKey<string>;
export const REGISTER_ROUTE = Symbol() as InjectionKey<string>;
export const REGISTER_SUCCESSFUL_ROUTE = Symbol() as InjectionKey<string>;
export const CONFIRM_ROUTE = Symbol() as InjectionKey<string>;
export const CONFIRM_SUCCESSFUL_ROUTE = Symbol() as InjectionKey<string>;
export const FORGOT_PASSWORD_ROUTE = Symbol() as InjectionKey<string>;
export const FORGOT_PASSWORD_SUCCESSFUL_ROUTE = Symbol() as InjectionKey<string>;
export const RESET_PASSWORD_ROUTE = Symbol() as InjectionKey<string>;
export const RESET_PASSWORD_SUCCESSFUL_ROUTE = Symbol() as InjectionKey<string>;
export const CHANGE_EMAIL_ROUTE = Symbol() as InjectionKey<string>;
export const CHANGE_EMAIL_REQUESTED_ROUTE = Symbol() as InjectionKey<string>;
export const CHANGE_EMAIL_CONFIRM_ROUTE = Symbol() as InjectionKey<string>;
export const CHANGE_EMAIL_SUCCESSFUL_ROUTE = Symbol() as InjectionKey<string>;
export const CHANGE_PASSWORD_ROUTE = Symbol() as InjectionKey<string>;
export const CHANGE_PASSWORD_SUCCESSFUL_ROUTE = Symbol() as InjectionKey<string>;
export const PERSONAL_DATA_ROUTE = Symbol() as InjectionKey<string>;
export const DOWNLOAD_PERSONAL_DATA_ROUTE = Symbol() as InjectionKey<string>;
export const DELETE_ACCOUNT_ROUTE = Symbol() as InjectionKey<string>;
export const DELETED_ROUTE = Symbol() as InjectionKey<string>;
export const UNAUTHORIZED_ROUTE = Symbol() as InjectionKey<string>

// endregion

// region Views

export const DASHBOARD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const LOGIN_VIEW = Symbol() as InjectionKey<ReactNode>;
export const REGISTER_VIEW = Symbol() as InjectionKey<ReactNode>;
export const REGISTER_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CONFIRM_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CONFIRM_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const FORGOT_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const FORGOT_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const RESET_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const RESET_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_REQUESTED_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_CONFIRM_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const PERSONAL_DATA_VIEW = Symbol() as InjectionKey<ReactNode>;
export const DELETE_ACCOUNT_VIEW = Symbol() as InjectionKey<ReactNode>;
export const DELETED_VIEW = Symbol() as InjectionKey<ReactNode>;
export const UNAUTHORIZED_VIEW = Symbol() as InjectionKey<ReactNode>;

// endregion