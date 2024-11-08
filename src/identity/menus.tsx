import { addLinks, DASHBOARD_MENU, inject, type InjectionKey, type MenuLinkProvider } from '@/react-utils';
import * as URLS from '@identity/urls.ts';
import { roles } from '@/constants.ts';
import { DeleteForever, Email, Key, Lock } from '@mui/icons-material';

export const USER_SETTINGS_MENU = Symbol() as InjectionKey<MenuLinkProvider>;

export function setupIdentityMenus() {
	addLinks(
		DASHBOARD_MENU,
		{
			text: 'Users',
			href: inject(URLS.USERS_ROUTE),
			roles: roles.admin
		},
		{
			text: 'Lockout reasons',
			href: inject(URLS.LOCKOUT_REASONS_ROUTE),
			roles: roles.admin
		}
	);

	addLinks(
		USER_SETTINGS_MENU,
		{
			text: 'Change email address',
			href: inject(URLS.CHANGE_EMAIL_ROUTE),
			icon: <Email/>,
			requireLoggedIn: true
		},
		{
			text: 'Change password',
			href: inject(URLS.CHANGE_PASSWORD_ROUTE),
			icon: <Lock/>,
			requireLoggedIn: true
		},
		{
			text: 'Personal data',
			href: inject(URLS.PERSONAL_DATA_ROUTE),
			icon: <Key/>,
			requireLoggedIn: true
		},
		{
			text: 'Delete account',
			href: inject(URLS.DELETE_ACCOUNT_ROUTE),
			icon: <DeleteForever/>,
			requireLoggedIn: true
		}
	);
}