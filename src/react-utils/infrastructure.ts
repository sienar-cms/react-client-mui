﻿import { createContext, useContext, useEffect } from 'react';
import { inject } from '@/react-utils/di.ts';
import type { InjectionKey } from '@/react-utils/di.ts';
import type { MenuLinkProvider } from '@/react-utils/menus.ts';

export const DOCUMENT_TITLE_SUFFIX = Symbol() as InjectionKey<string>;

export const infrastructureContext = createContext<InfrastructureContext>({
	activeMenu: Symbol(),
	setActiveMenu: () => {}
});
export const useInfrastructureContext = () => useContext(infrastructureContext);

/**
 * Sets the intended document title on initial render
 *
 * @param title The title to use
 * @param ignoreSuffix Whether to ignore the suffix supplied from DI, even if it exists
 */
export function useDocumentTitle(title: string, ignoreSuffix: boolean = false) {
	useEffect(() => {
		let calculatedTitle = title;
		if (!ignoreSuffix) {
			const suffix = inject(DOCUMENT_TITLE_SUFFIX, true);
			if (suffix) {
				calculatedTitle = `${title} ${suffix}`;
			}
		}

		document.title = calculatedTitle;
	}, []);
}

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
