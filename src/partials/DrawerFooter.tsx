import { Authorize } from '@sienar/react-utils';
import { inject  } from '@sienar/react-utils';
import { Box } from '@mui/material';
import { ButtonLink } from '@sienar/react-ui-mui';
import UserBadge from '@/components/UserBadge.tsx';
import { REGISTER_URL, LOGIN_URL } from '@identity/urls.ts';

import type { UserBadgeProps } from '@/components/UserBadge.tsx';

export default function DrawerFooter(props: UserBadgeProps) {
	return (
		<Box sx={{
			width: '100%',
			p: 2
		}}>
			<Authorize unauthorized={(
				<>
					<ButtonLink
						sx={{
							width: '100%',
							mb: 2
						}}
						variant='outlined'
						to={REGISTER_URL}
						color='secondary'
					>
						Register
					</ButtonLink>
					<ButtonLink
						sx={{ width: '100%' }}
						variant='contained'
						to={inject(LOGIN_URL)}
					>
						Log in
					</ButtonLink>
				</>
			)}>
				<UserBadge {...props}/>
			</Authorize>
		</Box>
	)
};
