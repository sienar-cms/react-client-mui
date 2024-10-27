import { Dashboard, Home } from '@mui/icons-material';
import { addLinksWithPriority, DASHBOARD_MENU, inject, MenuPriority } from '@/react-utils';
import { DASHBOARD_ROUTE, HOME_ROUTE } from '@/keys/routes';

export default function() {
	addLinksWithPriority(
		DASHBOARD_MENU,
		MenuPriority.Highest,
		{
			text: 'Dashboard',
			href: inject(DASHBOARD_ROUTE),
			icon: <Dashboard/>,
			requireLoggedIn: false
		}
	);

	addLinksWithPriority(
		DASHBOARD_MENU,
		MenuPriority.Lowest,
		{
			text: 'Return home',
			href: inject(HOME_ROUTE),
			icon: <Home/>
		}
	);
}