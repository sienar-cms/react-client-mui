import { Form } from '@/react-ui';
import { useSearchParams } from 'react-router-dom';
import { useDocumentTitle } from '@/react-utils';
import { CHANGE_EMAIL_SUCCESSFUL_ROUTE } from '@identity/urls.ts';
import { CHANGE_EMAIL_CONFIRM_SERVICE } from '@identity/services.ts';

export default function Index() {
	useDocumentTitle('Confirming email address');

	const [ search ] = useSearchParams();
	const userId = search.get('userId');
	const code = search.get('code');

	return (
		<Form
			serviceKey={CHANGE_EMAIL_CONFIRM_SERVICE}
			title='Confirming new email'
			successRedirectRoute={CHANGE_EMAIL_SUCCESSFUL_ROUTE}
			hideControls
			immediate
		>
			Please wait while we confirm your new email address...
			<input
				type='hidden'
				value={ userId ?? '' }
				name='userId'/>
			<input
				type='hidden'
				value={ code ?? '' }
				name='verificationCode'/>
		</Form>
	);
}