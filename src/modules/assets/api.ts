import { appConfig } from '../../config';
import { type Asset } from '../../models';

export const fetchAssets = async (): Promise<Asset[]> => {
	const { assetsApiUrl } = appConfig.endpoints;

	const response = await fetch(`${assetsApiUrl}/list.json`);
	const assets = (await response.json()) as Asset[];

	return assets;
};
