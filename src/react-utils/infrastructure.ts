import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

import type { ReactNode } from 'react';
import type { PayloadAction, Dispatch, UnknownAction, ThunkDispatch } from '@reduxjs/toolkit';

// region Store

export const INFRASTRUCTURE_NAME = 'infrastructure';

const initialState: InfrastructureState = {
	activeMenu: '',
	appbarText: ''
};

export const infrastructureSlice = createSlice({
	name: INFRASTRUCTURE_NAME,
	initialState,
	reducers: {
		setActiveMenu: (state, action: PayloadAction<string>) => {
			state.activeMenu = action.payload;
		},
		setAppbarText: (state, action: PayloadAction<string>) => {
			state.appbarText = action.payload;
		}
	}
});

export const infrastructureReducer = infrastructureSlice.reducer;
export const { setActiveMenu, setAppbarText } = infrastructureSlice.actions;
export const useInfrastructureDispatch = useDispatch.withTypes<ThunkDispatch<InfrastructureState, undefined, UnknownAction> & Dispatch>();
export const useInfrastructureSelector = useSelector.withTypes<InfrastructureRootState>();
export const selectActiveMenu = (state: InfrastructureRootState) => state.infrastructure.activeMenu;
export const selectAppbarText = (state: InfrastructureRootState) => state.infrastructure.appbarText;
export const useActiveMenuSelector = () => useInfrastructureSelector(selectActiveMenu);
export const useAppbarTextSelector = () => useInfrastructureSelector(selectAppbarText);

/**
 * The app's infrastructure-related state
 */
export type InfrastructureState = {
	/**
	 * The name of the currently active menu
	 */
	activeMenu: string

	/**
	 * The text to show in the app bar on the dashboard page
	 */
	appbarText: string
}

/**
 * The partial type of the store's root state that includes the infrastructure information
 */
export type InfrastructureRootState = {
	infrastructure: InfrastructureState
}

// endregion

// region Menus

const dashboardLinks = {} as LinkDictionaryProvider<DashboardLink>;
const menuLinks = {} as LinkDictionaryProvider<MenuLink>;

/**
 * Adds a {@link DashboardLink} or {@link MenuLink} to a {@link LinkDictionaryProvider}. You probably don't want to use this function directly unless you're creating your own customized menu link system.
 *
 * @param dictionary The link dictionary to add a link to
 * @param name The name of the menu or dashboard to add the link to
 * @param link The link to add
 * @param priority The priority of the link to add
 */
export function addLink<T extends DashboardLink | MenuLink>(
	dictionary: LinkDictionaryProvider<T>,
	name: string,
	link: T,
	priority: MenuPriority) {
	link.allRolesRequired ??= true;
	link.requireLoggedIn ??= false;
	link.requireLoggedOut ??= false;
	link.roles ??= [];

	dictionary[name] ??= {} as LinkDictionary<T>;
	dictionary[name][priority] ??= [];
	dictionary[name][priority].push(link);
}

/**
 * Adds a {@link DashboardLink} to the internal {@link LinkDictionaryProvider}
 *
 * @param name The name of the menu to add the link to
 * @param link The link to add
 * @param priority The priority of the link to add
 */
export function addDashboardLink(
	name: string,
	link: DashboardLink,
	priority: MenuPriority = MenuPriority.Normal) {
	addLink(dashboardLinks, name, link, priority);
}

/**
 * Adds a {@link MenuLink} to the internal {@link LinkDictionaryProvider}
 *
 * @param name The name of the menu to add the link to
 * @param link The link to add
 * @param priority The priority of the link to add
 */
export function addMenuLink(
	name: string,
	link: MenuLink,
	priority: MenuPriority = MenuPriority.Normal) {
	addLink(menuLinks, name, link, priority);
}

/**
 * Aggregates an array of {@link DashboardLink} or {@link MenuLink} that have been registered to the given menu or dashboard name. You probably don't want to use this function directly unless you're creating your own customized menu link system.
 *
 * @param links The {@link LinkDictionaryProvider} that contains the links from which to aggregate
 * @param name The name of the menu from which to aggregate links
 */
export function aggregateLinks<T extends DashboardLink & MenuLink>(
	links: LinkDictionaryProvider<T>,
	name: string): T[] {
	const includedLinks: T[] = [];
	if (!links[name]) return includedLinks;

	let priority = MenuPriority.Highest;
	while (priority >= MenuPriority.Lowest) {
		const prioritizedLinks = links[name][priority];
		if (prioritizedLinks) {
			includedLinks.push(...prioritizedLinks);
		}

		priority--;
	}

	return includedLinks;
}

/**
 * Aggregates an array of {@link DashboardLink} that have been registered to the given dashboard name
 *
 * @param name the name of the dashboard from which to aggregate links
 */
export function aggregateDashboardLinks(name: string): DashboardLink[] {
	return aggregateLinks(dashboardLinks, name);
}

/**
 * Aggregates an array of {@link MenuLink} that have been registered to the given menu name
 *
 * @param name the name of the menu from which to aggregate links
 */
