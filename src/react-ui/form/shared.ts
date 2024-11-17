import type { PropsWithChildren } from 'react';
import type { FormValueValidator } from '@sienar/react-utils';

export type FormInputProps<T extends unknown> = PropsWithChildren & {
	name: string
	displayName?: string
	value?: T,
	onChange?: (newValue: T) => Promise<any>|any
	validators?: FormValueValidator<T>[]
	hideNonErrors?: boolean
	hideValidationIfValid?: boolean
	allValidMessage?: string
}