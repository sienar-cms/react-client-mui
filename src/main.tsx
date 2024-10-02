import { createApp, addReducer, authReducer, AUTH_NAME } from '@/react-utils';

addReducer(AUTH_NAME, authReducer);

// Build and run React app
createApp();