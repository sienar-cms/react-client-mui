import { Table } from '@/react-ui';
import { LOCKOUT_REASONS_SERVICE } from '@identity//keys.ts';

export default function Index() {
	return (
		<Table
			title='Lockout reasons'
			columns={[
				{
					field: 'reason',
					headerName: 'Reason',
					flex: 1
				}
			]}
			serviceKey={LOCKOUT_REASONS_SERVICE}
			entityTypeName='lockout reason'
		/>
	);
}