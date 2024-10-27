import { useId, useRef } from 'react';
import { Checkbox as MaterialCheckbox, FormControlLabel } from '@mui/material';
import { useFormFieldValidation, useRerender } from '@/react-utils';
import ValidationList from './ValidationList';

import type {ChangeEvent} from 'react';
import type {FormInputProps} from './shared';

export type CheckboxProps<T> = Omit<FormInputProps<boolean>, 'value'> & {
	value?: T
	checked?: boolean
}

export default function Checkbox<T>(props: CheckboxProps<T>) {
	const {
		name,
		displayName,
		hideNonErrors,
		hideValidationIfValid,
		allValidMessage,
		validators = [],
		value,
		checked = false,
		onChange,
		children
	} = props;

	const isBoolean = !value;
	const id = useId();
	const currentChecked = useRef(checked);
	const rerender = useRerender();
	const [validations, interact] = useFormFieldValidation(name, displayName, currentChecked, validators);

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
				htmlFor={id}
				control={
					<MaterialCheckbox
						id={id}
						name={name}
						checked={currentChecked.current}
						value={value ?? currentChecked.current.toString()}
						onChange={handleChange}
					/>
				}
				label={children ?? displayName}
			/>

			<ValidationList
				validations={validations}
				hideNonErrors={hideNonErrors}
				hideIfAllValid={hideValidationIfValid}
				allValidMessage={allValidMessage}
			/>
		</>
	);
}