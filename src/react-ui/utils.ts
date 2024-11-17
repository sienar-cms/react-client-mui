import { enqueueSnackbar } from 'notistack';
import { NotificationType } from '@sienar/react-utils';
import type { Notification, Notifier } from '@sienar/react-utils';

/**
 * Renders a notification in the UI
 * @param message The message to render
 * @param type The type of the notification to render
 */
export function notify(message: string, type: NotificationType) {
	enqueueSnackbar(message, {
		variant: mapNotificationTypeToVariant(type),
		autoHideDuration: type === NotificationType.Error || type === NotificationType.Warning
			? null
			: 5000
	});
}

export const notifier: Notifier = {
	success(message: string) {
		notify(message, NotificationType.Success);
	},
	warning(message: string) {
		notify(message, NotificationType.Warning);
	},
	info(message: string) {
		notify(message, NotificationType.Info);
	},
	error(message: string) {
		notify(message, NotificationType.Error);
	},
	notify(notification: Notification | string, type?: NotificationType) {
		if (typeof notification === 'string') {
			notify(notification, type!);
		} else {
			notify(notification.message, notification.type);
		}
	}
}

function mapNotificationTypeToVariant(type: NotificationType): 'success' | 'warning' | 'info' | 'error' {
	switch (type) {
		case NotificationType.Success:
			return 'success';
		case NotificationType.Warning:
			return 'warning';
		case NotificationType.Info:
			return 'info';
		case NotificationType.Error:
			return 'error';
	}
}