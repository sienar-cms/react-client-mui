import { SnackbarProvider } from 'notistack';
import type { PropsWithChildren } from 'react';

export default function Snackbar({ children }: PropsWithChildren) {
	return (
		<SnackbarProvider
			anchorOrigin={{
				horizontal: 'right',
				vertical: 'top'
			}}
			maxSnack={5}
		>
			{children}
		</SnackbarProvider>
	)
}