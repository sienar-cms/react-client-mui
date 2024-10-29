import type { ReactNode } from 'react';
import type { InjectionKey } from '@/react-utils';

// Layouts
export const DASHBOARD_LAYOUT = Symbol() as InjectionKey<ReactNode>;

// Routes
export const HOME_ROUTE = Symbol() as InjectionKey<string>;
export const DASHBOARD_ROUTE = Symbol() as InjectionKey<string>;

// Views
export const DASHBOARD_VIEW = Symbol() as InjectionKey<ReactNode>;