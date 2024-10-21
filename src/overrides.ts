import { setUrl, SIENAR_URLS } from '@/react-utils';

setUrl(SIENAR_URLS.DASHBOARD, '/');

// Account

setUrl(SIENAR_URLS.REGISTER, '/account/register');
setUrl(SIENAR_URLS.REGISTER_SUCCESSFUL, '/account/register/successful');
setUrl(SIENAR_URLS.CONFIRM, '/account/confirm');
setUrl(SIENAR_URLS.CONFIRM_SUCCESSFUL, '/account/confirm/successful');
setUrl(SIENAR_URLS.LOGIN, '/account/login');