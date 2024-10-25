import { Link } from 'react-router-dom';
import { Pages } from '@/react-ui';
import { inject, SIENAR_URLS } from '@/react-utils';

export default function Successful() {
	return (
		<Pages.StatusPage title='Password reset successfully'>
			You have reset your password successfully! You can now <Link to={inject(SIENAR_URLS.LOGIN)}>log in</Link>.
		</Pages.StatusPage>
	)
}