﻿import { inject } from '@/react-utils/di.ts';
import { NOTIFIER } from '@/react-utils/notifications.ts';
import type { ApiCallerOptions, HttpMethod, ValidationErrorWebResult, WebResult } from '@/react-utils/http.ts';

export async function sendRequest<T>(
	url: string,
	method: HttpMethod,
	args: ApiCallerOptions = {}
): Promise<T|null> {
	const {
		body,
		requestOptions,
		onUnprocessable
	} = args;

	const init: RequestInit = Object.assign({ method, body }, requestOptions);
	const request = new Request(url, init);

	const notifier = inject(NOTIFIER);
	let response: Response;

	try {
		response = await fetch(request);
	} catch(e) {
		notifier.error('A network error has occured. Are you connected to the internet?');

		return null;
	}

	let result: WebResult<T>;
	try {
		if (response.status === 422) {
			const result = await response.json() as Record<string, any>;

			// In this case, the result is a WebResult containing notifications about invalid fields
			if (result['notifications'] && Array.isArray(result['notifications'])) {
				for (let n of (result as WebResult<T>).notifications) notifier.notify(n);
				return null;
			}

			// Otherwise, the result is a ValidationErrorWebResult
			if (!onUnprocessable) return null;

			onUnprocessable(result as ValidationErrorWebResult);
			return null;
		}

		// The status can be 500 and still return a WebResult<T>
		result = await response.json() as WebResult<T>;
	} catch {
		// However, if the status is 500 and the response is blank,
		// response.json() will throw
		notifier.error('An unknown error has occurred.');

		return null;
	}

	if (result.notifications && Array.isArray(result.notifications)) {
		for (let n of result.notifications) notifier.notify(n);
	}

	return result.result;
}

/**
 * Simulates waiting for a specified amount of time. Probably only useful during development.
 *
 * @param time The amount of time to "sleep", in milliseconds
 */
export function sleep(time: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, time));
}