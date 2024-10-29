import type { InjectionKey } from '@/react-utils';
import { ReactNode } from 'react';

// region Routes

export const LOCKOUT_REASONS_ROUTE = Symbol() as InjectionKey<string>;
export const LOCKOUT_REASONS_ADD_ROUTE = Symbol() as InjectionKey<string>;

// endregion

// region Views

export const LOCKOUT_REASONS_UPSERT_VIEW = Symbol() as InjectionKey<ReactNode>;

// endregion