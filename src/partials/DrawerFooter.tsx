import Authorize from '@/react-ui/authorize';
import { getUrl, SIENAR_URLS } from '@/react-utils';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function DrawerFooter() {
	return (
		<Box sx={{
			width: '100%',
			p: 2
		}}>
			<Authorize.Content unauthorized={(
				<>
					<Button
						component={Link}
						sx={{
							width: '100%',
							mb: 2
						}}
						variant='outlined'
						to={getUrl(SIENAR_URLS.REGISTER)}
						color='secondary'
					>
						Register
					</Button>
					<Button
						component={Link}
						sx={{ width: '100%' }}
						variant='contained'
						to={getUrl(SIENAR_URLS.LOGIN)}
					>
						Log in
					</Button>
				</>
			)}>
				<Button
					component={Link}
					sx={{ width: '100%' }}
					variant='contained'
					to='/'
				>
					Log in
				</Button>
			</Authorize.Content>


		</Box>
	)
};
