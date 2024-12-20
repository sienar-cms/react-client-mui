﻿import { Form, Textbox } from '@sienar/react-ui-mui';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/react-utils';
import { required } from '@sienar/react-validators';
import { LOCKOUT_REASONS_URL } from '@identity/urls.ts';
import { LOCKOUT_REASONS_SERVICE } from '@identity/services.ts';
import { useParams } from 'react-router-dom';
import { roles } from '@/constants.ts';

export default function Upsert() {
	const params = useParams();
	const id = params['id'];

	useDocumentTitle(id ? 'Update lockout reason' : 'Create lockout reason');

	return (
		<AuthorizeRoute roles={roles.admin}>
			<Form
				serviceKey={LOCKOUT_REASONS_SERVICE}
				successRedirectRoute={LOCKOUT_REASONS_URL}
				createTitle='Create lockout reason'
				createSubmitText='Add reason'
				updateTitle='Update lockout reason'
				updateSubmitText='Update reason'
				upsert
			>
				<Textbox
					name='reason'
					displayName='Reason'
					validators={[required()]}
				/>
			</Form>
		</AuthorizeRoute>
	);
}