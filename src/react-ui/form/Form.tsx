import Card from '@/react-ui/Card';
import { formValidationContext } from '@/react-utils';
import { useContext, useEffect, useRef } from 'react';
import { Button } from '@mui/material';

import type { MouseEvent, PropsWithChildren, ReactNode } from 'react';

export type FormProps = PropsWithChildren & {
	id: string
	title: string
	onSubmit: () => Promise<boolean>
	onReset?: () => Promise<void> | void
	method: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'HEAD'|'OPTIONS'|'TRACE'|'CONNECT'
	action: string
	submitText?: string
	resetText?: string
	showReset?: boolean
	information?: ReactNode
	additionalActions?: ReactNode
}

export default function Form(props: FormProps) {
	const {
		id,
		title,
		onSubmit,
		onReset,
		method,
		action,
		submitText = 'Submit',
		resetText = 'Reset',
		showReset = false,
		information,
		additionalActions,
		children
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

		if (valid) {
			const request = new Request(action, {
				method,
				body: new FormData(formRef.current!)
			});
			const result = await fetch(request);
			const response = (await result.json()) as {result: Record<string, any>, notifications: Record<string, any>[]};
			await doReset();
		}
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
				type='submit'
			>
				{submitText}
			</Button>

			{showReset && (
				<Button
					onClick={handleReset}
					color='secondary'
					type='reset'
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