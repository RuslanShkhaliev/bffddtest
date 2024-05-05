import { Asset } from '@/models';
import { AssetsRepository, fetchAssets } from '../modules/assets';

export class AssetsService {
	constructor(private assetsRepository: AssetsRepository) {}

	public getAssets = async (): Promise<Asset[]> => {
		const assets = await fetchAssets();
		this.assetsRepository.setAssets(assets);

		return assets;
	};
}
