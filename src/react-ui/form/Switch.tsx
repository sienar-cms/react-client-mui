import { FormControl, FormControlLabel, Switch as MaterialSwitch } from '@mui/material';

import type { ChangeEvent, PropsWithChildren } from 'react';
import type { Color } from '@/react-ui/theme.ts';

export type SwitchProps = PropsWithChildren & {
	checked: boolean
	color?: Color
	onActivated: () => any
	onDeactivated: () => any
}

export default function Switch(props: SwitchProps) {
	const {
		checked,
		children,
		color,
		onActivated,
		onDeactivated
	} = props;

	const control = (
		<MaterialSwitch
			color={color === undefined || color === 'inherit' ? 'default' : color}
			checked={checked}
			onChange={(e: ChangeEvent<HTMLInputElement>) => {
				if (e.target.checked) onActivated();
				else onDeactivated();
			}}
		/>
	);

	return (
		<FormControl>
			<FormControlLabel
				control={control}
				label={children}
			/>
		</FormControl>
	);
}