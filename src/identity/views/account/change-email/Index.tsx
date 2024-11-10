﻿import { Form, Textbox } from '@/react-ui';
import { useDocumentTitle, validators } from '@/react-utils';
import { CHANGE_EMAIL_REQUESTED_ROUTE } from '@identity/urls.ts';
import { CHANGE_EMAIL_SERVICE } from '@identity/services.ts';

export default function Index() {
	useDocumentTitle('Change email address');

	return (
		<Form
			serviceKey={CHANGE_EMAIL_SERVICE}
			title='Change email'
			submitText='Change email'
			successRedirectRoute={CHANGE_EMAIL_REQUESTED_ROUTE}
		>
			<Textbox
				name='email'
				displayName='New email address'
				validators={[
					validators.required(),
					validators.isEmail()
				]}
			/>
			<Textbox
				name='confirmEmail'
				displayName='Confirm new email address'
				validators={[
					validators.matches('New email address')
				]}
			/>
			<Textbox
				name='confirmPassword'
				displayName='Confirm your password'
				type='password'
				validators={[validators.required()]}
			/>
		</Form>
	);
}