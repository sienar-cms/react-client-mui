import { Form, HiddenInput } from '@sienar/react-ui-mui';
import { useSearchParams } from 'react-router-dom';
import { CONFIRM_SUCCESSFUL_URL } from '@identity/urls.ts';
import { CONFIRM_SERVICE } from '@identity/services.ts';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/react-utils';

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
				successRedirectRoute={CONFIRM_SUCCESSFUL_URL}
				hideControls
				immediate
			>
				Please wait while we confirm your account...
				<HiddenInput
					value={ userId ?? '' }
					name='userId'
				/>
				<HiddenInput
					value={ code ?? '' }
					name='verificationCode'
				/>
			</Form>
		</AuthorizeRoute>
	);
}