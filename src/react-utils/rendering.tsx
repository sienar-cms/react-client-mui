import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRouter } from './router.ts';
import { createStore } from './stores.ts';
import { buildProviderTree, registerProvider } from '@/react-utils/providers.tsx';
import { inject } from '@/react-utils/di.ts';
import { NOTIFICATION_PROVIDER_COMPONENT } from '@/react-utils/notifications.ts';

import type { ReactElement } from 'react';

export function useRerender(): [() => void, boolean] {
	const [trigger, setTrigger] = useState(false);
	return [() => setTrigger(!trigger), trigger];
}

export function createApp(rootId: string = 'root') {
	createRoot(document.getElementById(rootId)!)
		.render(buildProviderTree(createSienarRoot()));
}

function createSienarRoot(): ReactElement {
	const notificationProvider = inject(NOTIFICATION_PROVIDER_COMPONENT, true);
	if (notificationProvider) registerProvider(notificationProvider);

	return (
		<Provider store={ createStore() }>
			<RouterProvider router={ createRouter() }/>
		</Provider>
	);
}