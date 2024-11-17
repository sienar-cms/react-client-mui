import { createContext, useEffect, useRef } from 'react';
import { FormControl, FormLabel, RadioGroup as MaterialRadioGroup } from '@mui/material';
import ValidationList from './ValidationList.tsx';
import { useFormFieldValidation, useRerender } from '@sienar/react-utils';

import type { ChangeEvent, ReactNode } from 'react';
import type { FormInputProps } from './shared.ts';

export const radioGroupContext = createContext({
	selected: null,
	name: '',
	handleChange: () => {}
} as RadioGroupContext<any>);

export type RadioGroupProps<T> = FormInputProps<T> & {
	label?: ReactNode,
}

export default function RadioGroup<T>(props: RadioGroupProps<T>) {
	const {
		name,
		displayName,
		label,
		hideNonErrors = true,
		hideValidationIfValid = true,
		allValidMessage,
		validators = [],
		value,
		onChange,
		children
	} = props;

	const currentSelected = useRef<T>(value ?? '' as T);
	const [ rerender ] = useRerender();
	const handleValueStateChange = (newValue: T) => {
		if (newValue === currentSelected.current) return;

		currentSelected.current = newValue;
		onChange?.(newValue);
		rerender();
	}

	const [ validations, interact ] = useFormFieldValidation(name, displayName, currentSelected.current, handleValueStateChange, validators);

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value as T;
		if (currentSelected.current === newValue) return;

		handleValueStateChange(newValue);
		interact();
	}

	useEffect(() => {
		currentSelected.current = value ?? '' as T;
	}, [value]);

	return (
		<radioGroupContext.Provider value={{
			selected: currentSelected.current,
			name,
			handleChange
		}}>
			<FormControl
				component='fieldset'
				error={validations.filter(v => !v.valid).length > 0}
			>
				<FormLabel component='legend'>{label ?? displayName}</FormLabel>

				<MaterialRadioGroup
					name={name}
					// @ts-ignore
					onChange={handleChange}
				>
					{children}
				</MaterialRadioGroup>

				<ValidationList
					validations={validations}
					hideNonErrors={hideNonErrors}
					hideIfAllValid={hideValidationIfValid}
					allValidMessage={allValidMessage}
				/>
			</FormControl>
		</radioGroupContext.Provider>
	);
}

export type RadioGroupContext<T> = {
	selected: T|null,
	name: string,
	handleChange: (e: ChangeEvent<HTMLInputElement>) => any
}