import { Dashboard, Home } from '@mui/icons-material';
import { addLinksWithPriority, createMenu, inject, MenuPriority, SIENAR_MENUS } from '@/react-utils';
import { DASHBOARD_ROUTE, HOME_ROUTE } from '@/keys/routes';

export default function() {
	createMenu(SIENAR_MENUS.DASHBOARD, 'Dashboard');

	addLinksWithPriority(
		SIENAR_MENUS.DASHBOARD,
		MenuPriority.Highest,
		{
			text: 'Dashboard',
			href: inject(DASHBOARD_ROUTE),
			icon: <Dashboard/>,
			requireLoggedIn: false
		}
	);

	addLinksWithPriority(
		SIENAR_MENUS.DASHBOARD,
		MenuPriority.Lowest,
		{
			text: 'Return home',
			href: inject(HOME_ROUTE),
			icon: <Home/>
		}
	);
}