import { addLinks, DASHBOARD_MENU, inject, provide, registerRoutes } from '@/react-utils';
import * as KEYS from './keys';
import { DASHBOARD_LAYOUT } from '@/keys';
import LockoutReasonIndex from './views/Index';
import LockoutReasonUpsert from './views/Upsert';

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

	// Views
	registerRoutes(
		DASHBOARD_LAYOUT,
		{
			path: inject(KEYS.LOCKOUT_REASONS_ROUTE),
			element: inject(KEYS.LOCKOUT_REASONS_UPSERT_VIEW, true) ?? <LockoutReasonIndex/>
		},
		{
			path: inject(KEYS.LOCKOUT_REASONS_ADD_ROUTE),
			element: inject(KEYS.LOCKOUT_REASONS_UPSERT_VIEW, true) ?? <LockoutReasonUpsert/>
		},
		{
			path: `${inject(KEYS.LOCKOUT_REASONS_ROUTE)}/:id`,
			element: inject(KEYS.LOCKOUT_REASONS_UPSERT_VIEW, true) ?? <LockoutReasonUpsert/>
		}
	)
}