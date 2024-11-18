import { StatusPage } from '@sienar/react-ui-mui';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/react-utils';

export default function Successful() {
	useDocumentTitle('Password changed');

	return (
		<AuthorizeRoute>
			<StatusPage title='Password changed successfully'>
				Your password was changed successfully! The next time you log in, you will need to use your updated password.
			</StatusPage>
		</AuthorizeRoute>
	);
}