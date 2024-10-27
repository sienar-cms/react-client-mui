import { inject } from '@/react-utils/infrastructure/di';
import { NotificationType, SIENAR_NOTIFICATIONS } from '@/react-utils/infrastructure/notifications';
import type { ApiCallerOptions, HttpMethod, ValidationErrorWebResult, WebResult } from '@/react-utils/infrastructure/http';

export async function sendRequest<T>(
	url: string,
	method: HttpMethod,
	args: ApiCallerOptions
): Promise<T|null> {
	const {
		body,
		requestOptions,
		onUnprocessable
	} = args;

	const init: RequestInit = Object.assign({ method, body }, requestOptions);
	const request = new Request(url, init);

	const notify = inject(SIENAR_NOTIFICATIONS.NOTIFIER);
	let response: Response;

	try {
		response = await fetch(request);
	} catch(e) {
		notify(
			'A network error has occured. Are you connected to the internet?',
			NotificationType.Error
		);

		return null;
	}

	let result: WebResult<T>;
	try {
		if (response.status === 422) {
			const result = await response.json() as Record<string, any>;

			// In this case, the result is a WebResult containing notifications about invalid fields
			if (result['notifications'] && Array.isArray(result['notifications'])) {
				for (let n of (result as WebResult<T>).notifications) notify(n.message, n.type);
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
		notify(
			'An unknown error has occurred.',
			NotificationType.Error
		);

		return null;
	}

	if (result.notifications && Array.isArray(result.notifications)) {
		for (let n of result.notifications) notify(n.message, n.type);
	}

	return result.result;
}