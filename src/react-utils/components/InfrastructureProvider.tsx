import { useState } from 'react';
import { infrastructureContext } from '@/react-utils/infrastructure.ts';
import { DASHBOARD_MENU } from '@/react-utils/menus.ts';

import type { PropsWithChildren } from 'react';
import type { InjectionKey } from '@/react-utils/di.ts';
import type { MenuLinkProvider } from '@/react-utils/menus.ts';

export default function InfrastructureProvider({ children }: PropsWithChildren) {
	const [ activeMenu, setActiveMenu ] = useState<InjectionKey<MenuLinkProvider>>(DASHBOARD_MENU);

	return (
		<infrastructureContext.Provider value={{
			activeMenu,
			setActiveMenu
		}}>
			{children}
		</infrastructureContext.Provider>
	);
}