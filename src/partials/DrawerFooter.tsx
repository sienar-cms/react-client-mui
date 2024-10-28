import Authorize from '@/react-ui/authorize';
import { inject  } from '@/react-utils';
import { Box, Button } from '@mui/material';
import UserBadge from '@/components/UserBadge';
import { Link } from 'react-router-dom';
import { REGISTER_ROUTE, LOGIN_ROUTE } from '@/keys/routes';

import type { UserBadgeProps } from '@/components/UserBadge';

export default function DrawerFooter(props: UserBadgeProps) {
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
				<UserBadge {...props}/>
			</Authorize.Content>
		</Box>
	)
};
