import { Form, Narrow } from '@/react-ui';
import { validators } from '@/react-utils';
import { LOCKOUT_REASONS_SERVICE } from '@/lockout-reasons/keys';

export default function Upsert() {
	return (
		<Narrow>
			<Form.Form
				serviceKey={LOCKOUT_REASONS_SERVICE}
				createTitle='Create lockout reason'
				createSubmitText='Add reason'
				updateTitle='Update lockout reason'
				updateSubmitText='Update reason'
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