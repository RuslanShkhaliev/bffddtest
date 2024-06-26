import { appConfig } from '../config';
import { LongPolling } from '../interfaces';
import { getIoC } from '../ioc';
import { fetchPools, PoolsRepository, RemotePool } from '../modules/pools';
import { makeKey } from '../utils';

export class PoolService {
	constructor(
		private poolsRepository: PoolsRepository,
		private client: LongPolling,
	) {}

	public getPools = async () => {
		const data = await fetchPools();
		const pools = filterPools(data);
		this.poolsRepository.updatePools(filterPools(pools));

		return pools;
	};

	public subscribeUpdate = (
		callback?: (pools: RemotePool[]) => void,
		fallback?: (err: unknown) => void,
	) => {
		const { disconnect } = this.client
			.connect(`${appConfig.apiUrl}/pools-lite`, {
				ms: 10_000,
				immediate: true,
			})
			.onResponse<RemotePool[]>((data) => {
				console.log('Pools updated', data.length);
				const pools = filterPools(data);
				console.log('Pools filtered', pools.length);
				callback?.(pools);
				this.poolsRepository.updatePools(pools);
			})
			.onError((err) => {
				fallback?.(err);
			});

		return disconnect;
	};
}

const filterPools = (pools: RemotePool[]): RemotePool[] => {
	const ioc = getIoC();
	const assetsRepo = ioc.getInstance('assetsRepository');
	return pools.filter((pool) => {
		const isKnown = !pool.assets.some(
			(a) => a !== 'native' && !assetsRepo.exists(makeKey(a)),
		);
		const hasReserves =
			pool.reserves.every((r) => r !== '0') && pool.totalSupply !== '0';

		return isKnown && hasReserves;
	});
};
