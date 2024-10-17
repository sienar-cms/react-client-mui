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

function mapThemeBackground(color: Color): string {
	switch (color) {
		case Color.Primary:
			return 'primary.main';
		case Color.Secondary:
			return 'secondary.main';
		case Color.Info:
			return 'info.main';
		case Color.Success:
			return 'success.main';
		case Color.Warning:
			return 'warning.main';
		case Color.Error:
			return 'error.main';
	}

	return '';
}

function mapThemeForeground(color: Color): string {
	switch (color) {
		case Color.Primary:
			return 'primary.contrastText';
		case Color.Secondary:
			return 'secondary.contrastText';
		case Color.Success:
			return 'success.contrastText';
		case Color.Info:
			return 'info.contrastText';
		case Color.Warning:
			return 'warning.contrastText';
		case Color.Error:
			return 'error.contrastText';
	}

	return 'text.primary';
}