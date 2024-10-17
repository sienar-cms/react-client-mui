import type { ElementType, PropsWithChildren, ReactNode } from 'react';
import { Box, Card as MaterialCard, CardActions, CardContent, Typography } from '@mui/material';
import { Color } from '@/react-utils';

export type CardProps = PropsWithChildren & {
	title: string
	titleTypography?: string
	titleComponent?: ElementType
	subtitle?: string
	subtitleTypography?: string
	subtitleComponent?: ElementType
	headerIcon?: ReactNode
	color?: Color
	headerBackgroundColor?: string
	headerTextColor?: string
	actions?: ReactNode
}

export default function Card(props: CardProps) {
	const {
		actions,
		children,
		color,
		headerBackgroundColor,
		headerTextColor,
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
				bgcolor: color !== undefined ? mapThemeBackground(color) : headerBackgroundColor,
				color: color !== undefined ? mapThemeForeground(color) : headerTextColor,
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

			<CardContent sx={{
				px: 3,
				py: 2
			}}>
				{children}
			</CardContent>

			{actions && (
				<CardActions sx={{
					p: 3,
					pt: 2
				}}>
					{actions}
				</CardActions>
			)}
		</MaterialCard>
	)
}

function mapThemeBackground(color: Color): string {
	return color === Color.Default
		? ''
		: `${color}.main`;
}

function mapThemeForeground(color: Color): string {
	return color === Color.Default
		? 'text.primary'
		: `${color}.contrastText`;
}