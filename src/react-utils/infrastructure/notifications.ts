import type { InjectionKey } from '@/react-utils/infrastructure/di';
import type { ComponentType, PropsWithChildren } from 'react';

const sienarNotifications = {
	NOTIFICATION_PROVIDER: Symbol() as InjectionKey<ComponentType<PropsWithChildren>>,
	NOTIFIER: Symbol() as InjectionKey<Notifier>
}

export const SIENAR_NOTIFICATIONS = Object.freeze(sienarNotifications);

export type Notification = {
	message: string
	type: NotificationType
}

/**
 * Renders a notification in the UI
 *
 * @param message The message to render
 * @param type The type of the notification to render
 */
export interface Notifier {
	(message: string, type: NotificationType): void
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