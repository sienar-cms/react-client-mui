import { registerRoutes, inject, SIENAR_URLS } from '@/react-utils';
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

registerRoutes(
	Layouts.Dashboard,
	{
		path: inject(SIENAR_URLS.DASHBOARD),
		element: <Dashboard/>
	},
	{
		path: inject(SIENAR_URLS.REGISTER),
		element: <Register/>
	},
	{
		path: inject(SIENAR_URLS.REGISTER_SUCCESSFUL),
		element: <RegisterSuccessful/>
	},
	{
		path: inject(SIENAR_URLS.CONFIRM),
		element: <Confirm/>
	},
	{
		path: inject(SIENAR_URLS.CONFIRM_SUCCESSFUL),
		element: <ConfirmSuccessful/>
	},
	{
		path: inject(SIENAR_URLS.LOGIN),
		element: <Login/>
	},
	{
		path: inject(SIENAR_URLS.FORGOT_PASSWORD),
		element: <ForgotPassword/>
	},
	{
		path: inject(SIENAR_URLS.FORGOT_PASSWORD_SUCCESSFUL),
		element: <ForgotPasswordSuccessful/>
	},
	{
		path: inject(SIENAR_URLS.RESET_PASSWORD),
		element: <ResetPassword/>
	},
	{
		path: inject(SIENAR_URLS.RESET_PASSWORD_SUCCESSFUL),
		element: <ResetPasswordSuccessful/>
	},
)