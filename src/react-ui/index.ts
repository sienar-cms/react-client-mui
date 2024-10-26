import { provide, SIENAR_NOTIFICATIONS } from '@/react-utils';

export { default as Authorize } from './authorize'
export { default as Buttons } from './buttons';
export { default as Card } from './Card';
export { default as Drawer } from './drawer';
export { default as Form } from './form';
export { default as Layouts } from './layouts';
export { default as Narrow } from './Narrow';
export { default as Pages } from './pages';
import SnackbarProvider from './Snackbar';
export const Snackbar = SnackbarProvider;

export * from './theme';

provide(SIENAR_NOTIFICATIONS.NOTIFICATION_PROVIDER, SnackbarProvider);