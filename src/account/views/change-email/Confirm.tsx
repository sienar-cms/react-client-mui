import { Form } from '@/react-ui';
import { useNavigate } from '@/react-utils';
import { useSearchParams } from 'react-router-dom';
import { CHANGE_EMAIL_SUCCESSFUL_ROUTE, CHANGE_EMAIL_CONFIRM_SERVICE } from '@account/keys';

export default function Index() {
	const navigate = useNavigate();
	const [ search ] = useSearchParams();
	const userId = search.get('userId');
	const code = search.get('code');

	return (
		<Form
			serviceKey={CHANGE_EMAIL_CONFIRM_SERVICE}
			title='Confirming new email'
			onSuccess={(successful: boolean) => {
				if (successful) navigate(CHANGE_EMAIL_SUCCESSFUL_ROUTE);
			}}
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