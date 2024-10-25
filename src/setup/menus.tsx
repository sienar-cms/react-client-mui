import { Dashboard, Home } from '@mui/icons-material';
import { addMenuLinksWithPriority, inject, MenuPriority, SIENAR_MENUS, SIENAR_URLS } from '@/react-utils';

addMenuLinksWithPriority(
	SIENAR_MENUS.DASHBOARD,
	MenuPriority.Highest,
	{
		text: 'Dashboard',
		href: inject(SIENAR_URLS.DASHBOARD),
		icon: <Dashboard/>,
		requireLoggedIn: false
	}
);

addMenuLinksWithPriority(
	SIENAR_MENUS.DASHBOARD,
	MenuPriority.Lowest,
	{
		text: 'Return home',
		href: inject(SIENAR_URLS.HOME),
		icon: <Home/>
	}
);