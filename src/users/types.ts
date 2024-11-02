import type { EntityBase } from '@/react-utils';
import type { LockoutReason } from '@lockoutReasons/types.ts';

/**
 * Represents a reason why a user would be locked out of their account
 */
export type User = EntityBase & {
	/**
	 * The username of the user
	 */
	username: string

	/**
	 * The password of the user. This is only used to update a user's password. The value is never stored or logged.
	 */
	password: string

	/**
	 * A confirmation copy of the user's password. This is only used to update a user's password. The value is never stored or logged.
	 */
	confirmPassword: string

	/**
	 * The number of times the user has attempted to log in unsuccessfully
	 */
	loginFailedCount: number

	/**
	 * The date that the user's lockout ends. If the user is not locked out, this will be empty.
	 */
	lockoutEnd: Date|null|undefined

	/**
	 * The roles to which the user belongs
	 */
	roles: Role[]

	/**
	 * The lockout reasons used to justify the user's lockout. If the lockout is based on surpassing the maximum number of login attempts, then this array will still be empty.
	 */
	lockoutReasons: LockoutReason[]

	/**
	 * The user's email address
	 */
	email: string

	/**
	 * Whether the user's email address is confirmed or not
	 */
	emailConfirmed: boolean

	/**
	 * The pending email which the user has not yet confirmed. Will be empty if the user does not have a pending email change request.
	 */
	pendingEmail: string|null|undefined
}

export type Role = EntityBase & {
	/**
	 * The name of the role
	 */
	name: string
}

/**
 * The data required to add a user to a specific role
 */
export type AddUserToRoleRequest = {
	/**
	 * The ID of the user to add to a role
	 */
	userId: string

	/**
	 * The ID of the role to which to add the user
	 */
	roleId: string
}

/**
 * The data required to remove a user from a specific role
 */
export type RemoveUserFromRoleRequest = {
	/**
	 * The ID of the user to remove from a role
	 */
	userId: string

	/**
	 * The ID of the role from which to remove the user
	 */
	roleId: string
}