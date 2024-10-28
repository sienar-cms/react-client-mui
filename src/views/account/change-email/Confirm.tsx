import { Form, Narrow } from '@/react-ui';
import { useNavigate } from '@/react-utils';
import { useSearchParams } from 'react-router-dom';
import { CHANGE_EMAIL_SUCCESSFUL_ROUTE } from '@/keys/routes';

export default function Index() {
	const navigate = useNavigate();
	const [ search ] = useSearchParams();
	const userId = search.get('userId');
	const code = search.get('code');

	return (
		<Narrow>
			<Form.Form
				action='/api/account/email'
				method='PATCH'
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
			</Form.Form>
		</Narrow>
	)
}