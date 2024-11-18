import { createApp, DOCUMENT_TITLE_SUFFIX, provide, setup as reactUtilsSetup } from '@sienar/react-utils';
import { setup as reactUiSetup } from '@sienar/react-ui-mui';
import './overrides.ts';
import { setup } from './main.tsx';

provide(DOCUMENT_TITLE_SUFFIX, '| Sienar Development App');

reactUtilsSetup();
reactUiSetup();
setup();

// Build and run React app
createApp();
