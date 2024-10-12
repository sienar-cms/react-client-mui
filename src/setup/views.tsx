import { registerRoutes, getUrl, SIENAR_URLS } from '@/react-utils';
import { Layouts } from '@/react-ui';
import Dashboard from '@/views/Dashboard';
import Register from '@/views/account/Register';

registerRoutes(
	Layouts.Dashboard,
	{
		path: getUrl(SIENAR_URLS.DASHBOARD),
		element: <Dashboard/>
	},
	{
		path: getUrl(SIENAR_URLS.REGISTER),
		element: <Register/>
	}
)