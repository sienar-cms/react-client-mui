import { createContext, useRef } from 'react';
import { FormControl, FormLabel, RadioGroup as MaterialRadioGroup } from '@mui/material';
import ValidationList from './ValidationList.tsx';
import { useFormFieldValidation, useRerender } from '@/react-utils';

import type { ReactNode } from 'react';
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
		onChange,
		children
	} = props;

	const currentSelected = useRef<T|null>(null);
	const [ rerender ] = useRerender();
	const [ validations, interact ] = useFormFieldValidation(name, displayName, currentSelected, validators);

	const handleChange = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		const newValue = target.value as T;
		if (currentSelected.current === newValue) return;

		currentSelected.current = newValue;
		interact();
		await onChange?.(newValue);
		rerender();
	}

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
	handleChange: (e: Event) => any
}