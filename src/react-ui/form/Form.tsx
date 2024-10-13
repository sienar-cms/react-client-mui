import Card from '@/react-ui/Card';
import type { HttpMethod, WebResult } from '@/react-utils';
import { formValidationContext, NotificationType, notify } from '@/react-utils';
import type { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import { useContext, useEffect, useRef } from 'react';
import { Button } from '@mui/material';

export type FormProps<T> = PropsWithChildren & {
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
}

export default function Form<T>(props: FormProps<T>) {
	const {
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

		if (!valid) return;

		if (onSubmit && !onSubmit(formContext.values)) return;

		const request = new Request(action, {
			method,
			body: new FormData(formRef.current!)
		});

		let response: Response;
		try {
			response = await fetch(request);
		} catch {
			notify({
				message: 'A network error has occured. Are you connected to the internet?',
				type: NotificationType.Error
			});
			return;
		}

		// TODO: respond to 422 errors

		if (response.ok) await doReset();

		const result = (await response.json()) as WebResult<T>;

		// TODO: ensure result format matches WebResult and fail if not

		if (result.notifications) {
			for (let notification of result.notifications) {
				notify(notification);
			}
		}

		if (typeof result.result !== 'undefined') {
			onSuccess?.(result.result);
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