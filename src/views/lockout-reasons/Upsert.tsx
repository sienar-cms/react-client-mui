import { Form, Narrow } from '@/react-ui';
import { ApiCrudService, validators } from '@/react-utils';

const service = new ApiCrudService('/api/lockout-reasons');

export default function Upsert() {
	return (
		<Narrow>
			<Form.UpsertForm
				service={service}
				title='Create lockout reason'
				submitText='Add reason'
			>
				<Form.Textbox
					name='reason'
					displayName='Reason'
					validators={[validators.required()]}
				/>
			</Form.UpsertForm>
		</Narrow>
	);
}