import { setUrl, SIENAR_URLS } from '@/react-utils';

setUrl(SIENAR_URLS.HOME, '/', false);
setUrl(SIENAR_URLS.DASHBOARD, '/dashboard', false);

// Account

setUrl(SIENAR_URLS.REGISTER, '/dashboard/account/register', false);
setUrl(SIENAR_URLS.REGISTER_SUCCESSFUL, '/dashboard/account/register/successful', false);
setUrl(SIENAR_URLS.CONFIRM, '/dashboard/account/confirm', false);
setUrl(SIENAR_URLS.CONFIRM_SUCCESSFUL, '/dashboard/account/confirm/successful', false);
setUrl(SIENAR_URLS.LOGIN, '/dashboard/account/login', false);
setUrl(SIENAR_URLS.FORGOT_PASSWORD, '/dashboard/account/forgot-password', false);
setUrl(SIENAR_URLS.FORGOT_PASSWORD_SUCCESSFUL, '/dashboard/account/forgot-password/successful', false);
setUrl(SIENAR_URLS.RESET_PASSWORD, '/dashboard/account/reset-password', false);