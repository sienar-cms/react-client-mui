import { Typography } from '@mui/material';
import { useDocumentTitle } from '@sienar/react-utils';
import { AuthorizeRoute } from '@sienar/react-utils';

export default function Dashboard() {
	useDocumentTitle('Dashboard');

	return (
		<AuthorizeRoute>
			<Typography typography='h1'>Dashboard stub</Typography>
		</AuthorizeRoute>
	);
}