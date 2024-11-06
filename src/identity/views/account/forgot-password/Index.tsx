import { Typography } from '@mui/material';
import { Form, Textbox } from '@/react-ui';
import { validators } from '@/react-utils';
import { FORGOT_PASSWORD_SERVICE } from '@identity/services.ts';
import { FORGOT_PASSWORD_SUCCESSFUL_ROUTE } from '@identity/urls.ts';

export default function Index() {
	return (
		<Form
			serviceKey={FORGOT_PASSWORD_SERVICE}
			title='Forgot password'
			submitText='Request password reset'
			information={(
				<Typography>
					Please enter your username or email address. If your account exists, you should receive an email to reset your password shortly.
				</Typography>
			)}
			successRedirectRoute={FORGOT_PASSWORD_SUCCESSFUL_ROUTE}
		>
			<Textbox
				name='accountName'
				displayName='Username or email address'
				validators={[validators.required()]}
				hideNonErrors
			>
				Username or email address
			</Textbox>
		</Form>
	);
}