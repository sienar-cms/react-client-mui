import { StatusPage } from '@/react-ui';

export default function Successful() {
	return (
		<StatusPage title='Password reset requested successfully'>
			You have successfully requested to reset your password. Check your email for a link to reset your password. Click the link, then follow the on-screen instructions to finish resetting your password.
		</StatusPage>
	)
}