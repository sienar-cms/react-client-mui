import { Dashboard, Home } from '@mui/icons-material';
import { addMenuLinksWithPriority, getUrl, MenuPriority, SIENAR_MENUS, SIENAR_URLS } from '@/react-utils';

addMenuLinksWithPriority(
	SIENAR_MENUS.DASHBOARD,
	MenuPriority.Highest,
	{
		text: 'Dashboard',
		href: getUrl(SIENAR_URLS.DASHBOARD),
		icon: <Dashboard/>,
		requireLoggedIn: false
	}
);

addMenuLinksWithPriority(
	SIENAR_MENUS.DASHBOARD,
	MenuPriority.Lowest,
	{
		text: 'Return home',
		href: getUrl(SIENAR_URLS.HOME),
		icon: <Home/>
	}
);