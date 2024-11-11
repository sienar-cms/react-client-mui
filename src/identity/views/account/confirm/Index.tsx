import { Form } from '@/react-ui';
import { useSearchParams } from 'react-router-dom';
import { CONFIRM_SUCCESSFUL_ROUTE } from '@identity/urls.ts';
import { CONFIRM_SERVICE } from '@identity/services.ts';
import { AuthorizeRoute, useDocumentTitle } from '@/react-utils';

export default function Index() {
	useDocumentTitle('Confirming account');

	const [ search ] = useSearchParams();
	const userId = search.get('userId');
	const code = search.get('code');

	return (
		<AuthorizeRoute mustBeLoggedOut>
			<Form
				serviceKey={CONFIRM_SERVICE}
				title='Confirming account'
				successRedirectRoute={CONFIRM_SUCCESSFUL_ROUTE}
				hideControls
				immediate
			>
				Please wait while we confirm your account...
				<input
					type='hidden'
					value={ userId ?? '' }
					name='userId'/>
				<input
					type='hidden'
					value={ code ?? '' }
					name='verificationCode'/>
			</Form>
		</AuthorizeRoute>
	);
}