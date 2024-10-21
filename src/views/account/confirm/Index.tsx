import { Form, Narrow } from '@/react-ui';
import { useNavigate, SIENAR_URLS } from '@/react-utils';
import { useSearchParams } from 'react-router-dom';

export default function Index() {
	const navigate = useNavigate();
	const [ search ] = useSearchParams();
	const userId = search.get('userId');
	const code = search.get('code');

	return (
		<Narrow>
			<Form.Form
				action='/api/account/confirm'
				method='POST'
				title='Confirming account'
				onSuccess={(successful: boolean) => {
					if (successful) navigate(SIENAR_URLS.CONFIRM_SUCCESSFUL);
				}}
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
			</Form.Form>
		</Narrow>
	)
}