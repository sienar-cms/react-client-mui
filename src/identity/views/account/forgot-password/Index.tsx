import { Typography } from '@mui/material';
import { Form, Textbox } from '@sienar/react-ui-mui';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/react-utils';
import { required } from '@sienar/react-validators';
import { FORGOT_PASSWORD_SERVICE } from '@identity/services.ts';
import { FORGOT_PASSWORD_SUCCESSFUL_URL } from '@identity/urls.ts';

export default function Index() {
	useDocumentTitle('Password reset');

	return (
		<AuthorizeRoute mustBeLoggedOut>
			<Form
				serviceKey={FORGOT_PASSWORD_SERVICE}
				title='Forgot password'
				submitText='Request password reset'
				information={(
					<Typography>
						Please enter your username or email address. If your account exists, you should receive an email to reset your password shortly.
					</Typography>
				)}
				successRedirectRoute={FORGOT_PASSWORD_SUCCESSFUL_URL}
			>
				<Textbox
					name='accountName'
					displayName='Username or email address'
					validators={[required()]}
					hideNonErrors
				>
					Username or email address
				</Textbox>
			</Form>
		</AuthorizeRoute>
	);
}