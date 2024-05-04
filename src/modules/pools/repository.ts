import { RemotePool } from './interfaces';

export class PoolsRepository {
	private pools: RemotePool[] = [];
	public updatedAt = Date.now();

	public updatePools(pools: RemotePool[]): void {
		this.pools = pools;
		this.updatedAt = Date.now();
		console.log('updatedAt', new Date(this.updatedAt));
	}

	public getPools(): { pools: RemotePool[]; updatedAt: number } {
		return {
			pools: this.pools,
			updatedAt: this.updatedAt,
		};
	}
}
