import { EVENTS } from './constants/events';
import { getIoC, registerContainer } from './ioc';

export const bootstrap = async () => {
	registerContainer();
	const ioc = getIoC();

	const assetsService = ioc.getInstance('assetsService');
	const poolService = ioc.getInstance('poolsService');
	const $ee = ioc.getInstance('$ee');

	poolService.subscribeUpdate(
		(pools) => {
			console.log('updated');
			$ee.emit(EVENTS.POOLS_UPDATE, null, pools);
		},
		(err) => {
			$ee.emit(EVENTS.POOLS_UPDATE, err, []);
		},
	);

	await assetsService.getAssets();
};
