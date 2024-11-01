import { Table } from '@/react-ui';
import { LOCKOUT_REASONS_SERVICE } from '@/lockout-reasons/keys';

export default function Index() {
	return (
		<Table
			title='Lockout reasons'
			columns={[
				{
					field: 'reason',
					headerName: 'Reason'
				}
			]}
			serviceKey={LOCKOUT_REASONS_SERVICE}
			generateEntityName={r => r?.reason}
			entityTypeName='Lockout reason'
		/>
	);
}