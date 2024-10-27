import { provide } from '@/react-utils/infrastructure/di';
import { API_CALLER } from '@/react-utils/infrastructure/http';
import { sendRequest } from '@/react-utils/utils';

provide(API_CALLER, sendRequest);