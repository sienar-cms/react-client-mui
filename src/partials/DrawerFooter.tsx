import Authorize from '@/react-ui/authorize';
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
						to='/'
						color='secondary'
					>
						Register
					</Button>
					<Button
						component={Link}
						sx={{ width: '100%' }}
						variant='contained'
						to='/'
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
