// This DI container is loosely inspired by VueJS' <code>provide</code>/<code>inject</code> functionality. For the most part, I just borrowed the *idea* to create this (much simpler) DI container; however, the interface <code>InjectionConstraint<T></code> and type <code>InjectionKey<T></code> are directly copied from the VueJS Inject API at https://github.com/vuejs/core/blob/v3.5.12/packages/runtime-core/src/apiInject.ts#L7-L9. The purpose of the copying was to facilitate explicit typing of injected services when using Typescript. The rest of this DI container is custom code that works fundamentally differently from the VueJS Inject API. VueJS is released under the MIT License.

// @ts-ignore: The type in InjectionConstraint is unused, but it is required to be here because it is used when strongly typing services returned using the <code>inject</code> function below.
interface InjectionConstraint<T> {}
export type InjectionKey<T> = symbol & InjectionConstraint<T>;

const di: Record<InjectionKey<any>, any> = {};

/**
 * Registers a service in the Sienar DI container
 *
 * @param key The unique key that identifies the service in the container
 * @param service The service to register
 * @param override Whether to override an existing service if one is already registered
 */
export function registerService<T>(
	key: InjectionKey<T>,
	service: T,
	override: boolean = true
) {
	if (override) di[key] = service;
	else di[key] ??= service;
}

/**
 * Injects a service from the Sienar DI container
 *
 * @param key The unique key that identifies the service in the container
 * @returns The service if it exists
 *
 * @throws Error If no service is registered with the given key
 */
export function inject<T>(key: InjectionKey<T>): T {
	if (!di[key]) throw new Error(`Unable to locate service with key ${String(key)}`);

	return di[key];
}

export type Logger = {
	(...messages: string[]): void
}

export const SERVICES = {
	LOGGER: Symbol() as InjectionKey<Logger>
}