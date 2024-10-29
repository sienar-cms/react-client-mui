import { Form, Narrow } from '@/react-ui';
import { inject, useNavigate, validators } from '@/react-utils';
import { CHANGE_EMAIL_REQUESTED_ROUTE } from '@account/keys';

export default function Index() {
	const navigate = useNavigate();

	return (
		<Narrow>
			<Form.Form
				action='/api/account/change-email'
				method='POST'
				title='Change email'
				submitText='Change email'
				onSuccess={successful => {
					if (successful) navigate(inject(CHANGE_EMAIL_REQUESTED_ROUTE));
				}}
			>
				<Form.Textbox
					name='email'
					displayName='New email address'
					validators={[
						validators.required(),
						validators.isEmail()
					]}
				/>
				<Form.Textbox
					name='confirmEmail'
					displayName='Confirm new email address'
					validators={[
						validators.matches('New email address')
					]}
				/>
				<Form.Textbox
					name='confirmPassword'
					displayName='Confirm your password'
					type='password'
					validators={[validators.required()]}
				/>
			</Form.Form>
		</Narrow>
	)
}