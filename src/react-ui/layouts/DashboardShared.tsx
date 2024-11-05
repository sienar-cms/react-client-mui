import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import DrawerContent from '@/react-ui/drawer/DrawerContent.tsx';
import { useAppbarTextSelector } from '@/react-utils';

import type { PropsWithChildren } from 'react';

export default function DashboardShared({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(false);
	const appbarText = useAppbarTextSelector();
	const location = useLocation();

	useEffect(() => {
		setOpen(false)
	}, [location]);

	const drawerContent = <DrawerContent/>;

	const drawerWidth = '20%';
	const drawerMinWidth = '200px';
	const drawerMaxWidth = '300px';

	const drawerCommonStyles = {
		display: 'flex',
		minHeight: '100vh',
		flexDirection: 'column'
	};

	return (
		<Box sx={{display: 'flex'}}>
			<CssBaseline/>
			<AppBar
				position='fixed'
				sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						sx={{
							mr: 2,
							display: { xs: 'block', md: 'none' }
						}}
						onClick={() => setOpen(!open)}
					>
						{open ? <CloseIcon/> : <MenuIcon/>}
					</IconButton>

					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}
					>
						{ appbarText }
					</Typography>
				</Toolbar>
			</AppBar>

			<Drawer
				variant='temporary'
				anchor='left'
				open={open}
				onClose={() => setOpen(false)}
				sx={{
					display: { xs: 'flex', md: 'none' },
					[`& .MuiDrawer-paper`]: drawerCommonStyles
				}}
			>
				{drawerContent}
			</Drawer>

			<Drawer
				variant='permanent'
				anchor='left'
				sx={{
					minWidth: drawerMinWidth,
					width: drawerWidth,
					maxWidth: drawerMaxWidth,
					display: { xs: 'none', md: 'block' },
					[`& .MuiDrawer-paper`]: {
						minWidth: drawerMinWidth,
						width: drawerWidth,
						maxWidth: drawerMaxWidth,
						boxSizing: 'border-box',
						...drawerCommonStyles
					}
				}}
			>
				{drawerContent}
			</Drawer>

			<Box
				sx={{
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh'
				}}
			>
				<Box sx={{ flexGrow: 1 }}>
					<Toolbar/>
					<Box
						component='main'
						sx={{ p: 4 }}
					>
						{children}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}