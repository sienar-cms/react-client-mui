import { StatusPage } from '@/react-ui';

export default function Unauthorized() {
	return (
		<StatusPage title='Unauthorized'>
			You don't have permission to perform that action!
		</StatusPage>
	)
}