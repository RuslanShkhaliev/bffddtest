export interface Asset {
	type: 'native' | 'jetton';
	address?: string;
	name: string;
	symbol: string;
	decimals: number;
}

export type AssetSimple = 'native' | `jetton:${string}`;
