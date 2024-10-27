import type { ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { inject } from '@/react-utils/infrastructure/di';

import type { InjectionKey } from '@/react-utils/infrastructure/di';

const routes = new Map<ReactNode, RouteObject[]>();

export const ERROR_VIEW = Symbol() as InjectionKey<ReactNode>;

export function registerRoutes(layout: ReactNode, ...items: RouteObject[]): void {
	if (!routes.has(layout)) {
		routes.set(layout, []);
	}

	routes.get(layout)!.push(...items);
}

export function createRouter() {
	const layoutRoutes: RouteObject[] = [];
	const errorComponent = inject(ERROR_VIEW, true);

	for (let [layout, childRoutes] of routes) {
		layoutRoutes.push({
			path: '',
			element: layout,
			errorElement: errorComponent,
			children: childRoutes
		});
	}

	return createBrowserRouter(layoutRoutes);
}
