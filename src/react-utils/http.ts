import type { Notification } from '@/react-utils/notifications.ts';
import { inject, InjectionKey } from '@/react-utils/di.ts';

export const API_CALLER = Symbol() as InjectionKey<ApiCaller>

export function createApiCall(
	action: string,
	method: HttpMethod,
	onSuccess?: () => any,
	options?: ApiCallerOptions
) {
	return async () => {
		const caller = inject(API_CALLER);
		const successful = await caller<boolean>(action, method, options);
		if (successful && onSuccess) onSuccess();
	}
}

export type ApiCallerOptions = {
	body?: BodyInit
	requestOptions?: Omit<RequestInit, 'method'|'body'>
	onUnprocessable?: (error: ValidationErrorWebResult) => void
}

/**
 * Calls the Sienar REST API
 *
 * @param url The URL of the endpoint to call
 * @param method The HTTP method to use
 * @param options Additional configuration for the API call
 *
 * @returns The expected result if the call succeeded, else <code>null</code>
 */
export interface ApiCaller {
	<T>(url: string, method: HttpMethod, options?: ApiCallerOptions): Promise<T|null>
}

export type WebResult<T> = {
	result: T
	notifications: Notification[]
}

export type ValidationErrorWebResult = {
	title: string,
	status: number,
	traceId: string,
	errors: Record<string, string[]>
}

export type HttpMethod = 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'HEAD'|'OPTIONS'|'TRACE'|'CONNECT';