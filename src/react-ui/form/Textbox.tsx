import { useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import { useFormFieldValidation, useRerender } from '@/react-utils';
import ValidationList from './ValidationList.tsx';

import type { FormInputProps } from './shared.ts';

export type TextInputProps<T extends string | number> = FormInputProps<T> & {
	type?: 'text' | 'password' | 'email' | 'number'
	margin?: 'normal' | 'dense' | 'none'
	fullWidth?: boolean
}

export default function Textbox<T extends string | number>(props: TextInputProps<T>) {
	const {
		name,
		displayName,
		hideNonErrors,
		hideValidationIfValid = true,
		allValidMessage,
		validators = [],
		onChange,
		type = 'text',
		margin = 'normal',
		fullWidth = true,
		children
	} = props;

	const isNumeric = type === 'number';
	const currentValue = useRef<T>('' as T);
	const fieldRef = useRef<HTMLInputElement|HTMLTextAreaElement>(null);
	const rerender = useRerender();
	const [validations, interact] = useFormFieldValidation(name, displayName, currentValue, validators);

	const handleChange = async (e: Event) => {
		const target = e.target as HTMLInputElement|HTMLTextAreaElement;
		const newValue = (isNumeric
			? parseFloat(target.value)
			: target.value) as T;
		if (currentValue.current !== newValue) {
			currentValue.current = newValue;
			interact();
			await onChange?.(newValue);
			rerender();
		}
	}

	useEffect(() => {
		const ref = fieldRef.current!;
		ref.addEventListener('input', handleChange);
		return () => ref.removeEventListener('input', handleChange);
	});

	return (
		<>
			<TextField
				inputRef={fieldRef}
				name={name}
				label={children ?? displayName}
				type={type}
				error={validations.filter(v => !v.valid).length > 0}
				margin={margin}
				fullWidth={fullWidth}
				slotProps={{
					inputLabel: {
						shrink: true
					}
				}}
			/>

			<ValidationList
				validations={validations}
				hideNonErrors={hideNonErrors}
				hideIfAllValid={hideValidationIfValid}
				allValidMessage={allValidMessage}
			/>
		</>
	);
};