import { setUrl, SIENAR_URLS } from '@/react-utils';

setUrl(SIENAR_URLS.HOME, '/', false);
setUrl(SIENAR_URLS.DASHBOARD, '/dashboard', false);

// Account

setUrl(SIENAR_URLS.REGISTER, '/dashboard/account/register', false);
setUrl(SIENAR_URLS.REGISTER_SUCCESSFUL, '/dashboard/account/register/successful', false);
setUrl(SIENAR_URLS.CONFIRM, '/dashboard/account/confirm', false);
setUrl(SIENAR_URLS.CONFIRM_SUCCESSFUL, '/dashboard/account/confirm/successful', false);
setUrl(SIENAR_URLS.LOGIN, '/dashboard/account/login', false);