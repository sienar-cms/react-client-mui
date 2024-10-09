import { useRef } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useFormField, useRerender } from '@/react-utils';
import ValidationList from './ValidationList';

import type {ChangeEvent} from 'react';
import type {FormInputProps} from './shared';

export type CheckboxProps = FormInputProps<boolean> & {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => Promise<any>|any
}

export default function CheckboxInput(props: CheckboxProps) {
	const {
		id,
		name,
		displayName,
		hideNonErrors,
		validators = [],
		onChange,
		children
	} = props;

	const currentValue = useRef(false);
	const rerender = useRerender();
	const [validations, interact] = useFormField(id, displayName, currentValue, validators);

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.checked;
		if (currentValue.current !== newValue) {
			currentValue.current = e.target.checked;
			interact();
			await onChange?.(e);
			rerender();
		}
	}

	return (
		<>
			<FormControlLabel
				htmlFor={id}
				control={
					<Checkbox
						id={id}
						name={name ?? id}
						checked={currentValue.current}
						onChange={handleChange}
					/>
				}
				label={children ?? displayName}
			/>

			<ValidationList
				validations={validations}
				hideNonErrors={hideNonErrors}
			/>
		</>
	);
}