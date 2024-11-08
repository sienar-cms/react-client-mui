import { Typography } from '@mui/material';
import { useDocumentTitle } from '@/react-utils';

export default function Dashboard() {
	useDocumentTitle('Dashboard');

	return <Typography typography='h1'>Dashboard stub</Typography>;
}