import Card from '@/react-ui/Card';
import { formErrorContext } from '@/react-utils';
import { useContext, useEffect } from 'react';
import { Button } from '@mui/material';

import type { MouseEvent, PropsWithChildren, ReactNode } from 'react';

export type FormProps = PropsWithChildren & {
	id: string
	title: string
	onSubmit: () => Promise<boolean>
	onReset?: () => Promise<void> | void
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
		submitText = 'Submit',
		resetText = 'Reset',
		showReset = false,
		information,
		additionalActions,
		children
	} = props;

	const errorContext = useContext(formErrorContext);

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		errorContext.hasInteracted = true;

		let valid = true;
		for (let validator in errorContext.validators) {
			if (!errorContext.validators[validator]()) {
				valid = false;
			}
		}

		if (valid && await onSubmit()) {
			await doReset();
		}
	};

	const handleReset = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await doReset();
	}

	const doReset = async () => {
		errorContext.hasInteracted = false;
		await onReset?.();
	}

	// This effect does nothing on load, but when the component unmounts,
	// it resets hasInteracted. Without this, revisiting a submitted form
	// may cause validation to run on load, because
	// a) React caches components for reuse
	// b) the existing errorContext.hasInteracted will therefore be true
	useEffect(() => {
		return () => {
			errorContext.hasInteracted = false;
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
		<formErrorContext.Provider value={errorContext}>
			<Card
				title={title}
				actions={actions}
			>
				{information}

				<form id={id}>
					{children}
				</form>
			</Card>
		</formErrorContext.Provider>
	);
}