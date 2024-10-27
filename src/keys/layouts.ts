import type { ReactNode } from 'react';
import type { InjectionKey } from '@/react-utils';

export const DASHBOARD_LAYOUT = Symbol() as InjectionKey<ReactNode>;