import { useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import { useFormFieldValidation, useRerender } from '@sienar/react-utils';
import ValidationList from './ValidationList.tsx';

import type { ChangeEvent } from 'react';
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
		value,
		onChange,
		type = 'text',
		margin = 'normal',
		fullWidth = true,
		children
	} = props;

	const isNumeric = type === 'number';
	const currentValue = useRef<T>(value ?? '' as T);
	const [rerender] = useRerender();
	const handleValueStateChange = (newValue: T) => {
		if (newValue === currentValue.current) return;

		currentValue.current = newValue;
		onChange?.(newValue);
		rerender();
	}

	const [validations, interact] = useFormFieldValidation(name, displayName, currentValue.current, handleValueStateChange, validators);

	const handleChange = async (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
		const newValue = (isNumeric
			? parseFloat(e.target.value)
			: e.target.value) as T;
		if (currentValue.current !== newValue) {
			handleValueStateChange(newValue);
			interact();
		}
	}

	useEffect(() => {
		currentValue.current = value ?? '' as T;
	}, [value]);

	return (
		<div>
			<TextField
				name={name}
				value={currentValue.current}
				onChange={handleChange}
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
		</div>
	);
};