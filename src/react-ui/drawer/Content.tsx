import { useMemo } from 'react';
import { Box, List, Toolbar } from '@mui/material';
import { Dashboard as DashboardIcon, Home as HomeIcon } from '@mui/icons-material';
import DashboardMenuItem from './MenuLink';
import DashboardMenuGroup from './MenuGroup';
import { useIsLoggedInSelector, useRolesSelector, useActiveMenuSelector, aggregateMenuLinks, filterLinks, getPartial, SIENAR_PARTIALS } from '@/react-utils';

export default function Content() {
	const activeMenu = useActiveMenuSelector();
	const isLoggedIn = useIsLoggedInSelector();
	const roles = useRolesSelector();

	const drawerItems = useMemo(() => {
		const links = aggregateMenuLinks(activeMenu);
		return filterLinks(links, isLoggedIn, roles);
	}, [isLoggedIn, roles, activeMenu]);

	const drawerHeaderContent = getPartial(SIENAR_PARTIALS.DRAWER_HEADER);
	const drawerFooterContent = getPartial(SIENAR_PARTIALS.DRAWER_FOOTER);

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
					<DashboardMenuItem
						data={{
							text: 'Dashboard',
							href: '/',
							requireLoggedIn: true,
							icon: <DashboardIcon/>
						}}
					/>
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
					<DashboardMenuItem
						data={{
							buttonComponent: 'a',
							text: 'Return home',
							href: '/',
							icon: <HomeIcon/>
						}}
					/>
				</List>
			</div>

			{drawerFooterContent}
		</Box>
	);
}