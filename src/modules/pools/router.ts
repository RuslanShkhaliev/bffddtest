import { getIoC } from '@/ioc';

export const poolsRouter = () => {
	const ioc = getIoC();

	const poolsController = ioc.getInstance('poolsController');
	return {
		pools: poolsController.getPools,
	};
};
