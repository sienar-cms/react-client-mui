import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction, Dispatch, UnknownAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { AuthenticationState, AuthenticationRootState, LoginPayload } from '@/react-utils/types';

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
			state.roles = action.payload.roles;
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
