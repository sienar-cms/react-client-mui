import { StatusPage } from '@/react-ui';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/react-utils';

export default function Requested() {
	useDocumentTitle('Email change requested');

	return (
		<AuthorizeRoute>
			<StatusPage title='Email change requested successfully'>
				You have successfully requested to update your email. Check your email for a confirmation link. When you receive it, click the link to confirm your new email address.
			</StatusPage>
		</AuthorizeRoute>
	);
}