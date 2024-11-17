import { addLinks, addLinksWithPriority, AUTH_MISSING_ROLES_PARTIAL, AUTH_MUST_BE_LOGGED_IN_PARTIAL, AUTH_MUST_BE_LOGGED_OUT_PARTIAL, DASHBOARD_MENU, DASHBOARD_UTILS_MENU, DASHBOARD_UTILS_SETTINGS_MENU, DRAWER_FOOTER_PARTIAL, inject, MenuPriority, provide, registerProvider, registerRoutes } from '@sienar/react-utils';
import { Dashboard as DashboardLayout, DashboardNarrow as DashboardNarrowLayout, MUI_DATE_LOCALIZATION_PROVIDER } from '@/react-ui';
import { Dashboard, Info, Home, Settings } from '@mui/icons-material';
import * as KEYS from '@/keys.ts';
import { DASHBOARD_LAYOUT, DASHBOARD_NARROW_LAYOUT } from '@/keys.ts';
import DrawerFooter from '@/partials/DrawerFooter.tsx';
import MissingRoles from '@/partials/MissingRoles.tsx';
import MustBeLoggedIn from '@/partials/MustBeLoggedIn.tsx';
import MustBeLoggedOut from '@/partials/MustBeLoggedOut.tsx';
import DashboardView from '@/views/Dashboard.tsx';
import AboutView from '@/views/About.tsx';
import { identitySetup } from '@identity/index.ts';
import { roles } from '@/constants.ts';

export default function setup() {
	// Global setup not linked to a specific vertical slice

	// Providers
	registerProvider(inject(MUI_DATE_LOCALIZATION_PROVIDER));

	// Routes
	provide(KEYS.HOME_URL, '/', false);
	provide(KEYS.DASHBOARD_URL, '/dashboard', false);
	provide(KEYS.ABOUT_URL, '/dashboard/about', false);

	// Partials
	provide(DRAWER_FOOTER_PARTIAL, <DrawerFooter/>, false);
	provide(AUTH_MISSING_ROLES_PARTIAL, <MissingRoles/>, false);
	provide(AUTH_MUST_BE_LOGGED_IN_PARTIAL, <MustBeLoggedIn/>, false);
	provide(AUTH_MUST_BE_LOGGED_OUT_PARTIAL, <MustBeLoggedOut/>, false);

	// Menus
	addLinks(
		DASHBOARD_UTILS_MENU,
		{
			text: 'Settings',
			roles: roles.admin,
			icon: <Settings/>,
			childMenu: DASHBOARD_UTILS_SETTINGS_MENU
		}
	);

	addLinksWithPriority(
		DASHBOARD_MENU,
		MenuPriority.Highest,
		{
			text: 'Dashboard',
			href: KEYS.DASHBOARD_URL,
			icon: <Dashboard/>,
			requireLoggedIn: false
		}
	);

	addLinksWithPriority(
		DASHBOARD_MENU,
		MenuPriority.Lowest,
		{
			text: 'Return home',
			href: KEYS.HOME_URL,
			icon: <Home/>
		}
	);

	addLinksWithPriority(
		DASHBOARD_UTILS_MENU,
		MenuPriority.Lowest,
		{
			text: 'About',
			href: KEYS.ABOUT_URL,
			icon: <Info/>
		}
	)

	// Views
	provide(DASHBOARD_LAYOUT, <DashboardLayout/>, false);
	provide(DASHBOARD_NARROW_LAYOUT, <DashboardNarrowLayout/>, false);
	provide(KEYS.DASHBOARD_VIEW, <DashboardView/>, false);
	provide(KEYS.ABOUT_VIEW, <AboutView/>, false);

	registerRoutes(
		DASHBOARD_LAYOUT,
		{
			path: KEYS.DASHBOARD_URL,
			element: KEYS.DASHBOARD_VIEW
		},
		{
			path: KEYS.ABOUT_URL,
			element: KEYS.ABOUT_VIEW
		}
	)

	// Modules
	identitySetup();
}