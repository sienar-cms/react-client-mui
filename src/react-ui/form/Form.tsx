import Card from '@/react-ui/Card.tsx';
import { formValidationContext, inject, useNavigate } from '@/react-utils';
import { type ReactNode, useContext, useEffect, useId, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import type { FormEvent } from 'react';
import type { CrudService, InjectionKey, StatusService } from '@/react-utils';
import type { CardProps } from '@/react-ui';

export type UpsertFormProps<T> = {
	upsert: true
	serviceKey: InjectionKey<CrudService<T>>
	createTitle: string
	createSubmitText?: string
	updateTitle: string
	updateSubmitText?: string
}

export type StatusFormProps = {
	upsert?: false
	serviceKey: InjectionKey<StatusService<FormData>>
	title: string
	submitText?: string
}

export type HandleSuccessFormProps<T> = {
	onSuccess: (result: T) => unknown
	successRedirectRoute?: never
	successRedirectQueryParams?: never
}

export type RedirectOnSuccessFormProps = {
	successRedirectRoute: string|InjectionKey<string>
	successRedirectQueryParams?: object
	onSuccess?: never
}

export type FormProps<T> = Omit<CardProps, 'actions'|'title'> & {
	onSubmit?: (formValues: Record<string, any>) => boolean
	onReset?: () => any
	resetText?: string
	showReset?: boolean
	resetOnSubmit?: boolean
	hideControls?: boolean
	information?: ReactNode
	additionalActions?: ReactNode;
	immediate?: boolean
}
	& ( UpsertFormProps<T> | StatusFormProps)
	& ( HandleSuccessFormProps<T> | RedirectOnSuccessFormProps);

export default function Form<T>(props: FormProps<T>) {
	const {
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
		resetText = 'Reset',
		showReset = false,
		resetOnSubmit = false,
		hideControls = false,
		information,
		additionalActions,
		children,
		onReset,
		immediate,
		upsert,
		serviceKey
	} = props;

	const formId = useId();
	const params = useParams();
	const id = params['id'];
	const isCreating = !!(upsert && !id);
	const formRef = useRef<HTMLFormElement>(null);
	const submitButtonRef = useRef<HTMLButtonElement>(null);
	const resetButtonRef = useRef<HTMLButtonElement>(null);
	const formContext = useContext(formValidationContext);
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		formContext.hasInteracted = true;

		let valid = true;
		for (let field in formContext.fields) {
			if (!formContext.fields[field].validator()) valid = false;
		}

		if (!valid) return;

		if (onSubmit && !onSubmit(formContext.fields)) return;

		const formData = new FormData();
		for (let field in formContext.fields) {
			if (Array.isArray(formContext.fields[field].value)) {
				for (let value of formContext.fields[field].value) {
					formData.append(field, value);
				}
			} else {
				formData.append(field, formContext.fields[field].value);
			}
		}
		const config = { formContext };

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
			result = await service(formData, config) as T;
		}

		if (!result) return;

		if (resetOnSubmit) {
			resetButtonRef.current!.click();
		}

		if (props.onSuccess) {
			props.onSuccess(result);
		} else {
			navigate(props.successRedirectRoute, props.successRedirectQueryParams);
		}
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
				// Let's be nice and handle IDs and concurrency stamps for the devs
				if (k === 'id' || k === 'concurrencyStamp') {
					formContext.fields[k] = {
						displayName: k,
						validator: () => true,
						value: v,
						setValue: () => {},
						validationResults: [],
						setValidationResults: ([]) => {}
					}
					continue;
				}

				// If the element doesn't exist, there's nothing to do
				if (!formContext.fields[k]) continue;

				// Set the value
				formContext.fields[k].setValue(v)
			}
		})();
	}, []);

	const actions = (
		<Box sx={{
			display: hideControls ? 'none' : 'block',
			'& .MuiButtonBase-root': { mr: 2 }
		}}>
			<Button
				form={formId}
				ref={submitButtonRef}
				color={color}
				type='submit'
				variant='contained'
			>
				{generateSubmitText(props, isCreating)}
			</Button>

			<Button
				form={formId}
				ref={resetButtonRef}
				color='secondary'
				type='reset'
				variant='outlined'
				sx={{
					display: showReset ? undefined : 'none'
				}}
			>
				{resetText}
			</Button>
			{additionalActions}
		</Box>
	);

	return (
		<formValidationContext.Provider value={formContext}>
			<Card
				title={generateCardTitle(props, isCreating)}
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
					onReset={handleReset}
				>
					{children}
				</form>
			</Card>
		</formValidationContext.Provider>
	);
}

function generateSubmitText(
	props: UpsertFormProps<unknown>|StatusFormProps,
	isCreating: boolean
): string {
	const defaultText = 'Submit';

	if (props.upsert) {
		return isCreating
			? props.createSubmitText ?? defaultText
			: props.updateSubmitText ?? defaultText;
	}

	return props.submitText ?? defaultText;
}

function generateCardTitle(
	props: UpsertFormProps<unknown>|StatusFormProps,
	isCreating: boolean
): string {
	if (props.upsert) {
		return isCreating
			? props.createTitle
			: props.updateTitle;
	}

	return props.title;
}