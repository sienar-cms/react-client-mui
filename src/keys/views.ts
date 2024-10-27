import type { InjectionKey } from '@/react-utils';
import { ComponentType } from 'react';

export const DASHBOARD_VIEW = Symbol() as InjectionKey<ComponentType>;
export const LOGIN_VIEW = Symbol() as InjectionKey<ComponentType>;
export const REGISTER_VIEW = Symbol() as InjectionKey<ComponentType>;
export const REGISTER_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ComponentType>;
export const CONFIRM_VIEW = Symbol() as InjectionKey<ComponentType>;
export const CONFIRM_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ComponentType>;
export const FORGOT_PASSWORD_VIEW = Symbol() as InjectionKey<ComponentType>;
export const FORGOT_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ComponentType>;
export const RESET_PASSWORD_VIEW = Symbol() as InjectionKey<ComponentType>;
export const RESET_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ComponentType>;
export const UNAUTHORIZED_VIEW = Symbol() as InjectionKey<ComponentType>