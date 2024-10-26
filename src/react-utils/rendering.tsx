import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { createRouter } from './router';
import { createStore } from './stores';
import { buildProviderTree, registerProvider } from '@/react-utils/infrastructure/providers';

import type { ReactElement } from 'react';

registerProvider(StrictMode);

export function createApp(rootId: string = 'root') {
	createRoot(document.getElementById(rootId)!)
		.render(buildProviderTree(createSienarRoot()));
}

let idCounter = 0;

/**
 * Creates an HTML-legal ID attribute value if none is supplied
 *
 * @param defaultId The supplied HTML ID, if any
 */
export function useId(defaultId?: string): string {
	const [id, setId] = useState(defaultId ?? '');

	useEffect(() => {
		if (!defaultId) setId(`id-${++idCounter}`);
	}, [defaultId]);

	return defaultId ?? id;
}

function createSienarRoot(): ReactElement {
	return (
		<SnackbarProvider>
			<Provider store={ createStore() }>
				<RouterProvider router={ createRouter() }/>
			</Provider>
		</SnackbarProvider>
	);
}