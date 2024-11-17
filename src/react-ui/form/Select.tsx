import { useEffect, useId, useRef } from 'react';
import { FormControl, InputLabel, NativeSelect as MaterialSelect, OutlinedInput } from '@mui/material';
import ValidationList from './ValidationList.tsx';
import { useFormFieldValidation, useRerender } from '@sienar/react-utils';

import type { ChangeEvent, ReactNode } from 'react';
import type { FormInputProps } from './shared.ts';

export type SelectProps = FormInputProps<string> & {
	label?: ReactNode,
	fullWidth?: boolean,
	hideDefaultOption?: boolean
}

export default function Select(props: SelectProps) {
	const {
		children,
		label,
		name,
		displayName,
		hideNonErrors,
		hideValidationIfValid = true,
		allValidMessage,
		validators = [],
		value,
		onChange,
		fullWidth = true,
		hideDefaultOption = false
	} = props;

	const inputId = useId();
	const currentValue = useRef(value ?? '');
	const [ rerender ] = useRerender();
	const handleValueStateChange = (newValue: string) => {
		if (newValue === currentValue.current) return;

		currentValue.current = newValue;
		onChange?.(newValue);
		rerender();
	}

	const [ validations, interact ] = useFormFieldValidation(name, displayName, currentValue.current, handleValueStateChange, validators);

	const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
		const newValue = e.target.value;
		if (currentValue.current !== newValue) {
			handleValueStateChange(newValue);
			interact();
		}
	}

	useEffect(() => {
		currentValue.current = value ?? '';
	}, [value]);

	return (
		<div>
			<FormControl fullWidth={fullWidth}>
				<InputLabel
					variant='outlined'
					htmlFor={inputId}
					shrink
				>
					{label ?? displayName}
				</InputLabel>

				<MaterialSelect
					value={currentValue.current}
					onChange={handleChange}
					name={name}
					error={validations.filter(v => !v.valid).length > 0}
					variant={'outlined'}
					input={<OutlinedInput label={label ?? displayName} notched/>}
					inputProps={{
						name: name,
						id: inputId
					}}
					sx={{ mb: 1 }}
				>
					{!hideDefaultOption && <option value='' disabled></option>}

					{children}
				</MaterialSelect>
			</FormControl>

			<ValidationList
				validations={validations}
				hideNonErrors={hideNonErrors}
				hideIfAllValid={hideValidationIfValid}
				allValidMessage={allValidMessage}
			/>
		</div>
	);
}