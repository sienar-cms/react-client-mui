import { addLinks, DASHBOARD_MENU, inject, provide, registerRoutes } from '@/react-utils';
import * as KEYS from './keys.ts';
import { DASHBOARD_LAYOUT, DASHBOARD_NARROW_LAYOUT } from '@/keys';
import AuthorizeRoute from '@/components/AuthorizeRoute.tsx';
import LockoutReasonIndex from './views/Index.tsx';
import LockoutReasonUpsert from './views/Upsert.tsx';
import { ApiCrudService } from '@/react-utils';
import { roles } from '@/constants.ts';
import type { LockoutReason } from '@lockoutReasons/types';

export default function lockoutReasonsSetup() {
	// URLs
	provide(KEYS.LOCKOUT_REASONS_ROUTE, '/dashboard/lockout-reasons', false);
	provide(KEYS.LOCKOUT_REASONS_ADD_ROUTE, '/dashboard/lockout-reasons/add', false);

	// Menus
	addLinks(
		DASHBOARD_MENU,
		{
			text: 'Lockout reasons',
			href: inject(KEYS.LOCKOUT_REASONS_ROUTE),
			// roles: ['Administrator']
		}
	);

	// Services
	provide(
		KEYS.LOCKOUT_REASONS_SERVICE,
		new ApiCrudService<LockoutReason>('/api/lockout-reasons'),
		false
	);

	// Views
	registerRoutes(
		DASHBOARD_LAYOUT,
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