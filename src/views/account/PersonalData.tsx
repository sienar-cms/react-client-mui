import { Card, Narrow } from '@/react-ui';
import { Button, Typography } from '@mui/material';
import { inject } from '@/react-utils';
import { DOWNLOAD_PERSONAL_DATA_ROUTE } from '@/keys';

export default function PersonalData() {
	return (
		<Narrow>
			<Card
				title='Personal data'
				actions={(
					<Button
						component='a'
						variant='contained'
						href={inject(DOWNLOAD_PERSONAL_DATA_ROUTE)}
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
		</Narrow>
	);
}