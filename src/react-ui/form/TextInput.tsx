import { TextField } from '@mui/material';
import { useFormField, ValidationResult } from '@/react-utils';
import ValidationList from './ValidationList.tsx';

import type { FormInputProps } from './shared';
import type { ChangeEvent, PropsWithChildren } from 'react';

export type TextInputProps<T extends string | number> = FormInputProps<T> & {
	type?: 'text' | 'password';
	serverErrors?: string[]
	setServerErrors?: (newErrors: string[]) => void
}

export default function TextInput<T extends string | number>(props: PropsWithChildren<TextInputProps<T>>) {
	const {
		id,
		name,
		displayName,
		validators = [],
		value,
		setValue,
		type = 'text',
		children,
		inputRef,
		serverErrors = [],
		setServerErrors
	} = props;

	const [validations, interact] = useFormField(id, displayName, value, validators);
	const completeValidations: ValidationResult[] = [
		...validations,
		...serverErrors.map(e => {
			return {
				valid: false,
				message: e
			}
		})
	];

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newValue = (typeof value === 'number'
			? parseFloat(e.target.value)
			: e.target.value) as T;
		if (value !== newValue) {
			interact();
			setValue(newValue);
			setServerErrors?.([]);
		}
	}

	return (
		<>
			<TextField
				id={id}
				name={name ?? id}
				label={children ?? displayName}
				value={value}
				onChange={handleChange}
				type={type}
				error={validations.filter(v => !v.valid).length > 0}
				inputRef={inputRef}
				sx={{ width: '100%' }}
			/>

			<ValidationList validations={completeValidations}/>
		</>
	);
};