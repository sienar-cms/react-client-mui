import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { StandaloneCheckbox, Form, Narrow, Textbox } from '@/react-ui';
import { inject, useNavigate, validators, useAuthDispatch, loadUserData } from '@/react-utils';
import { DASHBOARD_ROUTE } from '@/keys';
import { FORGOT_PASSWORD_ROUTE, LOGIN_SERVICE } from '@account/keys';

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useAuthDispatch();

	return (
		<Narrow>
			<Form
				serviceKey={LOGIN_SERVICE}
				title='Log in'
				submitText='Log in'
				onSuccess={(successful: boolean) => {
					if (successful) {
						dispatch(loadUserData());
						navigate(DASHBOARD_ROUTE);
					}
				}}
				additionalActions={(
					<Button
						component={Link}
						to={inject(FORGOT_PASSWORD_ROUTE)}
						color='secondary'
						variant='outlined'
					>
						I forgot my password
					</Button>
				)}
			>
				<Textbox
					name='accountName'
					displayName='Username or email address'
					validators={[validators.required()]}
					hideNonErrors
				/>
				<Textbox
					name='password'
					displayName='Password'
					type='password'
					validators={[validators.required()]}
					hideNonErrors
				/>
				<StandaloneCheckbox name='rememberMe'>
					Remember me
				</StandaloneCheckbox>
			</Form>
		</Narrow>
	)
}