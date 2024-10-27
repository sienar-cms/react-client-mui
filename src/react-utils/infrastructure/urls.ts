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
