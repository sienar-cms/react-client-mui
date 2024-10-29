import { addReducer, authReducer, AUTH_NAME, infrastructureReducer, INFRASTRUCTURE_NAME, addLinksWithPriority, DASHBOARD_MENU, MenuPriority, inject, provide, DRAWER_FOOTER_PARTIAL, registerRoutes } from '@/react-utils';

import { Dashboard, Home } from '@mui/icons-material';
import * as KEYS from '@/keys';
import DrawerFooter from '@/partials/DrawerFooter';
import { DASHBOARD_LAYOUT } from '@/keys';
import { Layouts } from '@/react-ui';
import DashboardView from '@/views/Dashboard';
import { accountSetup } from '@account/index';
import { lockoutReasonsSetup } from '@lockoutReasons/index';

export default function setup() {
	// Global setup not linked to a specific vertical slice

	// Routes
	provide(KEYS.HOME_ROUTE, '/', false);
	provide(KEYS.DASHBOARD_ROUTE, '/dashboard', false);

	// Partials
	provide(DRAWER_FOOTER_PARTIAL, <DrawerFooter/>, false);

	// Redux
	addReducer(AUTH_NAME, authReducer);
	addReducer(INFRASTRUCTURE_NAME, infrastructureReducer);addLinksWithPriority(
		DASHBOARD_MENU,
		MenuPriority.Highest,
		{
			text: 'Dashboard',
			href: inject(KEYS.DASHBOARD_ROUTE),
			icon: <Dashboard/>,
			requireLoggedIn: false
		}
	);

	// Menus
	addLinksWithPriority(
		DASHBOARD_MENU,
		MenuPriority.Lowest,
		{
			text: 'Return home',
			href: inject(KEYS.HOME_ROUTE),
			icon: <Home/>
		}
	);

	// Views
	provide(DASHBOARD_LAYOUT, Layouts.Dashboard, false);

	registerRoutes(
		DASHBOARD_LAYOUT,
		{
			path: inject(KEYS.DASHBOARD_ROUTE),
			element: inject(KEYS.DASHBOARD_VIEW, true) ?? <DashboardView/>
		}
	)

	// Modules
	accountSetup();
	lockoutReasonsSetup();
}