import { Box, CircularProgress, Typography } from '@mui/material';
import Narrow from '@/react-ui/Narrow.tsx';

import type { ElementType, PropsWithChildren } from 'react';
import type { SxProps } from '@mui/material';
import type { Color } from '@/react-ui/theme.ts';

export type LoadingPageProps = PropsWithChildren & {
	messageComponent?: ElementType
	messageTypography?: string
	messageSx?: SxProps
	color?: Color
}

export default function LoadingPage(props: LoadingPageProps) {
	const {
		children,
		color = 'inherit',
		messageComponent = 'p',
		messageTypography = 'h6',
		messageSx
	} = props;

	return (
		<Narrow>
			<Typography
				component={messageComponent}
				typography={messageTypography}
				sx={messageSx}
				align='center'
			>
				{children}
			</Typography>

			<Box sx={{
				display: 'flex',
				justifyContent: 'center',
				mt: 4
			}}>
				<CircularProgress color={color}/>
			</Box>
		</Narrow>
	)
}