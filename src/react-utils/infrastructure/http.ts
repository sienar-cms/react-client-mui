import { Notification, NotificationType, notify } from './notifications';

export async function sendRequest<T>(
	url: string,
	method: HttpMethod,
	body?: BodyInit,
	options?: Omit<RequestInit, 'method'|'body'>
): Promise<T|null> {
	const init: RequestInit = Object.assign({ method, body }, options);
	const request = new Request(url, init);

	let response: Response;

	try {
		response = await fetch(request);
	} catch(e) {
		notify({
			message: 'A network error has occured. Are you connected to the internet?',
			type: NotificationType.Error
		});

		return null;
	}

	if (response.status === 422) {
		const result = await response.json() as ValidationErrorWebResult;

		for (let errored in result.errors) {
			for (let error of result.errors[errored]) {
				notify({ message: error, type: NotificationType.Error });
			}
		}

		return null;
	}

	const result = await response.json() as WebResult<T>;

	if (result.notifications && Array.isArray(result.notifications)) {
		for (let n of result.notifications) notify(n);
	}

	return result.result;
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