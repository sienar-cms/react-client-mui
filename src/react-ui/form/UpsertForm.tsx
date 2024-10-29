import Card from '@/react-ui/Card';
import { formValidationContext  } from '@/react-utils';
import { useContext, useEffect, useId, useRef } from 'react';
import { Box, Button } from '@mui/material';

import type { PropsWithChildren, ReactNode, FormEvent } from 'react';
import type { ICrudService } from '@/react-utils';
import type { Color } from '@/react-ui/theme';
import { useParams } from 'react-router-dom';

export type UpsertFormProps<T> = PropsWithChildren & {
	id?: string
	service: ICrudService<T>
	color?: Color
	headerBackgroundColor?: string
	headerTextColor?: string
	title: string
	onSubmit?: (formValues: Record<string, any>) => boolean
	onReset?: () => Promise<void> | void
	onSuccess?: (result: T) => any
	submitText?: string
	resetText?: string
	showReset?: boolean
	hideControls?: boolean
	information?: ReactNode
	additionalActions?: ReactNode
	variant?: 'elevation'|'outlined'
	elevation?: number
	immediate?: boolean
}

export default function UpsertForm<T>(props: UpsertFormProps<T>) {
	const {
		service,
		color,
		headerBackgroundColor,
		headerTextColor,
		title,
		onSubmit,
		submitText = 'Submit',
		resetText = 'Reset',
		showReset = false,
		hideControls = false,
		information,
		additionalActions,
		children,
		variant,
		elevation,
		immediate
	} = props;

	const params = useParams();
	const id = params['id'];
	const isCreating = !id;
	const formId = useId();
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

		if (isCreating) {
			await service.create(new FormData(formRef.current!));
		} else {
			await service.update(new FormData(formRef.current!));
		}
	};

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

	useEffect(() => {
		(async function () {
			if (!isCreating) {
				const initial = await service.read(id);
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
					// onClick={handleReset}
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