import { useRef } from 'react';
import { TextField } from '@mui/material';
import { useFormField, useRerender } from '@/react-utils';
import ValidationList from './ValidationList';

import type { FormInputProps } from './shared';
import type { ChangeEvent } from 'react';

export type TextInputProps<T extends string | number> = FormInputProps<T> & {
	type?: 'text' | 'password'
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
				sx={{ width: '100%' }}
			/>

			<ValidationList
				validations={validations}
				hideNonErrors={hideNonErrors}
			/>
		</>
	);
};