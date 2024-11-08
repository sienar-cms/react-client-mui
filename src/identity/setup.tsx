import { setupIdentityUrls } from '@identity/urls.ts';
import { setupIdentityMenus } from '@identity/menus.tsx';
import { setupIdentityServices } from '@identity/services.ts';
import { setupIdentityViews } from '@identity/views.tsx';

export default function identitySetup() {
	setupIdentityUrls();
	setupIdentityMenus();
	setupIdentityServices();
	setupIdentityViews();
}