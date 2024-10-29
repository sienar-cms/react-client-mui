import Card from '@/react-ui/Card';
import { formValidationContext  } from '@/react-utils';
import { useContext, useEffect, useId, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import type { FormEvent } from 'react';
import type { ICrudService } from '@/react-utils';
import type { FormProps } from './shared';

export type UpsertFormProps<T> = FormProps<T> & {
	service: ICrudService<T>
}

export default function UpsertForm<T>(props: UpsertFormProps<T>) {
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
		service,
		onSubmit,
		submitText = 'Submit',
		resetText = 'Reset',
		showReset = false,
		hideControls = false,
		information,
		additionalActions,
		children
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

	// Reset hasInteracted so cached components load fresh
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