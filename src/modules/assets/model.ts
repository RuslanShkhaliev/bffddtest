import { Asset } from '@/models';

export class AssetModel {
	static makeKey(asset: Asset): string {
		return asset.address || asset.symbol.toUpperCase();
	}

	private readonly data: Asset;
	private _rate: number = 0;

	constructor(asset: Asset) {
		this.data = asset;
	}

	public getData(): Asset {
		return this.data;
	}

	set rate(rate: number) {
		this._rate = rate;
	}

	get rate(): number {
		return this._rate;
	}

	public getKey(): string {
		return AssetModel.makeKey(this.data);
	}

	public getSymbol(): string {
		return this.data.symbol;
	}

	public isNative(): boolean {
		return this.data.type === 'native';
	}
}
