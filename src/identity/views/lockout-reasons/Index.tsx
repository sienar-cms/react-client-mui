import { Table } from '@/react-ui';
import { LOCKOUT_REASONS_SERVICE } from '@identity/services.ts';
import { useDocumentTitle } from '@/react-utils';

export default function Index() {
	useDocumentTitle('Lockout reasons');

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