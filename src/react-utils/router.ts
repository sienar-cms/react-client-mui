import type { ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

const routes = new Map<ReactNode, RouteObject[]>();

export function registerRoutes(layout: ReactNode, ...items: RouteObject[]): void {
	if (!routes.has(layout)) {
		routes.set(layout, []);
	}

	// Add items to the beginning instead of the end so that routes can be overridden
	// Don't bother to reverse the items - devs can override their own routes themselves
	routes.get(layout)!.unshift(...items);
}

export function createRouter() {
	const layoutRoutes: RouteObject[] = [];

	for (let [layout, childRoutes] of routes) {
		layoutRoutes.push({
			path: '',
			element: layout,
			children: childRoutes
		});
	}

	return createBrowserRouter(layoutRoutes);
}
