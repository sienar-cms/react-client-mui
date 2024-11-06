import { Form, Textbox } from '@/react-ui';
import { validators } from '@/react-utils';
import { LOCKOUT_REASONS_ROUTE, LOCKOUT_REASONS_SERVICE } from '@identity/keys.ts';

export default function Upsert() {
	return (
		<Form
			serviceKey={LOCKOUT_REASONS_SERVICE}
			successRedirectRoute={LOCKOUT_REASONS_ROUTE}
			createTitle='Create lockout reason'
			createSubmitText='Add reason'
			updateTitle='Update lockout reason'
			updateSubmitText='Update reason'
			upsert
		>
			<Textbox
				name='reason'
				displayName='Reason'
				validators={[validators.required()]}
			/>
		</Form>
	);
}