import Card from '@/react-ui/Card';
import type { HttpMethod, ValidationResult } from '@/react-utils';
import { formValidationContext, sendRequest, Color } from '@/react-utils';
import type { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import { useContext, useEffect, useRef } from 'react';
import { Button } from '@mui/material';

export type FormProps<T> = PropsWithChildren & {
	color?: Color
	headerBackgroundColor?: string
	headerTextColor?: string
	id: string
	title: string
	onSubmit?: (formValues: Record<string, any>) => boolean
	onReset?: () => Promise<void> | void
	onSuccess?: (result: T) => any
	method: HttpMethod
	action: string
	submitText?: string
	resetText?: string
	showReset?: boolean
	information?: ReactNode
	additionalActions?: ReactNode
	variant?: 'elevation'|'outlined'
	elevation?: number
}

export default function Form<T>(props: FormProps<T>) {
	const {
		color,
		headerBackgroundColor,
		headerTextColor,
		id,
		title,
		onSubmit,
		onReset,
		onSuccess,
		method,
		action,
		submitText = 'Submit',
		resetText = 'Reset',
		showReset = false,
		information,
		additionalActions,
		children,
		variant,
		elevation
	} = props;

	const formRef = useRef<HTMLFormElement>(null);
	const formContext = useContext(formValidationContext);

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		formContext.hasInteracted = true;

		let valid = true;
		for (let validator in formContext.validators) {
			if (!formContext.validators[validator]()) valid = false;
		}

		if (!valid) return;

		if (onSubmit && !onSubmit(formContext.values)) return;

		const result = await sendRequest<T>({
			url: action,
			method,
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
		});

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
		<>
			<Button
				onClick={handleSubmit}
				form={id}
				// @ts-ignore
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
		</>
	);

	return (
		<formValidationContext.Provider value={formContext}>
			<Card
				title={title}
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
				>
					{children}
				</form>
			</Card>
		</formValidationContext.Provider>
	);
}