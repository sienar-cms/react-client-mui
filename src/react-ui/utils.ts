﻿import { enqueueSnackbar } from 'notistack';
import { NotificationType } from '@/react-utils';

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