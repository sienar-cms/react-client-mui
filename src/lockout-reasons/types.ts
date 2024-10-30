import type { EntityBase } from '@/react-utils';

/**
 * Represents a reason why a user would be locked out of their account
 */
export type LockoutReason = EntityBase & {
	/**
	 * The text of the reason why the user is locked out
	 */
	reason: string
}