import { addReducer, infrastructureReducer, INFRASTRUCTURE_NAME, addLinksWithPriority, DASHBOARD_MENU, MenuPriority, inject, provide, DRAWER_FOOTER_PARTIAL, registerProvider, registerRoutes } from '@/react-utils';
import { MUI_DATE_LOCALIZATION_PROVIDER } from '@/react-ui';

import { Dashboard, Home } from '@mui/icons-material';
import * as KEYS from '@/keys.ts';
import DrawerFooter from '@/partials/DrawerFooter.tsx';
import { DASHBOARD_LAYOUT, DASHBOARD_NARROW_LAYOUT } from '@/keys.ts';
import AuthorizeRoute from '@/components/AuthorizeRoute.tsx';
import { Dashboard as DashboardLayout, DashboardNarrow as DashboardNarrowLayout } from '@/react-ui';
import DashboardView from '@/views/Dashboard.tsx';
import { accountSetup } from '@account/index.ts';
import { lockoutReasonsSetup } from '@lockoutReasons/index.ts';
import { usersSetup } from '@users/index.ts';

export default function setup() {
	// Global setup not linked to a specific vertical slice

	// Providers
	registerProvider(inject(MUI_DATE_LOCALIZATION_PROVIDER));

	// Routes
	provide(KEYS.HOME_ROUTE, '/', false);
	provide(KEYS.DASHBOARD_ROUTE, '/dashboard', false);

	// Partials
	provide(DRAWER_FOOTER_PARTIAL, <DrawerFooter/>, false);

	// Redux
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
	provide(DASHBOARD_LAYOUT, <DashboardLayout/>, false);
	provide(DASHBOARD_NARROW_LAYOUT, <DashboardNarrowLayout/>, false);

	registerRoutes(
		DASHBOARD_LAYOUT,
		{
			path: inject(KEYS.DASHBOARD_ROUTE),
			element: (
				<AuthorizeRoute>
					{inject(KEYS.DASHBOARD_VIEW, true) ?? <DashboardView/>}
				</AuthorizeRoute>
			)
		}
	)

	// Modules
	accountSetup();
	lockoutReasonsSetup();
	usersSetup();
}