import { useNavigate as useNavigateBase } from 'react-router-dom';

export function useNavigate() {
	const navigate = useNavigateBase();

	return (destination: string, queryParams?: Record<string, any>|undefined) => {
		let url: string;
		try {
			url = getUrl(destination);
		} catch {
			url = destination;
		}

		if (queryParams) {
			const search = new URLSearchParams(queryParams);
			url = `${url}?${search.toString()}`;
		}

		navigate(url);
	}
}

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
	HOME: 'home',
	DASHBOARD: 'dashboard',
	LOGIN: 'login',
	REGISTER: 'register',
	REGISTER_SUCCESSFUL: 'register_successful',
	CONFIRM: 'confirm',
	CONFIRM_SUCCESSFUL: 'confirm_successful',
	FORGOT_PASSWORD: 'forgot_password',
	FORGOT_PASSWORD_SUCCESSFUL: 'forgot_password_successful',
	UNAUTHORIZED: 'unauthorized'
};

export const SIENAR_URLS = Object.freeze(sienarUrls);
