import { inject } from '@/react-utils/di.ts';
import { NOTIFIER } from '@/react-utils/notifications.ts';
import { sendRequest } from '@/react-utils/utils.ts';
import { appendSearchParams } from '@/react-utils/http.ts';
import type { ApiCallerOptions, HttpMethod } from '@/react-utils/http.ts';
import type { FormContext, ValidationResult } from './validation.ts';

export type ServiceConfiguration = {
	formContext?: FormContext
}

/**
 * Represents a set of data operations that can be performed against an arbitrary data store
 */
export interface CrudService<T> {
	/**
	 * Creates a new entry in a data store using the given form data
	 *
	 * @param data The data to use to create a new entry
	 * @param options The configuration for the underlying API caller, if any
	 */
	create(data: FormData, options?: ServiceConfiguration): Promise<string|null>

	/**
	 * Reads a single entry from a data store
	 *
	 * @param id The ID of the entry to read
	 * @param filter Additional data filtering, if any
	 * @param options The configuration for the underlying API caller, if any
	 */
	read(id: string, filter?: Filter, options?: ServiceConfiguration): Promise<T|null>

	/**
	 * Reads an array of entries from a data store
	 *
	 * @param filter Additional data filtering, if any
	 * @param options The configuration for the underlying API caller, if any
	 */
	readAll(filter?: Filter, options?: ServiceConfiguration): Promise<PagedQuery<T>>

	/**
	 * Updates an entry in a data store
	 *
	 * @param data The data to use to update the entry
	 * @param options The configuration for the underlying API caller, if any
	 */
	update(data: FormData, options?: ServiceConfiguration): Promise<boolean>

	/**
	 * Deletes an entry in a data store
	 *
	 * @param id The ID of the entry to delete
	 * @param options The configuration for the underlying API caller, if any
	 */
	delete(id: string, options?: ServiceConfiguration): Promise<boolean>
}

export class ApiCrudService<T> implements CrudService<T> {
	private readonly endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	create(
		data: FormData,
		options?: ServiceConfiguration
	): Promise<string|null> {
		const requestOptions: ApiCallerOptions = Object.assign(
			{ body: data },
			options
		);

		return sendRequest<string>(
			this.endpoint,
			'POST',
			requestOptions
		);
	}

	read(
		id: string,
		filter?: Filter,
		options?: ServiceConfiguration
	): Promise<T|null> {
		const url = appendSearchParams(`${this.endpoint}/${id}`, filter);
		return sendRequest<T>(
			url,
			'GET',
			mapServiceConfigurationToApiCallerOptions(options, undefined)
		);
	}

	async readAll(
		filter?: Filter,
		options?: ServiceConfiguration
	): Promise<PagedQuery<T>> {
		const url = appendSearchParams(this.endpoint, filter);
		const result = await sendRequest<PagedQuery<T>>(
			url,
			'GET',
			mapServiceConfigurationToApiCallerOptions(options, undefined)
		);
		return result ?? { items: [], totalCount: 0 };
	}

	async update(
		data: FormData,
		options?: ServiceConfiguration
	): Promise<boolean> {
		const requestOptions = Object.assign(
			{ body: data },
			mapServiceConfigurationToApiCallerOptions(options, undefined)
		);

		const result = await sendRequest<boolean>(
			 this.endpoint,
			 'PUT',
			 requestOptions
		 );
		 return !!result;
	}

	async delete(
		id: string,
		options?: ServiceConfiguration
	): Promise<boolean> {
		const result = await sendRequest<boolean>(
			`${this.endpoint}/${id}`,
			'DELETE',
			mapServiceConfigurationToApiCallerOptions(options, undefined)
		);
		return !!result;
	}
}

/**
 * Maps the configuration on a ServiceConfiguration object to the configuration on an ApiCallerOptions as applicable
 *
 * @param serviceConfiguration The service configuration of a Sienar service
 * @param apiCallerOptions The API caller options used by {@link sendRequest}
 */
export function mapServiceConfigurationToApiCallerOptions(
	serviceConfiguration: ServiceConfiguration|undefined|null,
	apiCallerOptions: ApiCallerOptions|undefined
): ApiCallerOptions|undefined {
	if (!serviceConfiguration) return apiCallerOptions;
	apiCallerOptions ??= {};

	if (serviceConfiguration.formContext) {
		apiCallerOptions.onUnprocessable = e => {
			for (let errored in e.errors) {
				const validationErrors: ValidationResult[] = e.errors[errored].map(e => {
					return {
						valid: false,
						message: e
					}
				});

				serviceConfiguration.formContext!.errorSetters[errored]?.(validationErrors);
			}
		}
	} else {
		apiCallerOptions.onUnprocessable = e => {
			const notifier = inject(NOTIFIER);
			for (let errored in e.errors) {
				for (let error of e.errors[errored]) {
					notifier.error(`${errored}: ${error}`);
				}
			}
		}
	}

	return apiCallerOptions;
}

/**
 * A service that accepts input and returns output
 *
 * @param input The function input
 * @param config The service configuration
 *
 * @returns The result of the operation, or <code>null</code> if the operation failed
 */
export interface Service<TRequest, TResult> {
	(input: TRequest, config?: ServiceConfiguration): Promise<TResult|null>
}

/**
 * A service that accepts input and returns a <code>boolean</code> indicating the success status of the operation
 *
 * @param input The function input
 * @param config The service configuration
 *
 * @returns The result of the operation
 */
export interface StatusService<TRequest> {
	(input: TRequest, config?: ServiceConfiguration): Promise<boolean>
}

/**
 * Sends a {@link StatusService} and maps its input and config appropriately before sending
 *
 * @param url The URL to which to send the request
 * @param method The HTTP method with which to send the request
 * @param input The message body of the request, if any
 * @param config The service configuration provided to the status service, if any
 *
 * @returns The success status of the request
 */
export async function sendStatusServiceRequest(
	url: string,
	method: HttpMethod,
	input?: object,
	config?: ServiceConfiguration
): Promise<boolean> {
	const requestOptions: ApiCallerOptions = {};
	if (input instanceof FormData) {
		requestOptions.body = input;
	} else if (input) {
		const data = new FormData();
		for (let [key, value] of Object.entries(input)) {
			if (Array.isArray(value)) {
				for (let v of value) {
					data.append(key, v);
				}
			} else {
				data.append(key, value);
			}
		}

		requestOptions.body = data;
	}

	const wasSuccessful = await sendRequest<boolean>(
		url,
		method,
		mapServiceConfigurationToApiCallerOptions(config, requestOptions)
	);

	return !!wasSuccessful;
}

/**
 * A service that accepts no input and returns the output of an operation
 *
 * @param config The service configuration
 *
 * @returns The result of the operation, or <code>null</code> if the operation failed
 */
export interface ResultService<TResult> {
	(config?: ServiceConfiguration): Promise<TResult|null>
}

export type PagedQuery<T> = {
	items: T[]
	totalCount: number
}

export type Filter = {
	searchTerm?: string
	sortName?: string
	sortDescending?: boolean
	page?: number
	pageSize?: number
	includes?: string[]
}