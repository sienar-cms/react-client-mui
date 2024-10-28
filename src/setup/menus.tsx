import { Dashboard, Email, Home } from '@mui/icons-material';
import { addLinks, addLinksWithPriority, DASHBOARD_MENU, inject, MenuPriority } from '@/react-utils';
import { CHANGE_EMAIL_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, USER_SETTINGS_MENU } from '@/keys';

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

	addLinks(
		USER_SETTINGS_MENU,
		{
			text: 'Change email address',
			href: inject(CHANGE_EMAIL_ROUTE),
			icon: <Email/>,
			requireLoggedIn: true
		}
	);
}