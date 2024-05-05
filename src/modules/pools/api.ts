import { appConfig } from '../../config';
import { RemotePool } from './interfaces';

export const fetchPools = async (): Promise<RemotePool[]> => {
	const { apiUrl } = appConfig.endpoints;

	const response = await fetch(`${apiUrl}/pools-lite`);
	const data = await response.json();

	return data as RemotePool[];
};
