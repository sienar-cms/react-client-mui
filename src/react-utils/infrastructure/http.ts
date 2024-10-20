import { Notification, NotificationType, notify } from './notifications';

export type SendRequestArgs = {
	url: string
	method: HttpMethod
	body?: BodyInit
	options?: Omit<RequestInit, 'method'|'body'>
	onUnprocessable?: (error: ValidationErrorWebResult) => void
}

export async function sendRequest<T>(args: SendRequestArgs): Promise<T|null> {
	const {
		url,
		method,
		body,
		options,
		onUnprocessable
	} = args;

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
		const result = await response.json() as Record<string, any>;

		// In this case, the result is a WebResult containing notifications about invalid fields
		if (result['notifications'] && Array.isArray(result['notifications'])) {
			for (let n of (result as WebResult<T>).notifications) notify(n);
			return null;
		}

		// Otherwise, the result is a ValidationErrorWebResult
		if (!onUnprocessable) return null;

		onUnprocessable(result as ValidationErrorWebResult);
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