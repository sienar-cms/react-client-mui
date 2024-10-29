import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Narrow, Form } from '@/react-ui';
import { validators, useNavigate } from '@/react-utils';
import { RESET_PASSWORD_SUCCESSFUL_ROUTE } from '@account/keys';

export default function Index() {
	const navigate = useNavigate();
	const [ query ] = useSearchParams();
	const userId = query.get('userId');
	const code = query.get('code');

	return (
		<Narrow>
			<Form.Form
				title='Reset password'
				action='/api/account/password'
				method='PATCH'
				submitText='Reset password'
				information={(
					<Typography>
						Please enter your new password. Your password should be at least 8 characters long and have at least one lowercase letter, one uppercase letter, one number, and one special character.
					</Typography>
				)}
				onSuccess={(successful: boolean) => {
					if (successful) navigate(RESET_PASSWORD_SUCCESSFUL_ROUTE);
				}}
			>
				<input
					type='hidden'
					name='userId'
					value={userId!}
				/>
				<input
					type='hidden'
					name='verificationCode'
					value={code!}
				/>
				<Form.Textbox
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
				<Form.Textbox
					name='confirmNewPassword'
					displayName='Confirm new password'
					type='password'
					validators={[
						validators.matches('New password')
					]}
				/>
			</Form.Form>
		</Narrow>
	);
}