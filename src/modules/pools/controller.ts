import { IncomingMessage, ServerResponse } from 'http';
import { EventEmitter } from 'node:events';
import { WebSocket } from 'ws';
import { EVENTS } from '../../constants/events';
import { PoolService } from '../../services/PoolsService';
import { PoolsRepository } from './repository';

export class PoolsController {
	constructor(
		// @ts-ignore
		private poolsService: PoolService,
		private poolsRepository: PoolsRepository,
		private $ee: EventEmitter,
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

	public getPoolsWSS = async () => {
		const wss = new WebSocket.Server({ port: 8080 });

		wss.on('connection', (ws) => {
			ws.on('message', (msg: string) => {
				console.log('received: %s', msg);
			});

			this.$ee.on(EVENTS.POOLS_UPDATE, (error) => {
				if (error) {
					ws.send(JSON.stringify('Ошибка при обновлении пулов'));
					return;
				}
				const pools = this.poolsRepository.getPools();
				ws.send(JSON.stringify(pools));
			});
		});
	};
}
