import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { inject } from '@/react-utils';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Label } from '@mui/icons-material';
import { StatusPage, LoadingPage } from '@/react-ui';
import { GET_LOCKOUT_REASONS_SERVICE } from '@identity/services.ts';
import type { AccountLockResult } from '@identity/types.ts';

export default function AccountLocked() {
	const [ params ] = useSearchParams();
	const [ lockResult, setLockResult ] = useState<AccountLockResult|null>(null);

	useEffect(() => {
		(async function() {
			const userId = params.get('userId');
			const verificationCode = params.get('verificationCode');

			if (!userId || !verificationCode) return;

			const service = inject(GET_LOCKOUT_REASONS_SERVICE);
			const result = await service({ userId, verificationCode });

			if (!result.wasSuccessful || !result.result) return;

			setLockResult(result.result);
		})();
	}, []);

	if (!lockResult) return <LoadingPage>Loading lockout reasons...</LoadingPage>;

	return (
		<StatusPage title='Account locked out'>
			<Typography>Your account is currently locked. The lockout is scheduled to end: <strong>{getLockoutEndDate(lockResult.lockoutEnd)}</strong></Typography>
			<Typography my={2}>Your account is locked for the following reasons:</Typography>
			<List>
				{lockResult.lockoutReasons.map(r => (
					<ListItem key={r.id}>
						<ListItemIcon>
							<Label fontSize='small'/>
						</ListItemIcon>
						<ListItemText>
							{r.reason}
						</ListItemText>
					</ListItem>
				))}
			</List>
		</StatusPage>
	)
}

function getLockoutEndDate(endDate: string|null|undefined): string {
	if (!endDate) return 'never';

	const parsedDate = new Date(endDate);
	if (isNaN(parsedDate.getTime())) return 'never';

	return parsedDate.toString();
}