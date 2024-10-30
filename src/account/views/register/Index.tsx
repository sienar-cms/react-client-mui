import { useState } from 'react';
import { Form, Narrow, Textbox, Checkbox } from '@/react-ui';
import { validators, useNavigate } from '@/react-utils';
import { REGISTER_SERVICE, REGISTER_SUCCESSFUL_ROUTE } from '@account/keys';

export default function Index() {
	const navigate = useNavigate();
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');

	return (
		<Narrow>
			<Form
				title='Register'
				serviceKey={REGISTER_SERVICE}
				onSuccess={(result: boolean) => {
					if (result) {
						navigate(
							REGISTER_SUCCESSFUL_ROUTE,
							{
								username,
								email
							}
						);
					}
				}}
			>
				<Textbox
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
				<Textbox
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
				<Textbox
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
				<Textbox
					name='confirmPassword'
					displayName='Confirm password'
					type='password'
					validators={[
						validators.matches('Password')
					]}
				/>
				<Checkbox
					name='acceptTos'
					displayName='Accept TOS'
					validators={[
						validators.required()
					]}
					hideNonErrors
				/>
			</Form>
		</Narrow>
	);
}