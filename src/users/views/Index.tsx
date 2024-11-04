import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { AdminPanelSettings, Lock, LockOpen } from '@mui/icons-material';
import { Table, TableBooleanCell } from '@/react-ui';
import { inject } from '@/react-utils';
import { UNLOCK_USER_ACCOUNT_SERVICE, USERS_SERVICE, USERS_ROUTE } from '@users/keys.ts';
import type { User } from '@users/types.ts';
import ConfirmationDialog from '../../react-ui/ConfirmationDialog.tsx';

export default function Index() {
	const currentUrl = inject(USERS_ROUTE);
	const selectedUser = useRef<User|null>(null);
	const [ unlockModalOpen, setUnlockModalOpen ] = useState(false);

	const actionMenuRenderer = (user?: User) => (
		<>
			{!user!.lockoutEnd && (
				<IconButton
					component={Link}
					title={`Lock ${user!.username}'s account`}
					to={`${currentUrl}/${user!.id}/lock`}
				>
					<Lock/>
				</IconButton>
			)}

			{user!.lockoutEnd && (
				<IconButton
					color='warning'
					title={`Unlock ${user!.username}'s account`}
					onClick={() => {
						selectedUser.current = user!;
						setUnlockModalOpen(true);
					}}
				>
					<LockOpen/>
				</IconButton>
			)}

			<IconButton
				component={Link}
				color='primary'
				title={`Update ${user!.username}'s roles`}
				to={`${currentUrl}/${user!.id}/roles`}
			>
				<AdminPanelSettings/>
			</IconButton>
		</>
	);

	return (
		<>
			<Table
				title='Users'
				columns={[
					{
						field: 'username',
						headerName: 'Username',
						flex: 1
					},
					{
						field: 'email',
						headerName: 'Email',
						flex: 2
					},
					{
						field: 'lockoutEnd',
						headerName: 'Account locked',
						sortable: false,
						width: 120,
						flex: 0,
						renderCell: ({ value }) => (
							<TableBooleanCell
								value={value as boolean}
								color='primary'
								center />
						)
					}
				]}
				serviceKey={USERS_SERVICE}
				generateEntityName={u => u?.username}
				entityTypeName='user'
				actionMenuRenderer={actionMenuRenderer}
				actionsColumnWidth={225}
			/>

			<ConfirmationDialog
				title={`Unlock user account`}
				open={unlockModalOpen}
				question={`Are you sure you want to unlock user ${selectedUser.current?.username}'s account?? This will take effect immediately!`}
				confirmText="Yes, I'm sure"
				cancelText='No, leave them locked'
				color='warning'
				onConfirm={async () => {
					const service = inject(UNLOCK_USER_ACCOUNT_SERVICE);
					await service({ userId: selectedUser.current!.id });
					setUnlockModalOpen(false);
				}}
				onCancel={() => setUnlockModalOpen(false)}
			/>
		</>
	);
}