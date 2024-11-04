import type { CrudService, InjectionKey, StatusService } from '@/react-utils';
import { ReactNode } from 'react';
import type { Role, User, AddUserToRoleRequest, ManuallyConfirmUserAccountRequest, RemoveUserFromRoleRequest, UnlockUserAccountRequest } from '@users/types.ts';

// Routes

export const USERS_ROUTE = Symbol() as InjectionKey<string>;
export const USERS_ADD_ROUTE = Symbol() as InjectionKey<string>;

// Services

export const USERS_SERVICE = Symbol() as InjectionKey<CrudService<User>>;
export const ROLES_SERVICE = Symbol() as InjectionKey<CrudService<Role>>;
export const ADD_USER_TO_ROLE_SERVICE = Symbol() as InjectionKey<StatusService<AddUserToRoleRequest>>;
export const REMOVE_USER_FROM_ROLE_SERVICE = Symbol() as InjectionKey<StatusService<RemoveUserFromRoleRequest>>;
export const LOCK_USER_ACCOUNT_SERVICE = Symbol() as InjectionKey<StatusService<FormData>>;
export const UNLOCK_USER_ACCOUNT_SERVICE = Symbol() as InjectionKey<StatusService<UnlockUserAccountRequest>>;
export const MANUALLY_CONFIRM_USER_ACCOUNT_SERVICE = Symbol() as InjectionKey<StatusService<ManuallyConfirmUserAccountRequest>>;

// Views

export const USERS_UPSERT_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_ROLES_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_LOCK_VIEW = Symbol() as InjectionKey<ReactNode>;