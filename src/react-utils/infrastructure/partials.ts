import type { ReactNode } from 'react';
import type { InjectionKey } from '@/react-utils/infrastructure/di';

export const DASHBOARD_HEADER_PARTIAL = Symbol() as InjectionKey<ReactNode>;
export const DRAWER_HEADER_PARTIAL = Symbol() as InjectionKey<ReactNode>;
export const DRAWER_FOOTER_PARTIAL = Symbol() as InjectionKey<ReactNode>;
