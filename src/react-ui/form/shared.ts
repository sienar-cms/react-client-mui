import type { PropsWithChildren, ReactNode } from 'react';
import type { FormValueValidator } from '@/react-utils';
import type { CardProps } from '@/react-ui/Card';

export type FormInputProps<T extends unknown> = PropsWithChildren & {
	name?: string
	displayName?: string
	value?: T,
	onChange?: (newValue: T) => Promise<any>|any
	validators?: FormValueValidator<T>[]
	hideNonErrors?: boolean
	hideValidationIfValid?: boolean
	allValidMessage?: string
}

export type FormProps<T> = Omit<CardProps, 'actions'> & {
	onSubmit?: (formValues: Record<string, any>) => boolean
	onReset?: () => any
	onSuccess?: (result: T) => any
	submitText?: string
	resetText?: string
	showReset?: boolean
	hideControls?: boolean
	information?: ReactNode
	additionalActions?: ReactNode;
}