import { Pages } from '@/react-ui';
import { getUrl, SIENAR_URLS } from '@/react-utils';
import { Link } from 'react-router-dom';

export default function Successful() {
	return (
		<Pages.StatusPage title='Confirmed successfully'>
			Your account is now confirmed! You can now <Link to={getUrl(SIENAR_URLS.LOGIN)}>log in</Link>.
		</Pages.StatusPage>
	);
}