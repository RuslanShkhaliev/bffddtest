import { appConfig } from '@/config';
import { RemotePool } from './interfaces';

const baseUrl = appConfig.apiUrl;

export const fetchPools = async (): Promise<RemotePool[]> => {
	const response = await fetch(`${baseUrl}/pools-lite`);

	const data = await response.json();

	return data as RemotePool[];
};
