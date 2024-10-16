import { createContext, useContext, useEffect, useState } from 'react';

import type { RefObject } from 'react';
import type { FormValueValidator } from './validators';

export const formValidationContext = createContext<FormContext>({
	hasInteracted: false,
	validators: {},
	values: {},
	errorSetters: {}
});

export function useFormFieldValidation<T extends unknown>(
	inputName: string|null|undefined,
	displayName: string|null|undefined,
	input: RefObject<T>,
	validators: FormValueValidator<T>[]
): [
	ValidationResult[],
	() => void
] {
	const [results, setResults] = useState<ValidationResult[]>([]);
	const formContext = useContext(formValidationContext);

	const validate: FormFieldValidator = () => {
		if (!formContext.hasInteracted) {
			return false;
		}

		// If the displayName is not set, the developer should manage validation
		if (!displayName) return true;

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
		if (displayName) {
			formContext.validators[displayName] = validate;
			validate();
		}

		if (inputName) {
			formContext.errorSetters[inputName] = setResults
		}

		return () => {
			if (displayName) delete formContext.validators[displayName];
		};
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
	errorSetters: Record<string, (errors: ValidationResult[]) => void>
}
