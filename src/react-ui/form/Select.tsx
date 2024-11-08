import { useEffect, useId, useRef } from 'react';
import { FormControl, InputLabel, NativeSelect as MaterialSelect, OutlinedInput } from '@mui/material';
import ValidationList from './ValidationList.tsx';
import { useFormFieldValidation, useRerender } from '@/react-utils';

import type { ReactNode } from 'react';
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
		onChange,
		fullWidth = true,
		hideDefaultOption = false
	} = props;

	const inputId = useId();
	const currentValue = useRef('');
	const fieldRef = useRef<HTMLSelectElement>(null);
	const [ rerender ] = useRerender();
	const [ validations, interact ] = useFormFieldValidation(name, displayName, currentValue, validators);

	const handleChange = async (e: Event) => {
		const target = e.target as HTMLSelectElement;
		const newValue = target.value;
		if (currentValue.current !== newValue) {
			currentValue.current = newValue;
			interact();
			await onChange?.(newValue);
			rerender();
		}
	}

	useEffect(() => {
		const ref = fieldRef.current!;
		ref.addEventListener('change', handleChange);
		return () => ref.removeEventListener('change', handleChange);
	});

	return (
		<>
			<FormControl fullWidth={fullWidth}>
				<InputLabel
					variant='outlined'
					htmlFor={inputId}
					shrink
				>
					{label ?? displayName}
				</InputLabel>

				<MaterialSelect
					inputRef={fieldRef}
					defaultValue={''}
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
		</>
	);
}