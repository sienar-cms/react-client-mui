import { StatusPage } from '@/react-ui';
import { Link } from 'react-router-dom';
import { inject } from '@/react-utils';
import { LOGIN_ROUTE } from '@identity/urls.ts';

export default function MustBeLoggedIn() {
	return (
		<StatusPage title='You must be logged in'>
			You must be logged in to view this page. <Link to={`${inject(LOGIN_ROUTE)}?returnUrl=${window.location.pathname}`}>Go to login page</Link>
		</StatusPage>
	);
}