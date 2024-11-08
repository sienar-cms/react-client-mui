import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

import type { MouseEventHandler } from 'react';
import type { MenuLink } from '@/react-utils';

export type MenuLinkProps = {
	data: MenuLink,
	onClick?: MouseEventHandler
}

export default function MenuLink(props: MenuLinkProps) {
	const { data, onClick } = props;

	return (
		<ListItemButton
			onClick={onClick}
			{...getListItemButtonProps(data)}
		>
			<ListItemIcon>
				{data.icon}
			</ListItemIcon>
			<ListItemText primary={data.text}/>
			{data.endIcon}
		</ListItemButton>
	);
}

function getListItemButtonProps(data: MenuLink) {
	const value: Record<string, any> = {
		component: data.buttonComponent ?? Link
	};
	if (data.href) {
		value.to = data.href;
	}

	return value;
}