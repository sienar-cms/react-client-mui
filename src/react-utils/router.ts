import { createBrowserRouter } from 'react-router-dom';
import { inject } from '@/react-utils/di.ts';

import type { ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom';
import type { InjectionKey } from '@/react-utils/di.ts';

const routes = new Map<InjectionKey<ReactNode>, Route[]>();

export const ERROR_VIEW = Symbol() as InjectionKey<ReactNode>;

export function registerRoutes(layoutKey: InjectionKey<ReactNode>, ...items: Route[]): void {
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
			children: convertSienarRoutesToReactRoutes(childRoutes)
		});
	}

	return createBrowserRouter(layoutRoutes);
}

export function convertSienarRoutesToReactRoutes(sienarRoutes: Route[]): RouteObject[] {
	const reactRouterRoutes: RouteObject[] = [];

	for (let route of sienarRoutes) {
		const reactRouterRoute: RouteObject = {
			path: typeof route.path === 'string' ? route.path : inject(route.path),
			element: typeof route.element === 'symbol' ? inject(route.element) : route.element,
			children: route.children ? convertSienarRoutesToReactRoutes(route.children) : undefined
		}
		reactRouterRoutes.push(reactRouterRoute);
	}

	return reactRouterRoutes;
}

export type Route = {
	path: string|InjectionKey<string>
	element: ReactNode|InjectionKey<ReactNode>
	children?: Route[]
}