import type { PropsWithChildren } from 'react';
import type { FormValueValidator } from '@/react-utils';

export type FormInputProps<T extends unknown> = PropsWithChildren & {
	id: string
	name?: string
	displayName: string
	value?: T,
	validators?: FormValueValidator<T>[]
	hideNonErrors?: boolean
}