import { Asset } from '@/models';
import { AssetModel } from 'src/modules/assets/model';

export class AssetsRepository {
	private assets: AssetModel[] = [];

	public setAssets(assets: Asset[]): void {
		this.assets = assets.map((asset) => new AssetModel(asset));
	}

	public getAssets(): AssetModel[] {
		return this.assets;
	}

	public get assetsMap(): Map<string, AssetModel> {
		const map = new Map<string, AssetModel>();

		this.assets.forEach((asset) => {
			const key = asset.getKey();
			map.set(key, asset);
		});
		return map;
	}

	public exists(key: string): boolean {
		return this.assetsMap.has(key);
	}
}
