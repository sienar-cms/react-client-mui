import { registerRoutes, inject, provide } from '@/react-utils';
import { Layouts } from '@/react-ui';
import Dashboard from '@/views/Dashboard';
import Register from '@/views/account/register/Index';
import RegisterSuccessful from '@/views/account/register/Successful';
import Confirm from '@/views/account/confirm/Index';
import ConfirmSuccessful from '@/views/account/confirm/Successful';
import Login from '@/views/account/Login';
import ForgotPassword from '@/views/account/forgot-password/Index';
import ForgotPasswordSuccessful from '@/views/account/forgot-password/Successful';
import ResetPassword from '@/views/account/reset-password/Index';
import ResetPasswordSuccessful from '@/views/account/reset-password/Successful';
import ChangeEmail from '@/views/account/change-email/Index';
import ChangeEmailRequested from '@/views/account/change-email/Requested';
import ChangeEmailConfirm from '@/views/account/change-email/Confirm';
import ChangeEmailSuccessful from '@/views/account/change-email/Successful';
import ChangePassword from '@/views/account/change-password/Index';
import ChangePasswordSuccessful from '@/views/account/change-password/Successful';
import PersonalData from '@/views/account/PersonalData';
import DeleteAccount from '@/views/account/Delete';
import Deleted from '@/views/account/Deleted';
import LockoutReasonIndex from '@/views/lockout-reasons/Index';
import LockoutReasonUpsert from '@/views/lockout-reasons/Upsert';
import * as SIENAR_URLS from '@/keys/routes';
import * as SIENAR_VIEWS from '@/keys/views';
import { DASHBOARD_LAYOUT } from '@/keys';

export default function() {
	provide(DASHBOARD_LAYOUT, Layouts.Dashboard, false);

	registerRoutes(
		DASHBOARD_LAYOUT,
		{
			path: inject(SIENAR_URLS.DASHBOARD_ROUTE),
			element: inject(SIENAR_VIEWS.DASHBOARD_VIEW, true) ?? <Dashboard/>
		},
		{
			path: inject(SIENAR_URLS.REGISTER_ROUTE),
			element: inject(SIENAR_VIEWS.REGISTER_VIEW, true) ?? <Register/>
		},
		{
			path: inject(SIENAR_URLS.REGISTER_SUCCESSFUL_ROUTE),
			element: inject(SIENAR_VIEWS.REGISTER_SUCCESSFUL_VIEW, true) ?? <RegisterSuccessful/>
		},
		{
			path: inject(SIENAR_URLS.CONFIRM_ROUTE),
			element: inject(SIENAR_VIEWS.CONFIRM_VIEW, true) ?? <Confirm/>
		},
		{
			path: inject(SIENAR_URLS.CONFIRM_SUCCESSFUL_ROUTE),
			element: inject(SIENAR_VIEWS.CONFIRM_SUCCESSFUL_VIEW, true) ?? <ConfirmSuccessful/>
		},
		{
			path: inject(SIENAR_URLS.LOGIN_ROUTE),
			element: inject(SIENAR_VIEWS.LOGIN_VIEW, true) ?? <Login/>
		},
		{
			path: inject(SIENAR_URLS.FORGOT_PASSWORD_ROUTE),
			element: inject(SIENAR_VIEWS.FORGOT_PASSWORD_VIEW, true) ?? <ForgotPassword/>
		},
		{
			path: inject(SIENAR_URLS.FORGOT_PASSWORD_SUCCESSFUL_ROUTE),
			element: inject(SIENAR_VIEWS.FORGOT_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ForgotPasswordSuccessful/>
		},
		{
			path: inject(SIENAR_URLS.RESET_PASSWORD_ROUTE),
			element: inject(SIENAR_VIEWS.RESET_PASSWORD_VIEW, true) ?? <ResetPassword/>
		},
		{
			path: inject(SIENAR_URLS.RESET_PASSWORD_SUCCESSFUL_ROUTE),
			element: inject(SIENAR_VIEWS.RESET_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ResetPasswordSuccessful/>
		},
		{
			path: inject(SIENAR_URLS.CHANGE_EMAIL_ROUTE),
			element: inject(SIENAR_VIEWS.CHANGE_EMAIL_VIEW, true) ?? <ChangeEmail/>
		},
		{
			path: inject(SIENAR_URLS.CHANGE_EMAIL_REQUESTED_ROUTE),
			element: inject(SIENAR_VIEWS.CHANGE_EMAIL_REQUESTED_VIEW, true) ?? <ChangeEmailRequested/>
		},
		{
			path: inject(SIENAR_URLS.CHANGE_EMAIL_CONFIRM_ROUTE),
			element: inject(SIENAR_VIEWS.CHANGE_EMAIL_CONFIRM_VIEW, true) ?? <ChangeEmailConfirm/>
		},
		{
			path: inject(SIENAR_URLS.CHANGE_EMAIL_SUCCESSFUL_ROUTE),
			element: inject(SIENAR_VIEWS.CHANGE_EMAIL_SUCCESSFUL_VIEW, true) ?? <ChangeEmailSuccessful/>
		},
		{
			path: inject(SIENAR_URLS.CHANGE_PASSWORD_ROUTE),
			element: inject(SIENAR_VIEWS.CHANGE_PASSWORD_VIEW, true) ?? <ChangePassword/>
		},
		{
			path: inject(SIENAR_URLS.CHANGE_PASSWORD_SUCCESSFUL_ROUTE),
			element: inject(SIENAR_VIEWS.CHANGE_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ChangePasswordSuccessful/>
		},
		{
			path: inject(SIENAR_URLS.PERSONAL_DATA_ROUTE),
			element: inject(SIENAR_VIEWS.PERSONAL_DATA_VIEW, true) ?? <PersonalData/>
		},
		{
			path: inject(SIENAR_URLS.DELETE_ACCOUNT_ROUTE),
			element: inject(SIENAR_VIEWS.DELETE_ACCOUNT_VIEW, true) ?? <DeleteAccount/>
		},
		{
			path: inject(SIENAR_URLS.DELETED_ROUTE),
			element: inject(SIENAR_VIEWS.DELETED_VIEW, true) ?? <Deleted/>
		},
		{
			path: inject(SIENAR_URLS.LOCKOUT_REASONS_ROUTE),
			element: inject(SIENAR_VIEWS.LOCKOUT_REASONS_UPSERT_VIEW, true) ?? <LockoutReasonIndex/>
		},
		{
			path: inject(SIENAR_URLS.LOCKOUT_REASONS_ADD_ROUTE),
			element: inject(SIENAR_VIEWS.LOCKOUT_REASONS_UPSERT_VIEW, true) ?? <LockoutReasonUpsert/>
		},
		{
			path: `${inject(SIENAR_URLS.LOCKOUT_REASONS_ROUTE)}/:id`,
			element: inject(SIENAR_VIEWS.LOCKOUT_REASONS_UPSERT_VIEW, true) ?? <LockoutReasonUpsert/>
		}
	);
}