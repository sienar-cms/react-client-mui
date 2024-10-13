import { enqueueSnackbar } from 'notistack';

export function notify(notification: Notification): void {
	enqueueSnackbar(notification.message, {
		variant: mapNotificationTypeToVariant(notification.type)
	})
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

export type Notification = {
	message: string
	type: NotificationType
}

/**
 * Represents different types of notifications
 */
export enum NotificationType {
	/**
	 * A successful notification
	 */
	Success,

	/**
	 * A notification containing warning information
	 */
	Warning,

	/**
	 * A notification containing specific information
	 */
	Info,

	/**
	 * A notification indicating an error occurred
	 */
	Error
}