import { PoolsRepository } from '@/modules/pools/repository';
import { PoolService } from '@/services/PoolsService';
import { IncomingMessage, ServerResponse } from 'http';

export class PoolsController {
	constructor(
		// @ts-ignore
		private poolsService: PoolService,
		private poolsRepository: PoolsRepository,
	) {
		this.poolsService = poolsService;
		console.log(poolsService);
	}

	public getPools = async (
		_req: IncomingMessage,
		res: ServerResponse,
	): Promise<void> => {
		try {
			const data = this.poolsRepository.getPools();
			res.end(JSON.stringify(data));
		} catch (err: unknown) {
			console.log(err);
			res.writeHead(500);
			res.end(new Error('Ошибка получения данных пулов'));
		}
	};
}
