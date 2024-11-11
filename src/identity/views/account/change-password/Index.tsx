import { Form, Textbox } from '@/react-ui';
import { AuthorizeRoute, useDocumentTitle, validators } from '@/react-utils';
import { CHANGE_PASSWORD_SUCCESSFUL_ROUTE } from '@identity/urls.ts';
import { CHANGE_PASSWORD_SERVICE } from '@identity/services.ts';

export default function Index() {
	useDocumentTitle('Change password');

	return (
		<AuthorizeRoute>
			<Form
				serviceKey={CHANGE_PASSWORD_SERVICE}
				title='Change password'
				submitText='Change password'
				successRedirectRoute={CHANGE_PASSWORD_SUCCESSFUL_ROUTE}
			>
				<Textbox
					name='newPassword'
					displayName='New password'
					type='password'
					validators={[
						validators.minLength(8),
						validators.maxLength(64),
						validators.containsNumber(),
						validators.containsLower(),
						validators.containsUpper(),
						validators.containsSpecialCharacter()
					]}
				/>
				<Textbox
					name='confirmNewPassword'
					displayName='Confirm new password'
					type='password'
					validators={[validators.matches('New password')]}
				/>
				<Textbox
					name='currentPassword'
					displayName='Current password'
					type='password'
					validators={[validators.required()]}
				/>
			</Form>
		</AuthorizeRoute>
	);
}