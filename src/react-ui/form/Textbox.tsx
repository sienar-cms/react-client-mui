import { useRef } from 'react';
import { TextField } from '@mui/material';
import { useFormFieldValidation, useRerender, useId } from '@/react-utils';
import ValidationList from './ValidationList';

import type { FormInputProps } from './shared';
import type { ChangeEvent } from 'react';

export type TextInputProps<T extends string | number> = FormInputProps<T> & {
	type?: 'text' | 'password' | 'email' | 'number'
	margin?: 'normal' | 'dense' | 'none'
	fullWidth?: boolean
}

export default function Textbox<T extends string | number>(props: TextInputProps<T>) {
	const {
		id,
		name,
		displayName,
		value,
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
	const htmlId = useId(id);
	const defaultValue = (isNumeric ? 0 : '') as T;
	const currentValue = useRef(value || defaultValue);
	const rerender = useRerender();
	const [validations, interact] = useFormFieldValidation(name, displayName, currentValue, validators);

	const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newValue = (isNumeric
			? parseFloat(e.target.value)
			: e.target.value) as T;
		if (currentValue.current !== newValue) {
			currentValue.current = newValue;
			interact();
			await onChange?.(newValue);
			rerender();
		}
	}

	return (
		<>
			<TextField
				id={htmlId}
				name={name}
				label={children ?? displayName}
				value={currentValue.current}
				onChange={handleChange}
				type={type}
				error={validations.filter(v => !v.valid).length > 0}
				margin={margin}
				fullWidth={fullWidth}
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