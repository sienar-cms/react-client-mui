import { useEffect, useId, useRef } from 'react';
import { Checkbox as MaterialCheckbox, FormControlLabel } from '@mui/material';
import { useFormFieldValidation, useRerender } from '@/react-utils';
import ValidationList from './ValidationList.tsx';

import type { FormInputProps } from './shared.ts';

export type CheckboxProps<T> = Omit<FormInputProps<boolean>, 'value'> & {
	value?: T
	checked?: boolean
}

export default function StandaloneCheckbox<T>(props: CheckboxProps<T>) {
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
	const fieldRef = useRef<HTMLInputElement>(null);
	const [rerender] = useRerender();
	const [validations, interact] = useFormFieldValidation(name, displayName, currentChecked, validators);

	const handleChange = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		const newChecked = target.checked;

		// ASP.NET doesn't understand 'on' means a checkbox is checked
		if (isBoolean) {
			target.value = newChecked.toString();
		}

		if (currentChecked.current !== newChecked) {
			currentChecked.current = newChecked;
			interact();
			await onChange?.(newChecked);
			rerender();
		}
	}

	useEffect(() => {
		const ref = fieldRef.current!;
		ref.addEventListener('change', handleChange);
		return () => ref.removeEventListener('change', handleChange);
	});

	useEffect(() => {
		if (fieldRef.current) {
			currentChecked.current = fieldRef.current.checked;
			if (isBoolean) fieldRef.current.value = currentChecked.current.toString();
		} else {
			currentChecked.current = checked;
		}
	}, []);

	return (
		<>
			<FormControlLabel
				htmlFor={id}
				control={
					<MaterialCheckbox
						id={id}
						name={name}
						inputRef={fieldRef}
						checked={currentChecked.current}
						value={value ?? currentChecked.current.toString()}
						// @ts-ignore because the handleChange signature is actually the same, but TypeScript doesn't know that as React uses synthetic event signatures
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