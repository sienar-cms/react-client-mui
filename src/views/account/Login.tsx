import { Form, Narrow } from '@/react-ui';
import { useNavigate, SIENAR_URLS, validators } from '@/react-utils';

export default function Login() {
	const navigate = useNavigate();

	return (
		<Narrow>
			<Form.Form
				title='Log in'
				method='POST'
				action='/api/account/login'
				submitText='Log in'
				onSuccess={(successful: boolean) => {
					if (successful) navigate(SIENAR_URLS.DASHBOARD)
				}}
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