import { registerRoutes, getUrl, SIENAR_URLS } from '@/react-utils';
import { Layouts } from '@/react-ui';
import Dashboard from '@/views/Dashboard';
import Register from '@/views/account/register/Index';
import RegisterSuccessful from '@/views/account/register/Successful';
import Confirm from '@/views/account/confirm/Index';
import ConfirmSuccessful from '@/views/account/confirm/Successful';
import Login from '@/views/account/Login';

registerRoutes(
	Layouts.Dashboard,
	{
		path: getUrl(SIENAR_URLS.DASHBOARD),
		element: <Dashboard/>
	},
	{
		path: getUrl(SIENAR_URLS.REGISTER),
		element: <Register/>
	},
	{
		path: getUrl(SIENAR_URLS.REGISTER_SUCCESSFUL),
		element: <RegisterSuccessful/>
	},
	{
		path: getUrl(SIENAR_URLS.CONFIRM),
		element: <Confirm/>
	},
	{
		path: getUrl(SIENAR_URLS.CONFIRM_SUCCESSFUL),
		element: <ConfirmSuccessful/>
	},
	{
		path: getUrl(SIENAR_URLS.LOGIN),
		element: <Login/>
	}
)