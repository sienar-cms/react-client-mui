import { registerRoutes, inject } from '@/react-utils';
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
import * as SIENAR_URLS from '@/keys/routes';
import * as SIENAR_VIEWS from '@/keys/views';

export default function() {
	const DashboardView = inject(SIENAR_VIEWS.DASHBOARD_VIEW, true) ?? Dashboard;
	const RegisterView = inject(SIENAR_VIEWS.REGISTER_VIEW, true) ?? Register;
	const RegisterSuccessfulView = inject(SIENAR_VIEWS.REGISTER_SUCCESSFUL_VIEW, true) ?? RegisterSuccessful;
	const ConfirmView = inject(SIENAR_VIEWS.CONFIRM_VIEW, true) ?? Confirm;
	const ConfirmSuccessfulView = inject(SIENAR_VIEWS.CONFIRM_SUCCESSFUL_VIEW, true) ?? ConfirmSuccessful;
	const LoginView = inject(SIENAR_VIEWS.LOGIN_VIEW, true) ?? Login;
	const ForgotPasswordView = inject(SIENAR_VIEWS.FORGOT_PASSWORD_VIEW, true) ?? ForgotPassword;
	const ForgotPasswordSuccessfulView = inject(SIENAR_VIEWS.FORGOT_PASSWORD_SUCCESSFUL_VIEW, true) ?? ForgotPasswordSuccessful;
	const ResetPasswordView = inject(SIENAR_VIEWS.RESET_PASSWORD_VIEW, true) ?? ResetPassword;
	const ResetPasswordSuccessfulView = inject(SIENAR_VIEWS.RESET_PASSWORD_SUCCESSFUL_VIEW, true) ?? ResetPasswordSuccessful;

	registerRoutes(
		Layouts.Dashboard,
		{
			path: inject(SIENAR_URLS.DASHBOARD_ROUTE),
			element: <DashboardView/>
		},
		{
			path: inject(SIENAR_URLS.REGISTER_ROUTE),
			element: <RegisterView/>
		},
		{
			path: inject(SIENAR_URLS.REGISTER_SUCCESSFUL_ROUTE),
			element: <RegisterSuccessfulView/>
		},
		{
			path: inject(SIENAR_URLS.CONFIRM_ROUTE),
			element: <ConfirmView/>
		},
		{
			path: inject(SIENAR_URLS.CONFIRM_SUCCESSFUL_ROUTE),
			element: <ConfirmSuccessfulView/>
		},
		{
			path: inject(SIENAR_URLS.LOGIN_ROUTE),
			element: <LoginView/>
		},
		{
			path: inject(SIENAR_URLS.FORGOT_PASSWORD_ROUTE),
			element: <ForgotPasswordView/>
		},
		{
			path: inject(SIENAR_URLS.FORGOT_PASSWORD_SUCCESSFUL_ROUTE),
			element: <ForgotPasswordSuccessfulView/>
		},
		{
			path: inject(SIENAR_URLS.RESET_PASSWORD_ROUTE),
			element: <ResetPasswordView/>
		},
		{
			path: inject(SIENAR_URLS.RESET_PASSWORD_SUCCESSFUL_ROUTE),
			element: <ResetPasswordSuccessfulView/>
		},
	);
}