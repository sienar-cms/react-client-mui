import { useRef } from 'react';
import { TextField } from '@mui/material';
import { useFormField, useRerender } from '@/react-utils';
import ValidationList from './ValidationList';

import type { FormInputProps } from './shared';
import type { ChangeEvent } from 'react';

export type TextInputProps<T extends string | number> = FormInputProps<T> & {
	type?: 'text' | 'password' | 'email'
	margin?: 'normal' | 'dense' | 'none'
	fullWidth?: boolean
	onChange?: (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => Promise<any>|any
}

export default function Textbox<T extends string | number>(props: TextInputProps<T>) {
	const {
		id,
		name,
		displayName,
		hideNonErrors,
		validators = [],
		onChange,
		type = 'text',
		margin = 'normal',
		fullWidth = true,
		children
	} = props;

	const currentValue = useRef('' as T);
	const rerender = useRerender();
	const [validations, interact] = useFormField(id, displayName, currentValue, validators);

	const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newValue = (typeof currentValue.current === 'number'
			? parseFloat(e.target.value)
			: e.target.value) as T;
		if (currentValue.current !== newValue) {
			currentValue.current = newValue;
			interact();
			await onChange?.(e);
			rerender();
		}
	}

	return (
		<>
			<TextField
				id={id}
				name={name ?? id}
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
			/>
		</>
	);
};