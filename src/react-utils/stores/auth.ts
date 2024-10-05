import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction, Dispatch, UnknownAction, ThunkDispatch } from '@reduxjs/toolkit';

export const AUTH_NAME = 'auth';

const initialState: AuthenticationState = {
	isLoggedIn: false,
	username: null,
	roles: []
};

export const authSlice = createSlice({
	name: AUTH_NAME,
	initialState,
	reducers: {
		/**
		 * Informs the UI that the user has been logged out
		 */
		logout: state => {
			state.isLoggedIn = false;
			state.username = null;
			state.roles = [];
		},

		/**
		 * Informs the UI that the user has been logged in
		 */
		login: (state, action: PayloadAction<LoginPayload>) => {
			state.isLoggedIn = true;
			state.username = action.payload.username;
			state.roles = action.payload.roles as string[];
		}
	}
});

export const authReducer = authSlice.reducer;
export const { logout, login } = authSlice.actions;
export const useAuthDispatch = useDispatch.withTypes<ThunkDispatch<AuthenticationState, undefined, UnknownAction> & Dispatch>();
export const useAuthSelector = useSelector.withTypes<AuthenticationRootState>();
export const selectIsLoggedIn = (state: AuthenticationRootState) => state.auth.isLoggedIn;
export const selectUsername = (state: AuthenticationRootState)=> state.auth.username;
export const selectRoles = (state: AuthenticationRootState)=> state.auth.roles;
export const useIsLoggedInSelector = () => useAuthSelector(selectIsLoggedIn);
export const useUsernameSelector = () => useAuthSelector(selectUsername);
export const useRolesSelector = () => useAuthSelector(selectRoles);

// region Types

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

// endregion
