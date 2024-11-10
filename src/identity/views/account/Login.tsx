import { Button } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { StandaloneCheckbox, Form, Textbox } from '@/react-ui';
import { inject, useNavigate, validators, useAuthContext, useDocumentTitle } from '@/react-utils';
import { DASHBOARD_ROUTE } from '@/keys';
import { FORGOT_PASSWORD_ROUTE } from '@identity/urls.ts';
import { LOGIN_SERVICE } from '@identity/services.ts';
import type { RequestResult } from '@/react-utils';
import type { LoginResult } from '@identity/types.ts';

export default function Login() {
	useDocumentTitle('Log in');
	const navigate = useNavigate();
	const authContext = useAuthContext();
	const [ params ] = useSearchParams();

	const onLogin = async (result: RequestResult<LoginResult>) => {
		if (result.result) {
			console.log('code detected: ', result.result);
		}

		if (!result.wasSuccessful) return;

		await authContext.loadUserData();
		const returnUrl = params.get('returnUrl');

		if (returnUrl) {
			params.delete('returnUrl');
			const queryParams = params.toString();
			navigate(`${returnUrl}?${queryParams}`)
		} else {
			navigate(DASHBOARD_ROUTE);
		}
	}

	return (
		<Form
			serviceKey={LOGIN_SERVICE}
			title='Log in'
			submitText='Log in'
			onSuccess={onLogin}
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
	)
}