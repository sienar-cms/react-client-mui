import { Dashboard, Home } from '@mui/icons-material';
import { addLinksWithPriority, createMenu, inject, MenuPriority, SIENAR_MENUS, SIENAR_URLS } from '@/react-utils';

export default function() {
	createMenu(SIENAR_MENUS.DASHBOARD, 'Dashboard');

	addLinksWithPriority(
		SIENAR_MENUS.DASHBOARD,
		MenuPriority.Highest,
		{
			text: 'Dashboard',
			href: inject(SIENAR_URLS.DASHBOARD),
			icon: <Dashboard/>,
			requireLoggedIn: false
		}
	);

	addLinksWithPriority(
		SIENAR_MENUS.DASHBOARD,
		MenuPriority.Lowest,
		{
			text: 'Return home',
			href: inject(SIENAR_URLS.HOME),
			icon: <Home/>
		}
	);
}