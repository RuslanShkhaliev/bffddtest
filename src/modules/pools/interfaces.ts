import { AssetSimple } from '../../models';

export interface RemotePool {
	address: string;
	lt: string;
	totalSupply: string;
	type: 'volatile' | 'stable';
	tradeFee: string;
	reserves: [string, string];
	assets: [AssetSimple, AssetSimple];
	fees: [string, string];
	volume: [string, string];
}
