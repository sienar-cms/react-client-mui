import { createContext, useContext } from 'react';
import type { InjectionKey } from '@/react-utils/di.ts';
import type { MenuLinkProvider } from '@/react-utils/menus.ts';

export const infrastructureContext = createContext<InfrastructureContext>({
	activeMenu: Symbol(),
	setActiveMenu: () => {}
});
export const useInfrastructureContext = () => useContext(infrastructureContext);

/**
 * The app's infrastructure-related state
 */
export type InfrastructureContext = {
	/**
	 * The name of the currently active menu
	 */
	activeMenu: InjectionKey<MenuLinkProvider>

	/**
	 * Changes the active menu that should be rendered in the dashboard
	 *
	 * @param key The injection key of the menu that should be rendered
	 */
	setActiveMenu: (key: InjectionKey<MenuLinkProvider>) => void
}
