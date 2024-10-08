import { Dashboard, Home } from '@mui/icons-material';
import { addMenuLink, getUrl, MenuPriority, SIENAR_MENUS, SIENAR_URLS } from '@/react-utils';

addMenuLink(SIENAR_MENUS.DASHBOARD, {
	text: 'Dashboard',
	href: getUrl(SIENAR_URLS.DASHBOARD),
	icon: <Dashboard/>,
	requireLoggedIn: true
});

addMenuLink(SIENAR_MENUS.DASHBOARD, {
	text: 'Return home',
	href: getUrl(SIENAR_URLS.HOME),
	icon: <Home/>
}, MenuPriority.Lowest);