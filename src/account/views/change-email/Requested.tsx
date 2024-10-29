import { Pages } from '@/react-ui';

export default function Requested() {
	return (
		<Pages.StatusPage title='Email change requested successfully'>
			You have successfully requested to update your email. Check your email for a confirmation link. When you receive it, click the link to confirm your new email address.
		</Pages.StatusPage>
	);
}