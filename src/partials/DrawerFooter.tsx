import Authorize from '@/react-ui/authorize';
import ActionButton from '@/react-ui/buttons/ActionButton';
import { inject, useAuthDispatch, loadUserData } from '@/react-utils';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { REGISTER_ROUTE, LOGIN_ROUTE } from '@/keys/routes';

export default function DrawerFooter() {
	const dispatch = useAuthDispatch();

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
						to={inject(REGISTER_ROUTE)}
						color='secondary'
					>
						Register
					</Button>
					<Button
						component={Link}
						sx={{ width: '100%' }}
						variant='contained'
						to={inject(LOGIN_ROUTE)}
					>
						Log in
					</Button>
				</>
			)}>
				<ActionButton
					action='/api/account/login'
					method='DELETE'
					label='Log out'
					sx={{ width: '100%' }}
					color='error'
					onSuccess={() => dispatch(loadUserData())}
				/>
			</Authorize.Content>


		</Box>
	)
};
