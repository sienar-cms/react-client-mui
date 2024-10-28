import { Pages } from '@/react-ui';

export default function Successful() {
	return (
		<Pages.StatusPage title='Password changed successfully'>
			Your password was changed successfully! The next time you log in, you will need to use your updated password.
		</Pages.StatusPage>
	);
}