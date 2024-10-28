import { provide } from '@/react-utils/di.ts';
import { API_CALLER } from '@/react-utils/http.ts';
import { sendRequest } from '@/react-utils/utils';
import { registerProvider } from '@/react-utils/providers.tsx';
import { StrictMode } from 'react';


export default function () {
	provide(API_CALLER, sendRequest);
	registerProvider(StrictMode);
}