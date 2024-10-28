import { useMemo, useRef, useState } from 'react';
import { Avatar, Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Logout, Settings } from '@mui/icons-material';
import { aggregateLinks, createApiCall, filterLinks, loadUserData, useAuthDispatch, useIsLoggedInSelector, useRolesSelector, useUsernameSelector } from '@/react-utils';
import { USER_SETTINGS_MENU } from '@/keys';

import type { ReactNode } from 'react';
import type { InjectionKey, MenuLink, MenuLinkProvider } from '@/react-utils';

export type UserBadgeProps = {
	menuKeys?: InjectionKey<MenuLinkProvider>[]
}

export default function UserBadge(props: UserBadgeProps) {
	const {
		menuKeys = [USER_SETTINGS_MENU]
	} = props;

	const [settingsOpen, setSettingsOpen] = useState(false);
	const settingsButtonRef = useRef<HTMLButtonElement|null>(null);
	const dispatch = useAuthDispatch();
	const logoutCall = createApiCall(
		'/api/account/login',
		'DELETE',
		() => dispatch(loadUserData())
	);
	const username = useUsernameSelector();
	const roles = useRolesSelector();
	const isLoggedIn = useIsLoggedInSelector();

	const settingsMenus = useMemo(() => {
		const links: MenuLink[][] = [];
		for (let key of menuKeys) {
			const rawLinks = aggregateLinks(key);
			const filtered = filterLinks(rawLinks, isLoggedIn, roles);
			links.push(filtered);
		}

		return links;
	}, [isLoggedIn, roles]);

	const toggleSettingsMenu = () => setSettingsOpen(!settingsOpen);

	const settingsMenuContent: ReactNode[] = [];
	settingsMenus.map((menu, i) => {
		menu.forEach(item => {
			settingsMenuContent.push((
				<MenuItem
					component={Link}
					to={item.href!}
					key={item.href!}
				>
					{item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
					<ListItemText>{item.text}</ListItemText>
				</MenuItem>
			));
		});

		// Yes, I know that keys shouldn't be an index.
		// However, I'm doing it anyway for a few reasons:
		// 1. There's no otherwise unique data available in the immediate context
		// 2. The order of menu items will not change during runtime, as this is determined at startup only
		// 3. The provided menuKeys prop should not be changed during runtime
		// These circumstances ensure that React's optimizations will still work because the order of elements rendered will never change. It's possible that some new elements might be added or removed in certain circumstances, but React will still rightly identify the diff and happily re-render. Those cases are so few and far between anyway (they should probably never happen during normal app execution) that they aren't really worth considering.
		settingsMenuContent.push(<Divider key={i}/>)
	});

	return (
		<Stack
			direction='row'
			sx={{
				pt: 2,
				gap: 1,
				alignItems: 'center',
				borderTop: '1px solid',
				borderColor: 'divider',
			}}
		>
			<Avatar
				sizes='small'
				alt={username!}
				sx={{ width: 36, height: 36 }}
			/>
			<Box sx={{ mr: 'auto' }}>
				<Typography
					variant='body2'
					sx={{
						lineHeight: '16px',
						fontWeight: 500,
						ml: 1
					}}
				>
					{username}
				</Typography>
			</Box>
			<IconButton
				ref={settingsButtonRef}
				onClick={toggleSettingsMenu}
			>
				<Settings/>
			</IconButton>
			<Menu
				open={settingsOpen}
				anchorEl={settingsButtonRef.current}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
				transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				onClose={toggleSettingsMenu}
				onClick={toggleSettingsMenu}
			>
				{settingsMenuContent}
				<MenuItem onClick={logoutCall}>
					<ListItemIcon>
						<Logout/>
					</ListItemIcon>
					<ListItemText>
						Log out
					</ListItemText>
				</MenuItem>
			</Menu>
		</Stack>
	)
}