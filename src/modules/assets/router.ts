import { getIoC } from '@/ioc';

export const assetsRouter = () => {
	const ioc = getIoC();
	const assetsController = ioc.getInstance('assetsController');

	return {
		assets: assetsController.getAssets,
	};
};
