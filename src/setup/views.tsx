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

export default function() {
	registerRoutes(
		Layouts.Dashboard,
		{
			path: inject(SIENAR_URLS.DASHBOARD_ROUTE),
			element: <Dashboard/>
		},
		{
			path: inject(SIENAR_URLS.REGISTER_ROUTE),
			element: <Register/>
		},
		{
			path: inject(SIENAR_URLS.REGISTER_SUCCESSFUL_ROUTE),
			element: <RegisterSuccessful/>
		},
		{
			path: inject(SIENAR_URLS.CONFIRM_ROUTE),
			element: <Confirm/>
		},
		{
			path: inject(SIENAR_URLS.CONFIRM_SUCCESSFUL_ROUTE),
			element: <ConfirmSuccessful/>
		},
		{
			path: inject(SIENAR_URLS.LOGIN_ROUTE),
			element: <Login/>
		},
		{
			path: inject(SIENAR_URLS.FORGOT_PASSWORD_ROUTE),
			element: <ForgotPassword/>
		},
		{
			path: inject(SIENAR_URLS.FORGOT_PASSWORD_SUCCESSFUL_ROUTE),
			element: <ForgotPasswordSuccessful/>
		},
		{
			path: inject(SIENAR_URLS.RESET_PASSWORD_ROUTE),
			element: <ResetPassword/>
		},
		{
			path: inject(SIENAR_URLS.RESET_PASSWORD_SUCCESSFUL_ROUTE),
			element: <ResetPasswordSuccessful/>
		},
	);
}