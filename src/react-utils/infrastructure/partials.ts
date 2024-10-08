import type { ReactNode } from 'react';

const partials: Record<string, ReactNode> = {};

/**
 * Sets a React partial in the partial container
 *
 * @param name The name of the partial to set
 * @param value The partial value
 * @param override Whether to override the partial if it already has a value
 */
export function setPartial(name: string, value: ReactNode, override: boolean = true) {
	if (override) partials[name] = value;
	else partials[name] ??= value;
}

/**
 * Gets a React partial from the partial container
 *
 * @param name The name of the partial to retrieve
 */
export function getPartial(name: string): ReactNode {
	return partials[name];
}

const sienarPartials = {
	DASHBOARD_HEADER: 'dashboard-header',
	DRAWER_HEADER: 'drawer-header',
	DRAWER_FOOTER: 'drawer-footer'
};

export const SIENAR_PARTIALS = Object.freeze(sienarPartials);
