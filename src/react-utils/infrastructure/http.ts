import type { Notification } from './notifications';

export type WebResult<T> = {
	result: T
	notifications: Notification[]
}

export type HttpMethod = 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'HEAD'|'OPTIONS'|'TRACE'|'CONNECT';