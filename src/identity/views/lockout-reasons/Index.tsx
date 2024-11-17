import { Table } from '@/react-ui';
import { LOCKOUT_REASONS_SERVICE } from '@identity/services.ts';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/react-utils';
import { roles } from '@/constants.ts';

export default function Index() {
	useDocumentTitle('Lockout reasons');

	return (
		<AuthorizeRoute roles={roles.admin}>
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
		</AuthorizeRoute>
	);
}