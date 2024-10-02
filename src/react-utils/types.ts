/**
 * The current user's authentication state in the app store
 */
export type AuthenticationState = {
	/**
	 * Whether the current user is logged in
	 */
	isLoggedIn: boolean

	/**
	 * The username of the current user, if any
	 */
	username: string|null

	/**
	 * The roles of the current user, if any
	 */
	roles: string[]
};

/**
 * The partial type of the store's root state that includes the authentication information
 */
export type AuthenticationRootState = {
	auth: AuthenticationState
};

/**
 * The payload describing to the data store what user is logging in and what roles they have
 */
export type LoginPayload = {
	/**
	 * The username of the user currently logging in
	 */
	username: string

	/**
	 * The roles of the user currently logging in
	 */
	roles: readonly string[]
}