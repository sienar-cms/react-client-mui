import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, LoadingPage, Switch } from '@/react-ui';
import { inject, useDocumentTitle } from '@/react-utils';
import { ROLES_SERVICE, USERS_SERVICE, ADD_USER_TO_ROLE_SERVICE, REMOVE_USER_FROM_ROLE_SERVICE } from '@identity/services.ts';
import type { Role, User } from '@identity/types.ts';

export default function Roles() {
	useDocumentTitle('Update user roles');

	const params = useParams();
	const userId = params['id'];
	const [ user, setUser ] = useState<User|null>(null);
	const [ roles, setRoles ] = useState<Role[]>([]);

	const loadUser = async () => {
		if (!userId) return;

		const service = inject(USERS_SERVICE);
		setUser(await service.read(userId));
	};

	useEffect(() => {
		(async function() {
			const service = inject(ROLES_SERVICE);
			const result = await service.readAll();
			setRoles(result.items);
		})();
	}, []);

	useEffect(() => {
		loadUser();
	}, [userId]);

	if (!user) {
		return <LoadingPage>User is loading, please wait...</LoadingPage>
	}

	const addToRole = async (roleId: string) => {
		const service = inject(ADD_USER_TO_ROLE_SERVICE);
		const successful = await service({ userId: userId!, roleId });
		if (successful) await loadUser();
	};

	const removeFromRole = async (roleId: string) => {
		const service = inject(REMOVE_USER_FROM_ROLE_SERVICE);
		const successful = await service({ userId: userId!, roleId });
		if (successful) await loadUser();
	};

	return (
		<Card
			title={`Update ${user.username}'s roles`}
		>
			{roles.map(r => (
				<Switch
					key={r.id}
					color='primary'
					checked={user.roles.some(userRole => userRole.id === r.id)}
					onActivated={() => addToRole(r.id)}
					onDeactivated={() => removeFromRole(r.id)}
				>
					{r.name}
				</Switch>
			))}
		</Card>
	);
}