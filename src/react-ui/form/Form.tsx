import Card from '@/react-ui/Card';
import { formValidationContext, inject } from '@/react-utils';
import { useContext, useEffect, useId, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import type { FormEvent } from 'react';
import type { CrudService, CrudServiceApiCallerOptions, InjectionKey, StatusService, ValidationResult } from '@/react-utils';
import type { FormProps as BaseFormProps } from './shared';

export type UpsertFormProps<T> = {
	upsert: true,
	serviceKey: InjectionKey<CrudService<T>>
}

export type StatusFormProps = {
	upsert?: false,
	serviceKey: InjectionKey<StatusService<FormData>>
}

export type FormProps<T> = BaseFormProps<T> & {
	immediate?: boolean
} & ( UpsertFormProps<T> | StatusFormProps);

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
		immediate,
		upsert,
		serviceKey
	} = props;

	const formId = useId();
	const params = useParams();
	const id = params['id'];
	const isCreating = upsert && !id;
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

		const formData = new FormData(formRef.current!);
		const config: CrudServiceApiCallerOptions = {
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
		};

		let result: T;
		if (upsert) {
			const service = inject(serviceKey);
			if (isCreating) {
				result = await service.create(formData, config) as T;
			} else {
				result = await service.update(formData, config) as T;
			}
		} else {
			const service = inject(serviceKey);
			result = await service(formData) as T;
		}

		if (!result) return;

		formRef.current!.reset();
		onSuccess?.(result);
	};

	const handleReset = async () => {
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

	// If editing, download existing entity and map to form fields
	useEffect(() => {
		(async function () {
			if (!(upsert && !isCreating)) return;

			const service = inject(serviceKey);
			const initial = await service.read(id!);
			if (!initial) return;

			for (let [k, v] of Object.entries(initial)) {
				// No need to do anything to IDs
				if (k === 'id') continue;

				const elements = formRef.current!.elements as Record<string, any>;

				// Let's be nice and handle concurrency stamps for the devs
				if (k === 'concurrencyStamp') {
					if (elements['concurrencyStamp']) {
						elements['concurrencyStamp'].value = v as string;
						continue;
					}

					const input = document.createElement('input');
					input.setAttribute('type', 'hidden');
					input.setAttribute('name', 'concurrencyStamp');
					input.setAttribute('value', v as string);
					formRef.current!.appendChild(input);
					continue;
				}

				// If the element doesn't exist, there's nothing to do
				if (!elements[k]) continue;

				// Set the value appropriately and let the element know
				elements[k].value = v;
				elements[k].dispatchEvent(new Event('input'));
			}
		})();
	}, []);

	const actions = (
		<Box sx={{
			display: hideControls ? 'none' : 'block'
		}}>
			<Button
				form={formId}
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
					id={formId}
					ref={formRef}
					onSubmit={handleSubmit}
				>
					{children}
				</form>
			</Card>
		</formValidationContext.Provider>
	);
}