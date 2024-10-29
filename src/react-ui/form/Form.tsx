import Card from '@/react-ui/Card';
import type { HttpMethod, ValidationResult } from '@/react-utils';
import { formValidationContext, inject, API_CALLER } from '@/react-utils';
import { useContext, useEffect, useId, useRef } from 'react';
import { Box, Button } from '@mui/material';

import type { MouseEvent, FormEvent } from 'react';
import type { FormProps as BaseFormProps } from './shared';

export type FormProps<T> = BaseFormProps<T> & {
	method: HttpMethod
	action: string
	immediate?: boolean
}

export default function Form<T>(props: FormProps<T>) {
	const {
		title,
		titleTypography,
		titleComponent,
		subtitle,
		subtitleTypography,
		subtitleComponent,
		headerIcon,
		color,
		headerBackgroundColor,
		headerTextColor,
		variant,
		elevation,
		onSubmit,
		submitText = 'Submit',
		resetText = 'Reset',
		showReset = false,
		hideControls = false,
		information,
		additionalActions,
		children,
		onReset,
		onSuccess,
		method,
		action,
		immediate
	} = props;

	const id = useId();
	const formRef = useRef<HTMLFormElement>(null);
	const submitButtonRef = useRef<HTMLButtonElement>(null);
	const formContext = useContext(formValidationContext);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		formContext.hasInteracted = true;

		let valid = true;
		for (let validator in formContext.validators) {
			if (!formContext.validators[validator]()) valid = false;
		}

		if (!valid) return;

		if (onSubmit && !onSubmit(formContext.values)) return;

		const caller = inject(API_CALLER);
		const result = await caller<T>(
			action,
			method,
			{
				body: new FormData(formRef.current!),
				onUnprocessable: e => {
					for (let errored in e.errors) {
						const validationErrors: ValidationResult[] = e.errors[errored].map(e => {
							return {
								valid: false,
								message: e
							}
						});

						formContext.errorSetters[errored]?.(validationErrors);
					}
				}
			}
		);

		if (!result) return;

		await doReset();
		onSuccess?.(result);
	};

	const handleReset = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await doReset();
	}

	const doReset = async () => {
		formContext.hasInteracted = false;
		await onReset?.();
	}

	useEffect(() => {
		if (immediate) submitButtonRef.current!.click();
	}, []);

	// This effect does nothing on load, but when the component unmounts,
	// it resets hasInteracted. Without this, revisiting a submitted form
	// may cause validation to run on load, because
	// a) React caches components for reuse
	// b) the existing formContext.hasInteracted will therefore be true
	useEffect(() => {
		return () => {
			formContext.hasInteracted = false;
		};
	}, []);

	const actions = (
		<Box sx={{
			display: hideControls ? 'none' : 'block'
		}}>
			<Button
				form={id}
				ref={submitButtonRef}
				color={color}
				type='submit'
				variant='contained'
			>
				{submitText}
			</Button>

			{showReset && (
				<Button
					onClick={handleReset}
					color='secondary'
					type='reset'
					variant='outlined'
				>
					{resetText}
				</Button>
			)}
			{additionalActions}
		</Box>
	);

	return (
		<formValidationContext.Provider value={formContext}>
			<Card
				title={title}
				titleTypography={titleTypography}
				titleComponent={titleComponent}
				subtitle={subtitle}
				subtitleTypography={subtitleTypography}
				subtitleComponent={subtitleComponent}
				headerIcon={headerIcon}
				actions={actions}
				color={color}
				headerBackgroundColor={headerBackgroundColor}
				headerTextColor={headerTextColor}
				variant={variant}
				elevation={elevation}
			>
				{information}

				<form
					id={id}
					ref={formRef}
					onSubmit={handleSubmit}
				>
					{children}
				</form>
			</Card>
		</formValidationContext.Provider>
	);
}