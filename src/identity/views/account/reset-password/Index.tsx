import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Form, HiddenInput, Textbox } from '@/react-ui';
import { AuthorizeRoute, useDocumentTitle, validators } from '@sienar/react-utils';
import { RESET_PASSWORD_SERVICE } from '@identity/services.ts';
import { RESET_PASSWORD_SUCCESSFUL_URL } from '@identity/urls.ts';

export default function Index() {
	useDocumentTitle('Reset password');

	const [ query ] = useSearchParams();
	const userId = query.get('userId');
	const code = query.get('code');

	return (
		<AuthorizeRoute mustBeLoggedOut>
			<Form
				title='Reset password'
				serviceKey={RESET_PASSWORD_SERVICE}
				submitText='Reset password'
				information={(
					<Typography>
						Please enter your new password. Your password should be at least 8 characters long and have at least one lowercase letter, one uppercase letter, one number, and one special character.
					</Typography>
				)}
				successRedirectRoute={RESET_PASSWORD_SUCCESSFUL_URL}
			>
				<HiddenInput
					value={ userId ?? '' }
					name='userId'
				/>
				<HiddenInput
					value={ code ?? '' }
					name='verificationCode'
				/>
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
					validators={[
						validators.matches('newPassword')
					]}
				/>
			</Form>
		</AuthorizeRoute>
	);
}