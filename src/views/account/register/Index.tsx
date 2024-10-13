import { useNavigate } from 'react-router-dom';
import { Form } from '@/react-ui';
import { validators, getUrl, SIENAR_URLS } from '@/react-utils';

export default function Index() {
	const navigate = useNavigate();

	return (
		<Form.Form<boolean>
			id='register'
			title='Index'
			method='POST'
			action='/api/account'
			onSuccess={(result: boolean) => {
				if (result) navigate(getUrl(SIENAR_URLS.REGISTER_SUCCESSFUL));
			}}
		>
			<Form.Textbox
				name='username'
				displayName='Username'
				validators={[
					validators.required(),
					validators.minLength(6),
					validators.maxLength(32)
				]}
			/>
			<Form.Textbox
				name='email'
				displayName='Email address'
				type='email'
				validators={[
					validators.required(),
					validators.isEmail()
				]}
			/>
			<Form.Textbox
				name='password'
				displayName='Password'
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
				name='confirmPassword'
				displayName='Confirm password'
				type='password'
				validators={[
					validators.matches('Password')
				]}
			/>
			<Form.Checkbox
				name='acceptTos'
				displayName='Accept TOS'
				validators={[
					validators.required()
				]}
				hideNonErrors
			/>
		</Form.Form>
	);
}