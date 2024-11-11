import { Card } from '@/react-ui';
import { Button, Typography } from '@mui/material';
import { AuthorizeRoute, inject, useDocumentTitle } from '@/react-utils';
import { DOWNLOAD_PERSONAL_DATA_URL } from '@identity/urls.ts';

export default function PersonalData() {
	useDocumentTitle('Personal data');

	return (
		<AuthorizeRoute>
			<Card
				title='Personal data'
				actions={(
					<Button
						component='a'
						variant='contained'
						href={inject(DOWNLOAD_PERSONAL_DATA_URL)}
						target='_blank'
					>
						Download personal data
					</Button>
				)}
			>
				<Typography>
					By creating an account, you give us personal data that we store. You have the right to know what data we have. You also have the right to request that we delete your personal data.
				</Typography>
			</Card>
		</AuthorizeRoute>
	);
}