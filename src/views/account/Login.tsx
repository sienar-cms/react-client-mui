import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Form, Narrow } from '@/react-ui';
import { inject, useNavigate, SIENAR_URLS, validators, useAuthDispatch, loadUserData } from '@/react-utils';

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useAuthDispatch();

	return (
		<Narrow>
			<Form.Form
				title='Log in'
				method='POST'
				action='/api/account/login'
				submitText='Log in'
				onSuccess={(successful: boolean) => {
					if (successful) {
						dispatch(loadUserData());
						navigate(SIENAR_URLS.DASHBOARD);
					}
				}}
				additionalActions={(
					<Button
						component={Link}
						to={inject(SIENAR_URLS.FORGOT_PASSWORD)}
						sx={{ ml: 2 }}
						color='secondary'
						variant='outlined'
					>
						I forgot my password
					</Button>
				)}
			>
				<Form.Textbox
					name='accountName'
					displayName='Username or email address'
					validators={[validators.required()]}
					hideNonErrors
				/>
				<Form.Textbox
					name='password'
					displayName='Password'
					type='password'
					validators={[validators.required()]}
					hideNonErrors
				/>
				<Form.Checkbox name='rememberMe'>
					Remember me
				</Form.Checkbox>
			</Form.Form>
		</Narrow>
	)
}