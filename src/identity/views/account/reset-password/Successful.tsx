import { Link, StatusPage } from '@/react-ui';
import { useDocumentTitle } from '@/react-utils';
import { LOGIN_URL } from '@identity/urls.ts';

export default function Successful() {
	useDocumentTitle('Password reset');

	return (
		<StatusPage title='Password reset successfully'>
			You have reset your password successfully! You can now <Link to={LOGIN_URL}>log in</Link>.
		</StatusPage>
	)
}