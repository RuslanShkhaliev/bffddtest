import { IncomingMessage, ServerResponse } from 'http';
import { PoolService } from '../../services/PoolsService';
import { PoolsRepository } from './repository';

export class PoolsController {
	constructor(
		// @ts-ignore
		private poolsService: PoolService,
		private poolsRepository: PoolsRepository,
	) {}

	public getPools = async (
		_req: IncomingMessage,
		res: ServerResponse,
	): Promise<void> => {
		try {
			res.writeHead(200, { 'Content-Type': 'application/json' });

			const data = this.poolsRepository.getPools();
			res.end(JSON.stringify(data));
		} catch (err: unknown) {
			console.log(err);
			res.writeHead(500);
			res.end(new Error('Ошибка получения пулов'));
		}
	};
}
