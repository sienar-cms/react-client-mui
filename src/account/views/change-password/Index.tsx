import { Form, Narrow } from '@/react-ui';
import { inject, useNavigate, validators } from '@/react-utils';
import { CHANGE_PASSWORD_SUCCESSFUL_ROUTE } from '@account//keys';

export default function Index() {
	const navigate = useNavigate();

	return (
		<Narrow>
			<Form.Form
				action='/api/account/change-password'
				method='PATCH'
				title='Change password'
				submitText='Change password'
				onSuccess={successful => {
					if (successful) navigate(inject(CHANGE_PASSWORD_SUCCESSFUL_ROUTE));
				}}
			>
				<Form.Textbox
					name='newPassword'
					displayName='New password'
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
					name='confirmNewPassword'
					displayName='Confirm new password'
					type='password'
					validators={[validators.matches('New password')]}
				/>
				<Form.Textbox
					name='currentPassword'
					displayName='Current password'
					type='password'
					validators={[validators.required()]}
				/>
			</Form.Form>
		</Narrow>
	);
}