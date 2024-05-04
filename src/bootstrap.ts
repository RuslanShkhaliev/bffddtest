import { getIoC, registerContainer } from './ioc';

export const bootstrap = async () => {
	registerContainer();
	const ioc = getIoC();

	const assetsService = ioc.getInstance('assetsService');
	const poolsService = ioc.getInstance('poolsService');

	await assetsService.getAssets();
	poolsService.subscribeUpdate();
};
