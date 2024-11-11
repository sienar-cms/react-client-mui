import { registerRoutes } from '@/react-utils';
import * as LAYOUTS from '@identity/layouts.ts';
import * as URLS from '@identity/urls.ts';
import * as VIEWS from '@identity/views.tsx';

export function setupIdentityRoutes() {
	registerRoutes(
		LAYOUTS.USERS_LAYOUT,
		{
			path: URLS.USERS_URL,
			element: VIEWS.USERS_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.LOCKOUT_REASONS_LAYOUT,
		{
			path: URLS.LOCKOUT_REASONS_URL,
			element: VIEWS.LOCKOUT_REASONS_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.REGISTER_LAYOUT,
		{
			path: URLS.REGISTER_URL,
			element: VIEWS.REGISTER_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.REGISTER_SUCCESSFUL_LAYOUT,
		{
			path: URLS.REGISTER_SUCCESSFUL_URL,
			element: VIEWS.REGISTER_SUCCESSFUL_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.CONFIRM_LAYOUT,
		{
			path: URLS.CONFIRM_URL,
			element: VIEWS.CONFIRM_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.CONFIRM_SUCCESSFUL_LAYOUT,
		{
			path: URLS.CONFIRM_SUCCESSFUL_URL,
			element: VIEWS.CONFIRM_SUCCESSFUL_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.LOGIN_LAYOUT,
		{
			path: URLS.LOGIN_URL,
			element: VIEWS.LOGIN_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.FORGOT_PASSWORD_LAYOUT,
		{
			path: URLS.FORGOT_PASSWORD_URL,
			element: VIEWS.FORGOT_PASSWORD_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.FORGOT_PASSWORD_SUCCESSFUL_LAYOUT,
		{
			path: URLS.FORGOT_PASSWORD_SUCCESSFUL_URL,
			element: VIEWS.FORGOT_PASSWORD_SUCCESSFUL_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.RESET_PASSWORD_LAYOUT,
		{
			path: URLS.RESET_PASSWORD_URL,
			element: VIEWS.RESET_PASSWORD_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.RESET_PASSWORD_SUCCESSFUL_LAYOUT,
		{
			path: URLS.RESET_PASSWORD_SUCCESSFUL_URL,
			element: VIEWS.RESET_PASSWORD_SUCCESSFUL_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.ACCOUNT_LOCKOUT_LAYOUT,
		{
			path: URLS.ACCOUNT_LOCKED_URL,
			element: VIEWS.ACCOUNT_LOCKOUT_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.CHANGE_EMAIL_LAYOUT,
		{
			path: URLS.CHANGE_EMAIL_URL,
			element: VIEWS.CHANGE_EMAIL_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.CHANGE_EMAIL_REQUESTED_LAYOUT,
		{
			path: URLS.CHANGE_EMAIL_REQUESTED_URL,
			element: VIEWS.CHANGE_EMAIL_REQUESTED_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.CHANGE_EMAIL_CONFIRM_LAYOUT,
		{
			path: URLS.CHANGE_EMAIL_CONFIRM_URL,
			element: VIEWS.CHANGE_EMAIL_CONFIRM_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.CHANGE_EMAIL_SUCCESSFUL_LAYOUT,
		{
			path: URLS.CHANGE_EMAIL_SUCCESSFUL_URL,
			element: VIEWS.CHANGE_EMAIL_SUCCESSFUL_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.CHANGE_PASSWORD_LAYOUT,
		{
			path: URLS.CHANGE_PASSWORD_URL,
			element: VIEWS.CHANGE_PASSWORD_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.CHANGE_PASSWORD_SUCCESSFUL_LAYOUT,
		{
			path: URLS.CHANGE_PASSWORD_SUCCESSFUL_URL,
			element: VIEWS.CHANGE_PASSWORD_SUCCESSFUL_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.PERSONAL_DATA_LAYOUT,
		{
			path: URLS.PERSONAL_DATA_URL,
			element: VIEWS.PERSONAL_DATA_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.DELETE_ACCOUNT_LAYOUT,
		{
			path: URLS.DELETE_ACCOUNT_URL,
			element: VIEWS.DELETE_ACCOUNT_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.DELETED_LAYOUT,
		{
			path: URLS.DELETED_URL,
			element: VIEWS.DELETED_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.USERS_ADD_LAYOUT,
		{
			path: URLS.USERS_ADD_URL,
			element: VIEWS.USERS_ADD_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.USERS_EDIT_LAYOUT,
		{
			path: URLS.USERS_EDIT_URL,
			element: VIEWS.USERS_EDIT_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.USERS_ROLES_LAYOUT,
		{
			path: URLS.USERS_ROLES_URL,
			element: VIEWS.USERS_ROLES_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.USERS_LOCK_LAYOUT,
		{
			path: URLS.USERS_LOCK_URL,
			element: VIEWS.USERS_LOCK_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.LOCKOUT_REASONS_ADD_LAYOUT,
		{
			path: URLS.LOCKOUT_REASONS_ADD_URL,
			element: VIEWS.LOCKOUT_REASONS_ADD_VIEW
		}
	);

	registerRoutes(
		LAYOUTS.LOCKOUT_REASONS_EDIT_LAYOUT,
		{
			path: URLS.LOCKOUT_REASONS_EDIT_URL,
			element: VIEWS.LOCKOUT_REASONS_EDIT_VIEW
		}
	);
}