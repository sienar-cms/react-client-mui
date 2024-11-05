import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Textbox, StandaloneCheckbox } from '@/react-ui';
import { inject, validators } from '@/react-utils';
import { REGISTER_SERVICE, REGISTER_SUCCESSFUL_ROUTE } from '@account/keys';
import { TOS_ROUTE, PRIVACY_POLICY_ROUTE } from '@/keys.ts';

export default function Index() {
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');

	const tosRoute = inject(TOS_ROUTE, true);
	const privacyPolicyRoute = inject(PRIVACY_POLICY_ROUTE, true);
	const useHiddenField = !tosRoute && !privacyPolicyRoute;
	const useBothAcceptLinks = !!(tosRoute && privacyPolicyRoute);

	return (
		<Form
			title='Register'
			serviceKey={REGISTER_SERVICE}
			successRedirectRoute={REGISTER_SUCCESSFUL_ROUTE}
			successRedirectQueryParams={{ username, email }}
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

			{useHiddenField && (
				<input
					type='hidden'
					name='acceptTos'
					checked={true}
					value='true'
				/>
			)}
			{!useHiddenField && (
				<StandaloneCheckbox
					name='acceptTos'
					displayName='accept terms'
					validators={[
						validators.required()
					]}
					hideNonErrors
				>
					I accept the {tosRoute && <Link to={tosRoute} target='_blank'>Terms of Service</Link>} {useBothAcceptLinks && 'and'} {privacyPolicyRoute && <Link to={privacyPolicyRoute} target='_blank'>Privacy Policy</Link>}
				</StandaloneCheckbox>
			)}
		</Form>
	);
}