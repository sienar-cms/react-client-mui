import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import { Table, TableBooleanCell } from '@/react-ui';
import { inject } from '@/react-utils';
import { USERS_SERVICE, USERS_ROUTE } from '@users/keys.ts';
import type { User } from '@users/types.ts';

export default function Index() {
	const currentUrl = inject(USERS_ROUTE);

	const actionMenuRenderer = (user?: User) => (
		<>
			<IconButton
				component={Link}
				color='warning'
				title={`Update ${user!.username}'s roles`}
				to={`${currentUrl}/${user!.id}/roles`}
			>
				<AdminPanelSettings/>
			</IconButton>
		</>
	);

	return (
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
					flex: 1
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
			actionsColumnWidth={185}
		/>
	);
}