import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { SIENAR_MENUS } from './menus';

import type { PayloadAction, Dispatch, UnknownAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { InjectionKey } from '@/react-utils/infrastructure/di';
import type { MenuLinkProvider } from '@/react-utils/infrastructure/menus';

export const INFRASTRUCTURE_NAME = 'infrastructure';

const initialState: InfrastructureState = {
	activeMenu: SIENAR_MENUS.DASHBOARD,
	appbarText: ''
};

export const infrastructureSlice = createSlice({
	name: INFRASTRUCTURE_NAME,
	initialState,
	reducers: {
		setActiveMenu: (state, action: PayloadAction<InjectionKey<MenuLinkProvider>>) => {
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
	activeMenu: InjectionKey<MenuLinkProvider>

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
