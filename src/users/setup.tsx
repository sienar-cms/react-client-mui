import { addLinks, DASHBOARD_MENU, inject, provide, registerRoutes } from '@/react-utils';
import * as KEYS from '@users/keys.ts';
import { DASHBOARD_LAYOUT, DASHBOARD_NARROW_LAYOUT } from '@/keys.ts';
import AuthorizeRoute from '@/components/AuthorizeRoute.tsx';
import UserIndex from '@users/views/Index.tsx';
import UserUpsert from '@users/views/Upsert.tsx';
import UserRoles from '@users/views/Roles.tsx';
import UserLock from '@users/views/Lock.tsx';
import { ApiCrudService, sendStatusServiceRequest } from '@/react-utils';
import { roles } from '@/constants.ts';
import type { Role, User } from '@users/types.ts';

export default function usersSetup() {
	// URLs
	provide(KEYS.USERS_ROUTE, '/dashboard/users', false);
	provide(KEYS.USERS_ADD_ROUTE, '/dashboard/users/add', false);

	// Menus
	addLinks(
		DASHBOARD_MENU,
		{
			text: 'Users',
			href: inject(KEYS.USERS_ROUTE),
			// roles: ['Administrator']
		}
	);

	// Services
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
	)

	// Views
	registerRoutes(
		DASHBOARD_LAYOUT,
		{
			path: inject(KEYS.USERS_ROUTE),
			element: (
				<AuthorizeRoute roles={roles.admin}>
					{inject(KEYS.USERS_UPSERT_VIEW, true) ?? <UserIndex/>}
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
		}
	);
}