import { createApp, setup as reactUtilsSetup } from '@/react-utils';
import { setup as reactUiSetup } from '@/react-ui';
import './overrides';
import { setup } from './main';

reactUtilsSetup();
reactUiSetup();
setup();

// Build and run React app
createApp();
