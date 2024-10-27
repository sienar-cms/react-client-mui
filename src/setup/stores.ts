import { addReducer, authReducer, AUTH_NAME, infrastructureReducer, INFRASTRUCTURE_NAME } from '@/react-utils';

export default function() {
	addReducer(AUTH_NAME, authReducer);
	addReducer(INFRASTRUCTURE_NAME, infrastructureReducer);
}