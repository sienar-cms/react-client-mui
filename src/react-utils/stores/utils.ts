import type { Reducer } from '@reduxjs/toolkit';
import { configureStore, } from '@reduxjs/toolkit';

const reducers: Record<string, Reducer> = {};

export function addReducer(name: string, reducer: Reducer) {
	if (reducers[name]) {
		throw Error(`A reducer with the name "${name}" has already been added to the store`);
	}

	reducers[name] = reducer;
}

export function createStore() {
	return configureStore({ reducer: reducers });
}