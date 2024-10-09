import { createContext, useContext, useEffect, useState } from 'react';

import type { RefObject } from 'react';
import type { FormValueValidator } from './validators';

export const formValidationContext = createContext<FormContext>({
	hasInteracted: false,
	validators: {},
	values: {},
	idMap: {}
});

export function useFormField<T extends unknown>(
	id: string,
	displayName: string,
	input: RefObject<T>,
	validators: FormValueValidator<T>[]
): [
	ValidationResult[],
	() => void
] {
	const [results, setResults] = useState<ValidationResult[]>([]);
	const formContext = useContext(formValidationContext);
	formContext.idMap[displayName] = id;

	const validate: FormFieldValidator = () => {
		if (!formContext.hasInteracted) {
			return false;
		}

		// @ts-ignore
		const currentValue = input.current;
		const internalResults: ValidationResult[] = [];
		let hasErrors = false;
		formContext.values[displayName] = currentValue;

		for (let validator of validators) {
			const valid = validator.isValid(
				currentValue,
				formContext.values
			);
			internalResults.push({
				valid,
				message: formatValidationMessage(validator, displayName, currentValue)
			});

			if (!valid) {
				hasErrors = true;
			}
		}

		setResults(internalResults);
		return !hasErrors;
	}

	useEffect(() => {
		formContext.validators[id] = validate;
		validate();

		return () => {delete formContext.validators[id]};
	}, [input.current]);

	return [results, () => formContext.hasInteracted = true];
}

export function formatValidationMessage(
	validator: FormValueValidator<any>,
	name: string,
	value: any): string {
	let message = validator.message;
	const replacements = Object.assign(
		{ 'name': name, 'value': value },
		validator.replacementValues
	);

	for (let key in replacements) {
		const regex = new RegExp(`\%${key}`, 'g');
		message = message.replace(regex, replacements[key]);
	}

	return message;
}

/**
 * A function that validates the state of a form field
 */
export type FormFieldValidator = {
	(): boolean
};

export type ValidationResult = {
	valid: boolean|null
	message: string
}

export type FormContext = {
	hasInteracted: boolean
	validators: Record<string, FormFieldValidator>
	values: Record<string, any>
	idMap: Record<string, string>
}
