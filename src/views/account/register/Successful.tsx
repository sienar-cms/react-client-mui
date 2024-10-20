import { useSearchParams } from 'react-router-dom';
import { Pages } from '@/react-ui';

export default function Successful() {
	const [ params ] = useSearchParams();
	const username = params.get('username');
	const email = params.get('email');

	return (
		<Pages.StatusPage title='Registered successfully'>
			Thank you for registering, {username}! A welcome email has been sent to {email}. Please click the verification link in the welcome email to verify your account.
		</Pages.StatusPage>
	);
}