import { sendRequest } from '@/react-utils/utils';
import { appendSearchParams } from '@/react-utils/http';
import type { ApiCallerOptions } from '@/react-utils/http';

export type CrudServiceApiCallerOptions = Omit<ApiCallerOptions, 'body'>;

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
	create(data: FormData, options?: CrudServiceApiCallerOptions): Promise<string|null>

	/**
	 * Reads a single entry from a data store
	 *
	 * @param id The ID of the entry to read
	 * @param filter Additional data filtering, if any
	 * @param options The configuration for the underlying API caller, if any
	 */
	read(id: string, filter?: Filter, options?: CrudServiceApiCallerOptions): Promise<T|null>

	/**
	 * Reads an array of entries from a data store
	 *
	 * @param filter Additional data filtering, if any
	 * @param options The configuration for the underlying API caller, if any
	 */
	readAll(filter?: Filter, options?: CrudServiceApiCallerOptions): Promise<PagedQuery<T>>

	/**
	 * Updates an entry in a data store
	 *
	 * @param data The data to use to update the entry
	 * @param options The configuration for the underlying API caller, if any
	 */
	update(data: FormData, options?: CrudServiceApiCallerOptions): Promise<boolean>

	/**
	 * Deletes an entry in a data store
	 *
	 * @param id The ID of the entry to delete
	 * @param options The configuration for the underlying API caller, if any
	 */
	delete(id: string, options?: CrudServiceApiCallerOptions): Promise<boolean>
}

export class ApiCrudService<T> implements CrudService<T> {
	private readonly endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	create(data: FormData): Promise<string|null> {
		return sendRequest<string>(
			this.endpoint,
			'POST',
			{ body: data }
		);
	}

	read(id: string, filter?: Filter): Promise<T|null> {
		const url = appendSearchParams(`${this.endpoint}/${id}`, filter);
		return sendRequest<T>(url, 'GET');
	}

	async readAll(filter?: Filter): Promise<PagedQuery<T>> {
		const url = appendSearchParams(this.endpoint, filter);
		const result = await sendRequest<PagedQuery<T>>(url, 'GET');
		return result ?? { items: [], totalCount: 0 };
	}

	async update(data: FormData): Promise<boolean> {
		 const result = await sendRequest<boolean>(
			 this.endpoint,
			 'PUT',
			 { body: data }
		 );
		 return !!result;
	}

	async delete(id: string): Promise<boolean> {
		const result = await sendRequest<boolean>(`${this.endpoint}/${id}`, 'DELETE');
		return !!result;
	}
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