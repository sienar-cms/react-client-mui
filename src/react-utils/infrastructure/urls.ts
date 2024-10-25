import { useNavigate as useNavigateBase } from 'react-router-dom';
import { inject } from '@/react-utils/infrastructure/di';
import type { InjectionKey } from '@/react-utils/infrastructure/di';

export function useNavigate() {
	const navigate = useNavigateBase();

	return (destination: string|InjectionKey<string>, queryParams?: Record<string, any>|undefined) => {
		let url = typeof destination === 'string'
			? destination
			: inject(destination);

		if (queryParams) {
			const search = new URLSearchParams(queryParams);
			url = `${url}?${search.toString()}`;
		}

		navigate(url);
	}
}

const sienarUrls = {
	HOME: Symbol() as InjectionKey<string>,
	DASHBOARD: Symbol() as InjectionKey<string>,
	LOGIN: Symbol() as InjectionKey<string>,
	REGISTER: Symbol() as InjectionKey<string>,
	REGISTER_SUCCESSFUL: Symbol() as InjectionKey<string>,
	CONFIRM: Symbol() as InjectionKey<string>,
	CONFIRM_SUCCESSFUL: Symbol() as InjectionKey<string>,
	FORGOT_PASSWORD: Symbol() as InjectionKey<string>,
	FORGOT_PASSWORD_SUCCESSFUL: Symbol() as InjectionKey<string>,
	RESET_PASSWORD: Symbol() as InjectionKey<string>,
	RESET_PASSWORD_SUCCESSFUL: Symbol() as InjectionKey<string>,
	UNAUTHORIZED: Symbol() as InjectionKey<string>
};

export const SIENAR_URLS = Object.freeze(sienarUrls);
