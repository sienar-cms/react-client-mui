import { StatusPage } from '@/react-ui';

export default function Successful() {
	return (
		<StatusPage title='Password changed successfully'>
			Your password was changed successfully! The next time you log in, you will need to use your updated password.
		</StatusPage>
	);
}