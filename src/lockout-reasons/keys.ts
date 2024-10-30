import type { CrudService, InjectionKey } from '@/react-utils';
import { ReactNode } from 'react';
import type { LockoutReason } from '@lockoutReasons/types';

// Routes

export const LOCKOUT_REASONS_ROUTE = Symbol() as InjectionKey<string>;
export const LOCKOUT_REASONS_ADD_ROUTE = Symbol() as InjectionKey<string>;

// Services

export const LOCKOUT_REASONS_SERVICE = Symbol() as InjectionKey<CrudService<LockoutReason>>

// Views

export const LOCKOUT_REASONS_UPSERT_VIEW = Symbol() as InjectionKey<ReactNode>;