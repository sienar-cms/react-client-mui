import type { PropsWithChildren, RefObject } from 'react';
import type { FormValueValidator } from '@/react-utils';

export type FormInputProps<T extends unknown> = PropsWithChildren & {
	id: string
	name?: string
	displayName: string
	validators?: FormValueValidator<T>[]
	hideNonErrors?: boolean
	value?: T
	setValue?: (input: T) => void
	inputRef?: ((instance: (HTMLDivElement | null)) => void) | RefObject<HTMLDivElement> | null | undefined
}