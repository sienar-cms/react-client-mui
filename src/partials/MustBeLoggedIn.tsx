import { StatusPage } from '@/react-ui';

export default function MustBeLoggedIn() {
	return (
		<StatusPage title='You must be logged in'>
			You must be logged in to view this page.
		</StatusPage>
	);
}