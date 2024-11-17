import type { ReactNode } from 'react';
import type { InjectionKey } from '@sienar/react-utils';

// Layouts
export const DASHBOARD_LAYOUT = Symbol() as InjectionKey<ReactNode>;
export const DASHBOARD_NARROW_LAYOUT = Symbol() as InjectionKey<ReactNode>;

// Routes
export const HOME_URL = Symbol() as InjectionKey<string>;
export const DASHBOARD_URL = Symbol() as InjectionKey<string>;
export const ABOUT_URL = Symbol() as InjectionKey<string>;
export const TOS_URL = Symbol() as InjectionKey<string>;
export const PRIVACY_POLICY_URL = Symbol() as InjectionKey<string>;

// Views
export const DASHBOARD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const ABOUT_VIEW = Symbol() as InjectionKey<ReactNode>;