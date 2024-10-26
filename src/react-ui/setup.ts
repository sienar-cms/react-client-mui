import { provide, SIENAR_NOTIFICATIONS } from '@/react-utils';
import SnackbarProvider from './Snackbar';
import { notify } from './utils';

provide(SIENAR_NOTIFICATIONS.NOTIFICATION_PROVIDER, SnackbarProvider);
provide(SIENAR_NOTIFICATIONS.NOTIFIER, notify);