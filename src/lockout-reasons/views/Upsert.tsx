import { Form, Narrow } from '@/react-ui';
import { validators } from '@/react-utils';
import { LOCKOUT_REASONS_SERVICE } from '@/lockout-reasons/keys';

export default function Upsert() {
	return (
		<Narrow>
			<Form.Form
				serviceKey={LOCKOUT_REASONS_SERVICE}
				title='Create lockout reason'
				submitText='Add reason'
				upsert
			>
				<Form.Textbox
					name='reason'
					displayName='Reason'
					validators={[validators.required()]}
				/>
			</Form.Form>
		</Narrow>
	);
}