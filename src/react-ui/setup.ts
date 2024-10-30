import { provide, NOTIFICATION_PROVIDER_COMPONENT, NOTIFIER } from '@/react-utils';
import SnackbarProvider from './Snackbar.tsx';
import { notify } from './utils.ts';

export default function () {
	provide(NOTIFICATION_PROVIDER_COMPONENT, SnackbarProvider);
	provide(NOTIFIER, notify);
}