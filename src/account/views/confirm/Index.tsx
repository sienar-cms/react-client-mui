import { Form } from '@/react-ui';
import { useSearchParams } from 'react-router-dom';
import { CONFIRM_SUCCESSFUL_ROUTE, CONFIRM_SERVICE } from '@account/keys';

export default function Index() {
	const [ search ] = useSearchParams();
	const userId = search.get('userId');
	const code = search.get('code');

	return (
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
	);
}