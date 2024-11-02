import type { CrudService, InjectionKey } from '@/react-utils';
import { ReactNode } from 'react';
import type { User } from '@users/types';

// Routes

export const USERS_ROUTE = Symbol() as InjectionKey<string>;
export const USERS_ADD_ROUTE = Symbol() as InjectionKey<string>;

// Services

export const USERS_SERVICE = Symbol() as InjectionKey<CrudService<User>>

// Views

export const USERS_UPSERT_VIEW = Symbol() as InjectionKey<ReactNode>;