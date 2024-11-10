import { registerProvider } from '@/react-utils/providers.tsx';
import AuthProvider from '@/react-utils/components/AuthProvider.tsx';
import InfrastructureProvider from '@/react-utils/components/InfrastructureProvider.tsx';

export default function () {
	registerProvider(AuthProvider);
	registerProvider(InfrastructureProvider);
}