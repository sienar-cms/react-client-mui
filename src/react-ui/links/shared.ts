import { inject } from '@sienar/react-utils';
import type { InjectionKey } from '@sienar/react-utils';

export function getHref(to: string|InjectionKey<string>): string {
	return typeof to === 'string'
		? to
		: inject(to);
}

export type LinkPropsBase = {
	to: string|InjectionKey<string>
}