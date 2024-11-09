import { Authorize } from '@/react-utils';
import { inject  } from '@/react-utils';
import { Box, Button } from '@mui/material';
import UserBadge from '@/components/UserBadge.tsx';
import { Link } from 'react-router-dom';
import { REGISTER_ROUTE, LOGIN_ROUTE } from '@identity/urls.ts';

import type { UserBadgeProps } from '@/components/UserBadge.tsx';

export default function DrawerFooter(props: UserBadgeProps) {
	return (
		<Box sx={{
			width: '100%',
			p: 2
		}}>
			<Authorize unauthorized={(
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
			</Authorize>
		</Box>
	)
};
