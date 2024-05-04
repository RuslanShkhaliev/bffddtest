import { appConfig } from '@/config';
import { type Asset } from '@/models';

export const fetchAssets = async (): Promise<Asset[]> => {
	const response = await fetch(`${appConfig.assetsApiUrl}/list.json`);
	const assets = (await response.json()) as Asset[];
	return assets;
};
