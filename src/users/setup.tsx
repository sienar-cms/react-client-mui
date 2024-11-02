import { addLinks, DASHBOARD_MENU, inject, provide, registerRoutes } from '@/react-utils';
import * as KEYS from '@users/keys.ts';
import { DASHBOARD_LAYOUT } from '@/keys.ts';
import UserIndex from '@users/views/Index.tsx';
import UserUpsert from '@users/views/Upsert.tsx';
import { ApiCrudService } from '@/react-utils';
import type { User } from '@users/types.ts';

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

	// Views
	registerRoutes(
		DASHBOARD_LAYOUT,
		{
			path: inject(KEYS.USERS_ROUTE),
			element: inject(KEYS.USERS_UPSERT_VIEW, true) ?? <UserIndex/>
		},
		{
			path: inject(KEYS.USERS_ADD_ROUTE),
			element: inject(KEYS.USERS_UPSERT_VIEW, true) ?? <UserUpsert/>
		},
		{
			path: `${inject(KEYS.USERS_ROUTE)}/:id`,
			element: inject(KEYS.USERS_UPSERT_VIEW, true) ?? <UserUpsert/>
		}
	)
}