import { provide, NOTIFICATION_PROVIDER_COMPONENT, NOTIFIER } from '@/react-utils';
import SnackbarProvider from './Snackbar';
import { notify } from './utils';

export default function () {
	provide(NOTIFICATION_PROVIDER_COMPONENT, SnackbarProvider);
	provide(NOTIFIER, notify);
}