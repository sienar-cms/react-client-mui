import { Form, Textbox } from '@sienar/react-ui-mui';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/react-utils';
import { isEmail, required } from '@sienar/react-validators';
import { USERS_URL } from '@identity/urls.ts';
import { USERS_SERVICE } from '@identity/services.ts';
import { useParams } from 'react-router-dom';
import { roles } from '@/constants.ts';

export default function Upsert() {
	const params = useParams();
	const id = params['id'];

	useDocumentTitle(id ? 'Update user' : 'Create user');

	return (
		<AuthorizeRoute roles={roles.admin}>
			<Form
				serviceKey={USERS_SERVICE}
				createTitle='Create user'
				createSubmitText='Add user'
				updateTitle='Update user'
				updateSubmitText='Update user'
				upsert
				successRedirectRoute={USERS_URL}
			>
				<Textbox
					name='username'
					displayName='Username'
					validators={[required()]}
				/>
				<Textbox
					name='email'
					displayName='Email'
					type='email'
					validators={[
						required(),
						isEmail()
					]}
				/>
				<Textbox
					name='password'
					displayName='Password'
					type='password'
					validators={[required()]}
				/>
				<Textbox
					name='confirmPassword'
					displayName='Confirm password'
					type='password'
					validators={[required()]}
				/>
			</Form>
		</AuthorizeRoute>
	);
}