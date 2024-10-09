import { createContext, useContext, useEffect, useState } from 'react';

import type { FormValueValidator } from './validators';

export const formErrorContext = createContext<FormContext>({
	hasInteracted: false,
	validators: {}
});

export function useFormField<T extends unknown>(
	id: string,
	displayName: string,
	value: T,
	validators: FormValueValidator<T>[]
): [
	ValidationResult[],
	() => void
] {
	const [results, setResults] = useState<ValidationResult[]>([]);
	const errorContext = useContext(formErrorContext);

	const validate: FormFieldValidator = () => {
		if (!errorContext.hasInteracted) {
			return false;
		}

		const internalResults: ValidationResult[] = [];
		let hasErrors = false;

		for (let validator of validators) {
			const valid = validator.isValid(value);
			internalResults.push({
				valid,
				message: formatValidationMessage(validator, displayName, value)
			});

			if (!valid) {
				hasErrors = true;
			}
		}

		setResults(internalResults);
		return !hasErrors;
	}

	useEffect(() => {
		errorContext.validators[id] = validate;
		validate();

		return () => {delete errorContext.validators[id]};
	}, [value]);

	return [results, () => errorContext.hasInteracted = true];
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
}
