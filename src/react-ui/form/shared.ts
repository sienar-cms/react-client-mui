import type { RefObject } from 'react';
import type { FormValueValidator } from '@/react-utils';

export type FormInputProps<T extends unknown> = {
	id: string
	name?: string
	displayName: string
	validators?: FormValueValidator<T>[]
	value: T
	setValue: (input: T) => void
	inputRef?: ((instance: (HTMLDivElement | null)) => void) | RefObject<HTMLDivElement> | null | undefined
}