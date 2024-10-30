import Narrow from '@/react-ui/Narrow.tsx';
import { Typography } from '@mui/material';
import type { ElementType, PropsWithChildren } from 'react';
import type { SxProps, Theme } from '@mui/material';

export type StatusPageProps = PropsWithChildren & {
	title: string
	titleComponent?: ElementType
	titleTypography?: string
	titleSx?: SxProps<Theme>
}

export default function StatusPage(props: StatusPageProps) {
	const {
		title,
		titleComponent = 'h1',
		titleTypography = 'h3',
		titleSx = {},
		children
	} = props;

	const sx = Object.assign({ mb: 4 }, titleSx);

	return (
		<Narrow>
			<Typography
				component={titleComponent}
				typography={titleTypography}
				sx={sx}
			>
				{title}
			</Typography>
			{children}
		</Narrow>
	);
}