import { Form, Narrow, Textbox } from '@/react-ui';
import { inject, useNavigate, validators } from '@/react-utils';
import { CHANGE_PASSWORD_SUCCESSFUL_ROUTE, CHANGE_PASSWORD_SERVICE } from '@account//keys';

export default function Index() {
	const navigate = useNavigate();

	return (
		<Narrow>
			<Form
				serviceKey={CHANGE_PASSWORD_SERVICE}
				title='Change password'
				submitText='Change password'
				onSuccess={successful => {
					if (successful) navigate(inject(CHANGE_PASSWORD_SUCCESSFUL_ROUTE));
				}}
			>
				<Textbox
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
				<Textbox
					name='confirmNewPassword'
					displayName='Confirm new password'
					type='password'
					validators={[validators.matches('New password')]}
				/>
				<Textbox
					name='currentPassword'
					displayName='Current password'
					type='password'
					validators={[validators.required()]}
				/>
			</Form>
		</Narrow>
	);
}