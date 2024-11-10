import { useMemo } from 'react';
import { Box, List, Toolbar } from '@mui/material';
import DashboardMenuItem from './MenuLink.tsx';
import DashboardMenuGroup from './MenuGroup.tsx';
import { useAuthContext, useInfrastructureContext, aggregateLinks, filterLinks, inject, DRAWER_HEADER_PARTIAL, DRAWER_FOOTER_PARTIAL } from '@/react-utils';
import type { MenuLink } from '@/react-utils';

export default function DrawerContent() {
	const infrastructureContext = useInfrastructureContext();
	const { activeMenu } = infrastructureContext;
	const authContext = useAuthContext();
	const { isLoggedIn, roles } = authContext;

	const drawerItems = useMemo(() => {
		const links = aggregateLinks(activeMenu);
		return filterLinks(links, isLoggedIn, roles);
	}, [isLoggedIn, roles, activeMenu]);

	const drawerHeaderContent = inject(DRAWER_HEADER_PARTIAL, true);
	const drawerFooterContent = inject(DRAWER_FOOTER_PARTIAL, true);

	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between'
			}}
		>
			<div>
				<Toolbar/>
				{drawerHeaderContent}
				<DrawerMenu items={drawerItems}/>
			</div>

			{drawerFooterContent}
		</Box>
	);
}

type DrawerMenuProps = {
	items: MenuLink[]
}

function DrawerMenu({ items }: DrawerMenuProps) {
	return (
		<List>
			{items.map(item => (
				<>
					{item.sublinks && (
						<DashboardMenuGroup
							data={item}
							key={item.text}
						/>
					)}
					{!item.sublinks && (
						<DashboardMenuItem
							data={item}
							key={item.text}
						/>
					)}
				</>
			))}
		</List>
	)
}