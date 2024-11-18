import { StatusPage } from '@sienar/react-ui-mui';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/react-utils';

export default function Successful() {
	useDocumentTitle('Email confirmed');

	return (
		<AuthorizeRoute>
			<StatusPage title='Confirmed successfully'>
				Your new email address is now confirmed!
			</StatusPage>
		</AuthorizeRoute>
	);
}