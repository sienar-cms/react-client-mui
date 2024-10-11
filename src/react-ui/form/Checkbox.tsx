import { useRef } from 'react';
import { Checkbox as MaterialCheckbox, FormControlLabel } from '@mui/material';
import { useFormField, useRerender, useId } from '@/react-utils';
import ValidationList from './ValidationList';

import type {ChangeEvent} from 'react';
import type {FormInputProps} from './shared';

export type CheckboxProps<T> = Omit<FormInputProps<boolean>, 'value'> & {
	value?: T
	checked?: boolean
}

export default function Checkbox<T>(props: CheckboxProps<T>) {
	const {
		id,
		name,
		displayName,
		hideNonErrors,
		validators = [],
		value,
		checked = false,
		onChange,
		children
	} = props;

	const isBoolean = !value;
	const htmlId = useId(id);
	const currentChecked = useRef(checked);
	const rerender = useRerender();
	const [validations, interact] = useFormField(id, displayName, currentChecked, validators);

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const newChecked = e.target.checked;
		if (currentChecked.current !== newChecked) {
			currentChecked.current = newChecked;

			// ASP.NET doesn't understand 'on' means a checkbox is checked
			if (isBoolean) {
				e.target.value = newChecked.toString();
			}

			interact();
			await onChange?.(newChecked);
			rerender();
		}
	}

	return (
		<>
			<FormControlLabel
				htmlFor={htmlId}
				control={
					<MaterialCheckbox
						id={htmlId}
						name={name ?? id}
						checked={currentChecked.current}
						value={value}
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