import { Pages } from '@/react-ui';
import { Link } from 'react-router-dom';
import { inject } from '@/react-utils';
import { REGISTER_ROUTE } from '@/keys';

export default function Deleted() {
	return (
		<Pages.StatusPage title='Account deleted successfully'>
			Your account has been deleted. You can no longer log in or access your account data, but you can <Link to={inject(REGISTER_ROUTE)}>register again</Link>.
		</Pages.StatusPage>
	);
}