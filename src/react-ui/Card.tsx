import type { PropsWithChildren, ReactNode, ElementType } from 'react';
import { Box, Card as MaterialCard, CardActions, CardContent, Typography } from '@mui/material';

export type CardProps = PropsWithChildren & {
	title: string
	titleTypography?: string
	titleComponent?: ElementType
	subtitle?: string
	subtitleTypography?: string
	subtitleComponent?: ElementType
	headerIcon?: ReactNode
	headerBackgroundColor?: string
	headerTextColor?: string
	actions?: ReactNode
}

export default function Card(props: CardProps) {
	const {
		actions,
		children,
		headerBackgroundColor = 'primary.main',
		headerTextColor = '#ffffff',
		headerIcon,
		title,
		titleTypography = 'h4',
		titleComponent = 'h4',
		subtitle,
		subtitleTypography = 'body1',
		subtitleComponent = 'h5'
	} = props;

	return (
		<MaterialCard variant='outlined'>
			<Box sx={{
				bgcolor: headerBackgroundColor,
				color: headerTextColor,
				px: 3,
				py: 2,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}>
				<div>
					<Typography
						component={titleComponent}
						typography={titleTypography}
					>
						{title}
					</Typography>
					{subtitle && (
						<Typography
							component={subtitleComponent}
							typography={subtitleTypography}
						>
							{subtitle}
						</Typography>
					)}
				</div>
				{headerIcon}
			</Box>

			<CardContent>
				{children}
			</CardContent>

			{actions && (
				<CardActions>
					{actions}
				</CardActions>
			)}
		</MaterialCard>
	)
}