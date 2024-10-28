import { Dashboard, Email, Home, Lock, Key } from '@mui/icons-material';
import { addLinks, addLinksWithPriority, DASHBOARD_MENU, inject, MenuPriority } from '@/react-utils';
import { CHANGE_EMAIL_ROUTE, CHANGE_PASSWORD_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, PERSONAL_DATA_ROUTE, USER_SETTINGS_MENU } from '@/keys';

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
		},
		{
			text: 'Change password',
			href: inject(CHANGE_PASSWORD_ROUTE),
			icon: <Lock/>,
			requireLoggedIn: true
		},
		{
			text: 'Personal data',
			href: inject(PERSONAL_DATA_ROUTE),
			icon: <Key/>,
			requireLoggedIn: true
		}
	);
}