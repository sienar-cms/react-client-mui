import type { ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { inject } from '@/react-utils/di.ts';

import type { InjectionKey } from '@/react-utils/di.ts';

const routes = new Map<InjectionKey<ReactNode>, RouteObject[]>();

export const ERROR_VIEW = Symbol() as InjectionKey<ReactNode>;

export function registerRoutes(layoutKey: InjectionKey<ReactNode>, ...items: RouteObject[]): void {
	if (!routes.has(layoutKey)) {
		routes.set(layoutKey, []);
	}

	routes.get(layoutKey)!.push(...items);
}

export function createRouter() {
	const layoutRoutes: RouteObject[] = [];
	const errorComponent = inject(ERROR_VIEW, true);

	for (let [layout, childRoutes] of routes) {
		layoutRoutes.push({
			path: '',
			element: inject(layout),
			errorElement: errorComponent,
			children: childRoutes
		});
	}

	return createBrowserRouter(layoutRoutes);
}
