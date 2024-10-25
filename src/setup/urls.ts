import { provide, SIENAR_URLS } from '@/react-utils';

provide(SIENAR_URLS.HOME, '/', false);
provide(SIENAR_URLS.DASHBOARD, '/dashboard', false);

// Account

provide(SIENAR_URLS.REGISTER, '/dashboard/account/register', false);
provide(SIENAR_URLS.REGISTER_SUCCESSFUL, '/dashboard/account/register/successful', false);
provide(SIENAR_URLS.CONFIRM, '/dashboard/account/confirm', false);
provide(SIENAR_URLS.CONFIRM_SUCCESSFUL, '/dashboard/account/confirm/successful', false);
provide(SIENAR_URLS.LOGIN, '/dashboard/account/login', false);
provide(SIENAR_URLS.FORGOT_PASSWORD, '/dashboard/account/forgot-password', false);
provide(SIENAR_URLS.FORGOT_PASSWORD_SUCCESSFUL, '/dashboard/account/forgot-password/successful', false);
provide(SIENAR_URLS.RESET_PASSWORD, '/dashboard/account/reset-password', false);
provide(SIENAR_URLS.RESET_PASSWORD_SUCCESSFUL, '/dashboard/account/reset-password/successful', false);