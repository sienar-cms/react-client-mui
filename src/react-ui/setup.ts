import { provide, NOTIFICATION_PROVIDER_COMPONENT, NOTIFIER } from '@/react-utils';
import SnackbarProvider from './Snackbar.tsx';
import { MUI_DATE_LOCALIZATION_PROVIDER, default as MuiDateLocalizationProvider } from './MuiDateLocalizationProvider.tsx';
import { notifier } from './utils.ts';

export default function () {
	provide(NOTIFICATION_PROVIDER_COMPONENT, SnackbarProvider);
	provide(MUI_DATE_LOCALIZATION_PROVIDER, MuiDateLocalizationProvider);
	provide(NOTIFIER, notifier);
}