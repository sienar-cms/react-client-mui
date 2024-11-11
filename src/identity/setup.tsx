import { setupIdentityUrls } from '@identity/urls.ts';
import { setupIdentityLayouts } from '@identity/layouts.ts';
import { setupIdentityMenus } from '@identity/menus.tsx';
import { setupIdentityRoutes } from '@identity/routes.ts';
import { setupIdentityServices } from '@identity/services.ts';
import { setupIdentityViews } from '@identity/views.tsx';

export default function identitySetup() {
	setupIdentityUrls();
	setupIdentityLayouts();
	setupIdentityMenus();
	setupIdentityRoutes();
	setupIdentityServices();
	setupIdentityViews();
}