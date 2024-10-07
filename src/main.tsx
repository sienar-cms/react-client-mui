// region URLs

import { setUrl, SIENAR_URLS } from '@/react-utils';

setUrl(SIENAR_URLS.DASHBOARD, '/dashboard', false);

// endregion

// region Stores
import { addReducer, authReducer, AUTH_NAME, infrastructureReducer, INFRASTRUCTURE_NAME } from '@/react-utils';

addReducer(AUTH_NAME, authReducer);
addReducer(INFRASTRUCTURE_NAME, infrastructureReducer);

// endregion

// region Templates

import { setTemplate, SIENAR_TEMPLATES } from '@/react-utils';
import DrawerFooter from './templates/DrawerFooter';

setTemplate(SIENAR_TEMPLATES.DRAWER_FOOTER, <DrawerFooter/>);

// endregion