export function aggregateMenuLinks(name: string): MenuLink[] {
	return aggregateLinks(menuLinks, name);
}

/**
 * Filters links to determine which links the current user is able to view. Works for {@link DashboardLink} and recursively for {@link MenuLink} with nested links.
 *
 * @param links The array of {@link DashboardLink} or {@link MenuLink} to filter
 * @param userIsLoggedIn Whether the current user is logged in
 * @param userRoles The roles of the current user
 */
export function filterLinks<T extends DashboardLink & MenuLink>(
	links: T[],
	userIsLoggedIn: boolean,
	userRoles: string[]): T[] {
	const includedLinks: T[] = [];

	for (let link of links) {
		if (!userIsAuthorized(link, userIsLoggedIn, userRoles)) {
			continue;
		}

		if (link.sublinks) {
			link.sublinks = filterLinks(link.sublinks, userIsLoggedIn, userRoles);
		}

		includedLinks.push(link);
	}

	return includedLinks;
}

/**
 * Determines if a user is authorized to view a link based on their sign-in status and current roles
 *
 * @param link The link to check for authorization
 * @param userIsSignedIn Whether the current user is signed in to the application
 * @param userRoles The roles of the current user
 */
export function userIsAuthorized<T extends DashboardLink | MenuLink>(
	link: T,
	userIsSignedIn: boolean,
	userRoles: string[]): boolean {
	if (link.requireLoggedIn && !userIsSignedIn) return false;
	if (link.requireLoggedOut && userIsSignedIn) return false;
	if (!link.roles || link.roles.length === 0) return true;

	for (let role of link.roles) {
		if (userRoles.includes(role)) {
			if (link.allRolesRequired) continue;
			return true;
		}

		if (link.allRolesRequired) return false;
	}

	// Default is added when the links are added, so this is guaranteed not to be undefined
	return link.allRolesRequired as boolean;
}

/**
 * A container for {@link DashboardLink} or {@link MenuLink} objects with a string key representing the name of the menu or dashboard
 */
export type LinkDictionaryProvider<T extends DashboardLink | MenuLink> = {
	[id: string]: LinkDictionary<T>
}

/**
 * A container for {@link DashboardLink} or {@link MenuLink} arrays with a {@link MenuPriority} key representing the render order of that key's links
 */
export type LinkDictionary<T extends DashboardLink | MenuLink> = {
	[id in MenuPriority]: T[];
};

/**
 * Contains all the data needed to create a dashboard link
 */
export type DashboardLink = {
	/**
	 * The display text of the link
	 */
	text: string

	/**
	 * The URL the link points to, if any
	 */
	href?: string

	/**
	 * The React component to use as the button component
	 */
	buttonComponent?: ReactNode

	/**
	 * The icon to show along with the link, if any
	 */
	icon?: ReactNode

	/**
	 * Whether the authorization requirements stored in the roles array should be satisfied by all roles in the array being present, or only by a single role being present
	 */
	allRolesRequired?: boolean

	/**
	 * Whether the link should only be displayed if the user is logged in
	 */
	requireLoggedIn?: boolean

	/**
	 * Whether the link should only be displayed if the user is logged out
	 */
	requireLoggedOut?: boolean

	/**
	 * The role(s) required to see the link in the menu or dashboard, if any
	 */
	roles?: string[]|string
}

/**
 * Contains all the data needed to create a menu link
 */
export type MenuLink = DashboardLink & {
	/**
	 * Child links to display in a submenu, if any
	 */
	sublinks?: MenuLink[]

	/**
	 * The icon to render at the end of a menu link
	 */
	endIcon?: ReactNode
}

/**
 * Represents the priority order in which menu items should be rendered
 */
export enum MenuPriority {
	/**
	 * Menu items that should be rendered last
	 */
	Lowest,

	/**
	 * Menu items that should be rendered late, but not last
	 */
	Low,

	/**
	 * Menu items with no special priority
	 */
	Normal,

	/**
	 * Menu items that should be rendered early, but not first
	 */
	High,

	/**
	 * Menu items that should be rendered first
	 */
	Highest
}

// endregion

// region URLs

const urls: Record<string, string> = {};

/**
 * Sets a URL in the URL container
 *
 * @param name The name of the URL to set
 * @param value The URL value
 * @param override Whether to override a URL that already has a value or not
 */
export function setUrl(name: string, value: string, override: boolean = true) {
	if (override) urls[name] = value;
	else urls[name] ??= value;
}

/**
 * Gets a URL from the URL container
 *
 * @param name The name of the URL to get
 * @param fallback A fallback value to use if the URL is not found
 */
export function getUrl(name: string, fallback?: string|undefined): string {
	if (!urls[name] && !fallback) throw new Error(`Unable to locate URL named ${name}`);

	return urls[name] ?? fallback;
}

const sienarUrls = {
	DASHBOARD: 'dashboard',
	LOGIN: 'login',
	UNAUTHORIZED: 'unauthorized'
};

export const SIENAR_URLS = Object.freeze(sienarUrls);

// endregion

// region Custom partials

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

// endregion