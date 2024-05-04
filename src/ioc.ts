import { type Constructor, IoC } from '@/lib/IoC';
import { PollingClient } from '@/lib/PollingClient';
import { AssetsController } from '@/modules/assets/controller';
import { AssetsRepository } from '@/modules/assets/repository';
import { PoolsController, PoolsRepository } from '@/modules/pools';
import { AssetsService } from '@/services/AssetsService';
import { PoolService } from '@/services/PoolsService';

interface ServiceRegistry {
	[key: string]: Constructor<any>;
	assetsRepository: Constructor<AssetsRepository>;
	assetsService: Constructor<AssetsService>;
	assetsController: Constructor<AssetsController>;
	poolsRepository: Constructor<PoolsRepository>;
	poolsService: Constructor<PoolService>;
	poolsController: Constructor<PoolsController>;
}

export let ioc = new IoC<ServiceRegistry>();
export const getIoC = () => {
	if (!ioc) {
		ioc = new IoC<ServiceRegistry>();
	}

	return ioc;
};
export const registerContainer = () => {
	const ioc = getIoC();
	ioc.register('assetsRepository', AssetsRepository);
	ioc.register(
		'assetsService',
		AssetsService,
		ioc.getInstance('assetsRepository'),
	);

	ioc.register(
		'assetsController',
		AssetsController,
		ioc.getInstance('assetsService'),
	);

	ioc
		.register('poolsRepository', PoolsRepository)
		.register(
			'poolsService',
			PoolService,
			ioc.getInstance('poolsRepository'),
			new PollingClient(),
		)
		.register(
			'poolsController',
			PoolsController,
			ioc.getInstance('poolsService'),
			ioc.getInstance('poolsRepository'),
		);
};
