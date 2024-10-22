import { useDispatch, useSelector } from 'react-redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useEffect } from 'react';

import type { PayloadAction, Dispatch, UnknownAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { WebResult } from '@/react-utils/infrastructure';

// region Store

export const AUTH_NAME = 'auth';

const initialState: AuthenticationState = {
	isLoggedIn: false,
	username: null,
	roles: []
};

export const loadUserData = createAsyncThunk(
	`${AUTH_NAME}/loadUserData`,
	async () => {
		const response = await fetch('/api/account');
		if (!response.ok) return null;

		const userDataResult = await response.json() as WebResult<LoginPayload>;
		if (!userDataResult.result) return null;

		const userData = userDataResult.result;
		if (!userData.username || !Array.isArray(userData.roles)) return null;

		return userData;
	}
)

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
	},
	extraReducers: builder => {
		builder.addCase(loadUserData.fulfilled, (state, action) => {
			state.isLoggedIn = action.payload !== null;
			if (action.payload === null) {
				state.username = null;
				state.roles = [];
			} else {
				state.username = action.payload.username;
				state.roles = action.payload.roles as string[];
			}
		})
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

// region Hooks

/**
 * Determines whether the user is authorized according to the supplied auth criteria
 *
 * If <code>authRoles</code> is falsy, it checks if the user is logged in. If <code>authRoles</code> is a string, it checks if the user is in any role matching the value of that string. If <code>authRoles</code> is an array, it checks if the user matches the roles in that array.
 *
 * If <code>any</code> is <code>true</code>, the user must satisfy any number of roles in the <code>authRoles</code> array. If <code>any</code> is false, the user must satisfy all roles in the <code>authRoles</code> array. If <code>authRoles</code> is not an array, the <code>any<code> parameter does nothing.
 *
 * @param authRoles The role(s) a user should have in order to be authorized
 * @param any Whether the user should match any or all roles
 */
export function useAuthorized(
	authRoles: string|string[]|null = null,
	any: boolean = false
): boolean {
	const isLoggedIn = useIsLoggedInSelector();
	const userRoles = useRolesSelector();

	if (!authRoles) return isLoggedIn;

	if (!isLoggedIn) return false;

	if (typeof authRoles === 'string') return userRoles.includes(authRoles);

	if (Array.isArray(authRoles)) {
		for (let r of authRoles) {
			const found = userRoles.includes(r);

			// If we found the role and any role will do, the user is authorized
			if (found && any) return true;

			// If we didn't find the role and all props are required, the user isn't authorized
			else if (!found && !any) return false;
		}

		// If we got here, either no roles were found when any role will do,
		// or all roles were found when all roles were required
		// so the result is the opposite of whether the any prop is set
		return !any;
	}

	// Shouldn't ever get here...famous last words
	// This might happen if, for example, a developer is not using Typescript
	// and passes a non-string, non-array value to authRoles
	return false;
}

/**
 * Tells a layout to check if the user is logged in on initialization
 */
export function useAuthInitialization() {
	const dispatch = useAuthDispatch();

	useEffect(() => {
		dispatch(loadUserData());
	}, []);
}

// endregion