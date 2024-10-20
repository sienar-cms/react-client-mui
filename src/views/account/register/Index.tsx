import { useState } from 'react';
import { Form, Narrow } from '@/react-ui';
import { validators, SIENAR_URLS, useNavigate } from '@/react-utils';

export default function Index() {
	const navigate = useNavigate();
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');

	return (
		<Narrow>
			<Form.Form
				id='register'
				title='Register'
				method='POST'
				action='/api/account'
				onSuccess={(result: boolean) => {
					if (result) {
						navigate(
							SIENAR_URLS.REGISTER_SUCCESSFUL,
							{
								username,
								email
							}
						);
					}
				}}
			>
				<Form.Textbox
					name='username'
					displayName='Username'
					value={username}
					onChange={setUsername}
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
					value={email}
					onChange={setEmail}
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
		</Narrow>
	);
}