import { provide } from '@/react-utils';
import * as SIENAR_URLS from '@/keys/routes';

export default function() {
	provide(SIENAR_URLS.HOME_ROUTE, '/', false);
	provide(SIENAR_URLS.DASHBOARD_ROUTE, '/dashboard', false);

// Account

	provide(SIENAR_URLS.REGISTER_ROUTE, '/dashboard/account/register', false);
	provide(SIENAR_URLS.REGISTER_SUCCESSFUL_ROUTE, '/dashboard/account/register/successful', false);
	provide(SIENAR_URLS.CONFIRM_ROUTE, '/dashboard/account/confirm', false);
	provide(SIENAR_URLS.CONFIRM_SUCCESSFUL_ROUTE, '/dashboard/account/confirm/successful', false);
	provide(SIENAR_URLS.LOGIN_ROUTE, '/dashboard/account/login', false);
	provide(SIENAR_URLS.FORGOT_PASSWORD_ROUTE, '/dashboard/account/forgot-password', false);
	provide(SIENAR_URLS.FORGOT_PASSWORD_SUCCESSFUL_ROUTE, '/dashboard/account/forgot-password/successful', false);
	provide(SIENAR_URLS.RESET_PASSWORD_ROUTE, '/dashboard/account/reset-password', false);
	provide(SIENAR_URLS.RESET_PASSWORD_SUCCESSFUL_ROUTE, '/dashboard/account/reset-password/successful', false);
	provide(SIENAR_URLS.CHANGE_EMAIL_ROUTE, '/dashboard/account/change-email', false);
	provide(SIENAR_URLS.CHANGE_EMAIL_REQUESTED_ROUTE, '/dashboard/account/change-email/requested', false);
	provide(SIENAR_URLS.CHANGE_EMAIL_CONFIRM_ROUTE, '/dashboard/account/change-email/confirm', false);
	provide(SIENAR_URLS.CHANGE_EMAIL_SUCCESSFUL_ROUTE, '/dashboard/account/change-email/successful', false);
	provide(SIENAR_URLS.CHANGE_PASSWORD_ROUTE, '/dashboard/account/change-password', false);
	provide(SIENAR_URLS.CHANGE_PASSWORD_SUCCESSFUL_ROUTE, '/dashboard/account/change-password/successful', false);
	provide(SIENAR_URLS.PERSONAL_DATA_ROUTE, '/dashboard/account/personal-data', false);
	provide(SIENAR_URLS.DOWNLOAD_PERSONAL_DATA_ROUTE, '/api/account/personal-data', false);
	provide(SIENAR_URLS.DELETE_ACCOUNT_ROUTE, '/dashboard/account/delete', false);
	provide(SIENAR_URLS.DELETED_ROUTE, '/dashboard/account/deleted', false);
}