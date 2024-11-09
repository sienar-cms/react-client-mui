import { StatusPage } from '@/react-ui';

export default function MustBeLoggedOut() {
	return (
		<StatusPage title='You must be logged out'>
			You cannot view this page because some pages, such as the login and registration page, require you to be logged out.
		</StatusPage>
	);
}