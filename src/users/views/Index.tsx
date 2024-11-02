import { Table, TableBooleanCell } from '@/react-ui';
import { USERS_SERVICE } from '@users/keys.ts';

export default function Index() {
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
		/>
	);
}