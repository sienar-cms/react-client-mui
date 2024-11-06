import { addLinks, DASHBOARD_MENU, inject, provide, registerRoutes } from '@/react-utils';
import * as KEYS from '@identity/keys.ts';
import { DASHBOARD_LAYOUT, DASHBOARD_NARROW_LAYOUT } from '@/keys';
import UserIndex from '@identity/views/users/Index.tsx';
import UserUpsert from '@identity/views/users/Upsert.tsx';
import UserRoles from '@identity/views/users/Roles.tsx';
import UserLock from '@identity/views/users/Lock.tsx';
import AuthorizeRoute from '@/components/AuthorizeRoute.tsx';
import LockoutReasonIndex from '@identity/views/lockout-reasons/Index.tsx';
import LockoutReasonUpsert from '@identity/views/lockout-reasons/Upsert.tsx';
import { ApiCrudService, sendStatusServiceRequest } from '@/react-utils';
import { roles } from '@/constants.ts';

import type { LockoutReason, Role, User } from '@identity/types.ts';

export default function identitySetup() {
	setupUrls();
	setupMenus();
	setupServices();
	setupRoutes();
}

function setupUrls() {
	provide(KEYS.USERS_ROUTE, '/dashboard/users', false);
	provide(KEYS.USERS_ADD_ROUTE, '/dashboard/users/add', false);

	provide(KEYS.LOCKOUT_REASONS_ROUTE, '/dashboard/lockout-reasons', false);
	provide(KEYS.LOCKOUT_REASONS_ADD_ROUTE, '/dashboard/lockout-reasons/add', false);
}

function setupMenus() {
	addLinks(
		DASHBOARD_MENU,
		{
			text: 'Users',
			href: inject(KEYS.USERS_ROUTE),
			// roles: ['Administrator']
		}
	);

	addLinks(
		DASHBOARD_MENU,
		{
			text: 'Lockout reasons',
			href: inject(KEYS.LOCKOUT_REASONS_ROUTE),
			// roles: ['Administrator']
		}
	);
}

function setupServices() {
	provide(
		KEYS.USERS_SERVICE,
		new ApiCrudService<User>('/api/users'),
		false
	);

	provide(
		KEYS.ROLES_SERVICE,
		new ApiCrudService<Role>('/api/roles'),
		false
	);

	provide(
		KEYS.ADD_USER_TO_ROLE_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/roles',
			'POST',
			data,
			config
		),
		false
	);

	provide(
		KEYS.REMOVE_USER_FROM_ROLE_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/roles',
			'DELETE',
			data,
			config
		),
		false
	);

	provide(
		KEYS.LOCK_USER_ACCOUNT_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/lock',
			'PATCH',
			data,
			config
		),
		false
	);

	provide(
		KEYS.UNLOCK_USER_ACCOUNT_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/lock',
			'DELETE',
			data,
			config
		),
		false
	);

	provide(
		KEYS.MANUALLY_CONFIRM_USER_ACCOUNT_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/confirm',
			'PATCH',
			data,
			config
		),
		false
	);

	provide(
		KEYS.LOCKOUT_REASONS_SERVICE,
		new ApiCrudService<LockoutReason>('/api/lockout-reasons'),
		false
	);
}

function setupRoutes() {
	registerRoutes(
		DASHBOARD_LAYOUT,
		{
			path: inject(KEYS.USERS_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(KEYS.USERS_UPSERT_VIEW, true) ?? <UserIndex/>}
				</AuthorizeRoute>
			)
		},
		{
			path: inject(KEYS.LOCKOUT_REASONS_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(KEYS.LOCKOUT_REASONS_UPSERT_VIEW, true) ?? <LockoutReasonIndex/>}
				</AuthorizeRoute>
			)
		}
	);

	registerRoutes(
		DASHBOARD_NARROW_LAYOUT,
		{
			path: inject(KEYS.USERS_ADD_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(KEYS.USERS_UPSERT_VIEW, true) ?? <UserUpsert/>}
				</AuthorizeRoute>
			)
		},
		{
			path: `${inject(KEYS.USERS_ROUTE)}/:id`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(KEYS.USERS_UPSERT_VIEW, true) ?? <UserUpsert/>}
				</AuthorizeRoute>
			)
		},
		{
			path: `${inject(KEYS.USERS_ROUTE)}/:id/roles`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(KEYS.USERS_ROLES_VIEW, true) ?? <UserRoles/>}
				</AuthorizeRoute>
			)
		},
		{
			path: `${inject(KEYS.USERS_ROUTE)}/:id/lock`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(KEYS.USERS_LOCK_VIEW, true) ?? <UserLock/>}
				</AuthorizeRoute>
			)
		},
		{
			path: inject(KEYS.LOCKOUT_REASONS_ADD_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(KEYS.LOCKOUT_REASONS_UPSERT_VIEW, true) ?? <LockoutReasonUpsert/>}
				</AuthorizeRoute>
			)
		},
		{
			path: `${inject(KEYS.LOCKOUT_REASONS_ROUTE)}/:id`,
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(KEYS.LOCKOUT_REASONS_UPSERT_VIEW, true) ?? <LockoutReasonUpsert/>}
				</AuthorizeRoute>
			)
		}
	);
}