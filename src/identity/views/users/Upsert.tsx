import { Form, Textbox } from '@/react-ui';
import { useDocumentTitle, validators } from '@/react-utils';
import { USERS_ROUTE } from '@identity/urls.ts';
import { USERS_SERVICE } from '@identity/services.ts';
import { useParams } from 'react-router-dom';

export default function Upsert() {
	const params = useParams();
	const id = params['id'];

	useDocumentTitle(id ? 'Update user' : 'Create user');

	return (
		<Form
			serviceKey={USERS_SERVICE}
			createTitle='Create user'
			createSubmitText='Add user'
			updateTitle='Update user'
			updateSubmitText='Update reason'
			upsert
			successRedirectRoute={USERS_ROUTE}
		>
			<Textbox
				name='username'
				displayName='Username'
				validators={[validators.required()]}
			/>
			<Textbox
				name='email'
				displayName='Email'
				type='email'
				validators={[
					validators.required(),
					validators.isEmail()
				]}
			/>
			<Textbox
				name='password'
				displayName='Password'
				type='password'
				validators={[validators.required()]}
			/>
			<Textbox
				name='confirmPassword'
				displayName='Confirm password'
				type='password'
				validators={[validators.required()]}
			/>
		</Form>
	);
}