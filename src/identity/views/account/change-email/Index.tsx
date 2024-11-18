import { Form, Textbox } from '@sienar/react-ui-mui';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/react-utils';
import { isEmail, matches, required } from '@sienar/react-validators';
import { CHANGE_EMAIL_REQUESTED_URL } from '@identity/urls.ts';
import { CHANGE_EMAIL_SERVICE } from '@identity/services.ts';

export default function Index() {
	useDocumentTitle('Change email address');

	return (
		<AuthorizeRoute>
			<Form
				serviceKey={CHANGE_EMAIL_SERVICE}
				title='Change email'
				submitText='Change email'
				successRedirectRoute={CHANGE_EMAIL_REQUESTED_URL}
			>
				<Textbox
					name='email'
					displayName='New email address'
					validators={[
						required(),
						isEmail()
					]}
				/>
				<Textbox
					name='confirmEmail'
					displayName='Confirm new email address'
					validators={[
						matches('email')
					]}
				/>
				<Textbox
					name='confirmPassword'
					displayName='Confirm your password'
					type='password'
					validators={[required()]}
				/>
			</Form>
		</AuthorizeRoute>
	);
}