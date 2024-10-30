import { useMemo } from 'react';
import { Box, List, Toolbar } from '@mui/material';
import DashboardMenuItem from './MenuLink.tsx';
import DashboardMenuGroup from './MenuGroup.tsx';
import { useIsLoggedInSelector, useRolesSelector, useActiveMenuSelector, aggregateLinks, filterLinks, inject, DRAWER_HEADER_PARTIAL, DRAWER_FOOTER_PARTIAL } from '@/react-utils';

export default function DrawerContent() {
	const activeMenu = useActiveMenuSelector();
	const isLoggedIn = useIsLoggedInSelector();
	const roles = useRolesSelector();

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
				<List>
					{drawerItems.map(d => d.sublinks
						? <DashboardMenuGroup
							data={d}
							key={d.text}
						/>
						: <DashboardMenuItem
							data={d}
							key={d.text}
						/>
					)}
				</List>
			</div>

			{drawerFooterContent}
		</Box>
	);
}