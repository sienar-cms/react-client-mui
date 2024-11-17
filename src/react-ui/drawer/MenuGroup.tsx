import { useState } from 'react';
import { Collapse, List } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuLink from './MenuLink.tsx';

import type { MenuLink as Link } from '@sienar/react-utils';

export type MenuGroupProps = {
	data: Link
}

export default function DashboardMenuGroup({data}: MenuGroupProps) {
	const [open, setOpen] = useState(false);

	const toggleOpen = () => setOpen(!open);

	data.endIcon = open ? <ExpandLess/> : <ExpandMore/>

	return (
		<>
			<MenuLink
				data={data}
				onClick={toggleOpen}
			/>

			<Collapse
				in={open}
				timeout='auto'
			>
				<List
					component='div'
					disablePadding
					sx={{
						pl: 2
					}}
				>
					{data.sublinks?.map(child => child.sublinks
						? <DashboardMenuGroup key={child.text} data={child} />
						: <MenuLink key={child.text} data={child} />)}
				</List>
			</Collapse>
		</>
	);
}