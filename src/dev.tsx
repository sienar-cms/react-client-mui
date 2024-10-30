import { createApp, setup as reactUtilsSetup } from '@/react-utils';
import { setup as reactUiSetup } from '@/react-ui';
import './overrides.ts';
import { setup } from './main.tsx';

reactUtilsSetup();
reactUiSetup();
setup();

// Build and run React app
createApp();
