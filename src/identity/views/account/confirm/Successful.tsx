import { StatusPage } from '@/react-ui';
import { inject } from '@/react-utils';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '@identity/urls.ts';

export default function Successful() {
	return (
		<StatusPage title='Confirmed successfully'>
			Your account is now confirmed! You can now <Link to={inject(LOGIN_ROUTE)}>log in</Link>.
		</StatusPage>
	);
}