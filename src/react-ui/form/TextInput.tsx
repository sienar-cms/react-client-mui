import { useRef, useState } from 'react';
import { TextField } from '@mui/material';
import { useFormField } from '@/react-utils';
import ValidationList from './ValidationList';

import type { FormInputProps } from './shared';
import type { ChangeEvent } from 'react';

export type TextInputProps<T extends string | number> = FormInputProps<T> & {
	type?: 'text' | 'password';
	serverErrors?: string[]
	setServerErrors?: (newErrors: string[]) => void
}

export default function TextInput<T extends string | number>(props: TextInputProps<T>) {
	const {
		id,
		name,
		displayName,
		validators = [],
		type = 'text',
		children
	} = props;

	const currentValue = useRef('' as T);
	const [rerender, setRerender] = useState(0);
	const [validations, interact] = useFormField(id, displayName, currentValue, validators);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newValue = (typeof currentValue.current === 'number'
			? parseFloat(e.target.value)
			: e.target.value) as T;
		if (currentValue.current !== newValue) {
			interact();
			currentValue.current = newValue;
			setRerender(rerender + 1);
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

			<ValidationList validations={validations}/>
		</>
	);
};