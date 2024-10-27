import type { InjectionKey } from '@/react-utils/infrastructure/di';
import type { ComponentType, PropsWithChildren } from 'react';

export const NOTIFICATION_PROVIDER_COMPONENT = Symbol() as InjectionKey<ComponentType<PropsWithChildren>>;
export const NOTIFIER = Symbol() as InjectionKey<Notifier>;

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