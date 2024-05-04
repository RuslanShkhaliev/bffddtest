import { ioc, registerContainer } from '@/ioc';

export const bootstrap = async () => {
	registerContainer();

	const assetsService = ioc.getInstance('assetsService');
	const poolsService = ioc.getInstance('poolsService');

	await assetsService.getAssets();
	poolsService.subscribeUpdate();
};
