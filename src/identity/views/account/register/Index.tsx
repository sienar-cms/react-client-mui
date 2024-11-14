import { useState } from 'react';
import { Form, Link, Textbox, StandaloneCheckbox } from '@/react-ui';
import { AuthorizeRoute, inject, useDocumentTitle, validators } from '@/react-utils';
import { REGISTER_SERVICE } from '@identity/services.ts';
import { REGISTER_SUCCESSFUL_URL } from '@identity/urls.ts';
import { TOS_URL, PRIVACY_POLICY_URL } from '@/keys.ts';

export default function Index() {
	useDocumentTitle('Register');

	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');

	const tosRoute = inject(TOS_URL, true);
	const privacyPolicyRoute = inject(PRIVACY_POLICY_URL, true);
	const useHiddenField = !tosRoute && !privacyPolicyRoute;
	const useBothAcceptLinks = !!(tosRoute && privacyPolicyRoute);

	return (
		<AuthorizeRoute mustBeLoggedOut>
			<Form
				title='Register'
				serviceKey={REGISTER_SERVICE}
				successRedirectRoute={REGISTER_SUCCESSFUL_URL}
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
						validators.matches('password')
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
		</AuthorizeRoute>
	);
}