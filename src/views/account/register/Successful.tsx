import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Narrow } from '@/react-ui';

export default function Successful() {
	const [ params ] = useSearchParams();
	const username = params.get('username');
	const email = params.get('email');

	return (
		<Narrow>
			<Typography typography='h1'>Registered successfully</Typography>
			<Typography>
				Thank you for registering, {username}! A welcome email has been sent to {email}. Please click the verification link in the welcome email to verify your account.
			</Typography>
		</Narrow>
	);
}