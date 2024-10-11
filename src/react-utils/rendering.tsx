import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRouter } from './router';
import { createStore } from './stores.ts';

export function createApp(rootId: string = 'root') {
	createRoot(document.getElementById(rootId)!)
		.render(
			<StrictMode>
				<Provider store={ createStore() }>
					<RouterProvider router={ createRouter() }/>
				</Provider>
			</StrictMode>
		);
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