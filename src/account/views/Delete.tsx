import { Form, Textbox } from '@/react-ui';
import { Typography } from '@mui/material';
import { useAuthContext, useNavigate, validators } from '@/react-utils';
import { DELETE_ACCOUNT_SERVICE, DELETED_ROUTE } from '@account/keys';

export default function Delete() {
	const authContext = useAuthContext();
	const navigate = useNavigate();

	return (
		<Form
			serviceKey={DELETE_ACCOUNT_SERVICE}
			title='Delete account'
			color='error'
			submitText='Delete account forever!'
			elevation={1}
			information={(
				<Typography>
					Are you sure you want to delete your account? This cannot be undone! Enter your password to confirm you wish to proceed.
				</Typography>
			)}
			onSuccess={successful => {
				if (successful) {
					authContext.logout();
					navigate(DELETED_ROUTE);
				}
			}}
		>
			<Textbox
				name='password'
				displayName='Password'
				type='password'
				validators={[validators.required()]}
				hideNonErrors
			/>
		</Form>
	);
}