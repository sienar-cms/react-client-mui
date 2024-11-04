import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Checkbox, CheckboxGroup, DatePicker, Form, LoadingPage, Narrow, Radio, RadioGroup, Spacer } from '@/react-ui';
import { inject, useNavigate, validators } from '@/react-utils';
import { LOCK_USER_ACCOUNT_SERVICE, USERS_ROUTE, USERS_SERVICE } from '@users/keys.ts';
import { LOCKOUT_REASONS_SERVICE } from '@lockoutReasons/keys.ts';

import type { Dayjs } from 'dayjs';
import type { User } from '@users/types.ts';
import type { LockoutReason } from '@lockoutReasons/types.ts';

export default function Lock() {
	const [ lockoutReasons, setLockoutReasons ] = useState<LockoutReason[]>([]);
	const [ user, setUser ] = useState<User|null>(null);
	const navigate = useNavigate();
	const params = useParams();
	const userId = params['id'];
	const now = useRef<Dayjs|null>(null);
	const [ lockoutEnd, setLockoutEnd ] = useState<Dayjs|null>(dayjs());

	useEffect(() => {
		now.current = dayjs();

		(async function() {
			if (!userId) return;

			const userService = inject(USERS_SERVICE);
			setUser(await userService.read(userId));

			const lockoutReasonService = inject(LOCKOUT_REASONS_SERVICE);
			const result = await lockoutReasonService.readAll({ pageSize: 0 });
			setLockoutReasons(result.items);
		})();
	}, []);

	if (lockoutReasons.length === 0 || !user) {
		return <LoadingPage>Loading required data, please wait...</LoadingPage>;
	}

	return (
		<Narrow>
			<Form
				title={`Lock user ${user.username}'s account`}
				serviceKey={LOCK_USER_ACCOUNT_SERVICE}
				submitText='Lock account'
				onSuccess={successful => {if (successful) navigate(USERS_ROUTE)}}
			>
				<input
					type='hidden'
					name='userId'
					value={userId}
				/>

				<CheckboxGroup
					label='Why should the user be locked out?'
					name='reasons'
					displayName='lockout reasons'
					validators={[validators.required('You must select one or more %name')]}
					maxHeight={300}
				>
					{lockoutReasons.map(r => (
						<Checkbox value={r.id}>
							{r.reason}
						</Checkbox>
					))}
				</CheckboxGroup>

				<Spacer spacing={3}/>

				<RadioGroup
					name='endDate'
					label='How long should the user be locked out?'
					displayName='lockout end date'
				>
					<Radio value={now.current!.add(1, 'day').toISOString()}>
						One day
					</Radio>
					<Radio value={now.current!.add(7, 'days').toISOString()}>
						One week
					</Radio>
					<Radio value={now.current!.add(1, 'month').toISOString()}>
						One month
					</Radio>
					<Radio value={now.current!.add(1, 'year').toISOString()}>
						One year
					</Radio>
					<Radio value=''>
						Permanently
					</Radio>
					<Radio value={lockoutEnd?.toISOString() ?? ''}>
						<DatePicker
							name=''
							onChange={setLockoutEnd}
						>
							Pick a custom time
						</DatePicker>
					</Radio>
				</RadioGroup>
			</Form>
		</Narrow>
	);
}