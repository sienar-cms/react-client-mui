﻿import type { InjectionKey } from '@/react-utils';

export const HOME_ROUTE = Symbol() as InjectionKey<string>;
export const DASHBOARD_ROUTE = Symbol() as InjectionKey<string>;
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
export const UNAUTHORIZED_ROUTE = Symbol() as InjectionKey<string>
