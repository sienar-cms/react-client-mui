import { useMemo } from 'react';
import { Box, Button, List, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Dashboard as DashboardIcon, Home as HomeIcon } from '@mui/icons-material';
import DashboardMenuItem from './MenuLink';
import DashboardMenuGroup from './MenuGroup';
import { useIsLoggedInSelector, useRolesSelector, useActiveMenuSelector, aggregateMenuLinks, filterLinks } from '@/react-utils';
import Authorize from '../authorize';

export default function Content() {
	const activeMenu = useActiveMenuSelector();
	const isLoggedIn = useIsLoggedInSelector();
	const roles = useRolesSelector();

	const drawerItems = useMemo(() => {
		const links = aggregateMenuLinks(activeMenu);
		return filterLinks(links, isLoggedIn, roles);
	}, [isLoggedIn, roles, activeMenu]);

	const loginButtonText = isLoggedIn ? 'Log out' : 'Log in';

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

			{/*TODO: change this to a configurable footer element*/}
			<Box sx={{
				width: '100%',
				p: 2
			}}>
				<Authorize.Content unauthorized={(
					<Button
						component={Link}
						sx={{
							width: '100%',
							mb: 2
						}}
						variant='outlined'
						to='/'
						color='secondary'
					>
						Register
					</Button>
				)}/>

				<Button
					component={Link}
					sx={{ width: '100%' }}
					variant='contained'
					to='/'
				>
					{loginButtonText}
				</Button>
			</Box>
		</Box>
	);
}