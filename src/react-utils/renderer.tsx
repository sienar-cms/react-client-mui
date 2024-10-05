import { StrictMode } from 'react';
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