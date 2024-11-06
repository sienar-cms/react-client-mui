import { StatusPage } from '@/react-ui';
import { useDocumentTitle } from '@/react-utils';

export default function Successful() {
	useDocumentTitle('Email confirmed');

	return (
		<StatusPage title='Confirmed successfully'>
			Your new email address is now confirmed!
		</StatusPage>
	);
}