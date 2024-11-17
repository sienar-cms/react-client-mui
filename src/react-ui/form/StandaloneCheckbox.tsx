import { useEffect, useId, useRef } from 'react';
import { Checkbox as MaterialCheckbox, FormControlLabel } from '@mui/material';
import { useFormFieldValidation, useRerender } from '@sienar/react-utils';
import ValidationList from './ValidationList.tsx';

import type { ChangeEvent } from 'react';
import type { FormInputProps } from './shared.ts';

export type StandaloneCheckboxProps = Omit<FormInputProps<boolean>, 'value'> & {
	checked?: boolean
}

export default function StandaloneCheckbox(props: StandaloneCheckboxProps) {
	const {
		name,
		displayName,
		hideNonErrors,
		hideValidationIfValid,
		allValidMessage,
		validators = [],
		checked = false,
		onChange,
		children
	} = props;

	const id = useId();
	const currentChecked = useRef(checked);
	const [rerender] = useRerender();
	const handleCheckedStateChange = (newChecked: boolean) => {
		if (newChecked === currentChecked.current) return;

		currentChecked.current = newChecked;
		onChange?.(newChecked);
		rerender();
	}

	const [validations, interact] = useFormFieldValidation(name, displayName, currentChecked.current, handleCheckedStateChange, validators);

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const newChecked = e.target.checked;

		if (currentChecked.current !== newChecked) {
			handleCheckedStateChange(newChecked);
			interact();
		}
	}

	useEffect(() => {
		currentChecked.current = checked;
	}, [checked]);

	return (
		<div>
			<FormControlLabel
				htmlFor={id}
				control={
					<MaterialCheckbox
						id={id}
						name={name}
						checked={currentChecked.current}
						value={currentChecked.current.toString()}
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
		</div>
	);
}