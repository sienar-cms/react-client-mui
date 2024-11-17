import { Link, StatusPage } from '@/react-ui';
import { useDocumentTitle } from '@sienar/react-utils';
import { LOGIN_URL } from '@identity/urls.ts';

export default function Successful() {
	useDocumentTitle('Account confirmed');

	return (
		<StatusPage title='Confirmed successfully'>
			Your account is now confirmed! You can now <Link to={LOGIN_URL}>log in</Link>.
		</StatusPage>
	);
}