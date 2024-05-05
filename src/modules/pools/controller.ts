import { IncomingMessage, ServerResponse } from 'http';
import { EventEmitter } from 'node:events';
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

	public poolsStream = (req: IncomingMessage, res: ServerResponse): void => {
		res.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
		});

		const sendEvent = (error: unknown) => {
			console.log('send event');
			if (error) {
				res.write(`event: error\n`);
				res.write(
					`data: ${JSON.stringify({ message: 'Ошибка получения данных пулов' })}\n\n`,
				);
				return;
			}

			const pools = this.poolsRepository.getPools();
			res.write(`data: ${JSON.stringify(pools)}\n\n`);
		};

		sendEvent(null);

		this.$ee.on(EVENTS.POOLS_UPDATE, sendEvent);

		req.on('close', () => {
			console.log('Client closed connection');
			this.$ee.off(EVENTS.POOLS_UPDATE, sendEvent);
			res.end();
		});
	};
}
