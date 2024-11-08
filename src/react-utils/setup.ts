import { provide } from '@/react-utils/di.ts';
import { API_CALLER } from '@/react-utils/http.ts';
import { sendRequest } from '@/react-utils/utils.ts';
import { registerProvider } from '@/react-utils/providers.tsx';
import AuthProvider from '@/react-utils/components/AuthProvider.tsx';
import InfrastructureProvider from '@/react-utils/components/InfrastructureProvider.tsx';

export default function () {
	provide(API_CALLER, sendRequest);
	registerProvider(AuthProvider);
	registerProvider(InfrastructureProvider);
}