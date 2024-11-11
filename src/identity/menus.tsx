import { addLinks, DASHBOARD_UTILS_SETTINGS_MENU, type InjectionKey, type MenuLinkProvider } from '@/react-utils';
import * as URLS from '@identity/urls.ts';
import { DeleteForever, Email, Group, Key, Lock } from '@mui/icons-material';

export const USER_SETTINGS_MENU = Symbol() as InjectionKey<MenuLinkProvider>;

export function setupIdentityMenus() {
	addLinks(
		DASHBOARD_UTILS_SETTINGS_MENU,
		{
			text: 'Users',
			href: URLS.USERS_ROUTE,
			icon: <Group/>
		},
		{
			text: 'Lockout reasons',
			href: URLS.LOCKOUT_REASONS_ROUTE,
			icon: <Lock/>
		}
	);

	addLinks(
		USER_SETTINGS_MENU,
		{
			text: 'Change email address',
			href: URLS.CHANGE_EMAIL_ROUTE,
			icon: <Email/>,
			requireLoggedIn: true
		},
		{
			text: 'Change password',
			href: URLS.CHANGE_PASSWORD_ROUTE,
			icon: <Lock/>,
			requireLoggedIn: true
		},
		{
			text: 'Personal data',
			href: URLS.PERSONAL_DATA_ROUTE,
			icon: <Key/>,
			requireLoggedIn: true
		},
		{
			text: 'Delete account',
			href: URLS.DELETE_ACCOUNT_ROUTE,
			icon: <DeleteForever/>,
			requireLoggedIn: true
		}
	);
}