import { SnackbarProvider, closeSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import { Cancel, CheckCircle, Error, Help, Warning } from '@mui/icons-material';
import type { PropsWithChildren } from 'react';

export default function Snackbar({ children }: PropsWithChildren) {
	return (
		<SnackbarProvider
			anchorOrigin={{
				horizontal: 'right',
				vertical: 'top'
			}}
			maxSnack={5}
			iconVariant={{
				success: <CheckCircle sx={{ mr: 1 }}/>,
				warning: <Warning sx={{ mr: 1 }}/>,
				error: <Error sx={{ mr: 1 }}/>,
				info: <Help sx={{ mr: 1 }}/>
			}}
			action={id => (
				<IconButton
					color='inherit'
					onClick={() => closeSnackbar(id)}
				>
					<Cancel/>
				</IconButton>
			)}
		>
			{children}
		</SnackbarProvider>
	)
}