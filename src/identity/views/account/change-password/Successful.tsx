import { StatusPage } from '@/react-ui';
import { useDocumentTitle } from '@/react-utils';

export default function Successful() {
	useDocumentTitle('Password changed');

	return (
		<StatusPage title='Password changed successfully'>
			Your password was changed successfully! The next time you log in, you will need to use your updated password.
		</StatusPage>
	);
}