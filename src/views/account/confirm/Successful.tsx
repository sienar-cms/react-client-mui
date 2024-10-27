import { Pages } from '@/react-ui';
import { inject } from '@/react-utils';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '@/keys/routes';

export default function Successful() {
	return (
		<Pages.StatusPage title='Confirmed successfully'>
			Your account is now confirmed! You can now <Link to={inject(LOGIN_ROUTE)}>log in</Link>.
		</Pages.StatusPage>
	);
}