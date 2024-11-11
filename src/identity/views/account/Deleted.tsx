import { StatusPage } from '@/react-ui';
import { Link } from 'react-router-dom';
import { inject, useDocumentTitle } from '@/react-utils';
import { REGISTER_URL } from '@identity/urls.ts';

export default function Deleted() {
	useDocumentTitle('Account deleted');

	return (
		<StatusPage title='Account deleted successfully'>
			Your account has been deleted. You can no longer log in or access your account data, but you can <Link to={inject(REGISTER_URL)}>register again</Link>.
		</StatusPage>
	);
}