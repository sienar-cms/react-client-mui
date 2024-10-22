import { Typography } from '@mui/material';
import { Narrow, Form } from '@/react-ui';
import { validators } from '@/react-utils'

export default function Index() {
	return (
		<Narrow>
			<Form.Form
				title='Forgot password'
				action='/api/account/password'
				method='DELETE'
				submitText='Request password reset'
				information={(
					<Typography>
						Please enter your username or email address. If your account exists, you should receive an email to reset your password shortly.
					</Typography>
				)}
			>
				<Form.Textbox
					name='accountName'
					displayName='Username or email address'
					validators={[validators.required()]}
					hideNonErrors
				>
					Username or email address
				</Form.Textbox>
			</Form.Form>
		</Narrow>
	);
}