import { type AssetSimple } from './models';

export const makeKey = (asset: AssetSimple) => {
	return asset === 'native' ? asset : asset.split(':')[1];
};
