import { AssetsRepository, fetchAssets } from '../modules/assets';

export class AssetsService {
	constructor(private assetsRepository: AssetsRepository) {}

	public async getAssets() {
		const assets = await fetchAssets();
		this.assetsRepository.setAssets(assets);

		return assets;
	}
}
