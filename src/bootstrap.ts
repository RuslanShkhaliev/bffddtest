import { WebSocket } from 'ws';
import { appConfig } from './config';
import { EVENTS } from './constants/events';
import { getIoC, registerContainer } from './ioc';

export const bootstrap = async () => {
	registerContainer();
	const ioc = getIoC();

	const assetsService = ioc.getInstance('assetsService');
	await assetsService.getAssets();

	const poolsService = ioc.getInstance('poolsService');
	const $ee = ioc.getInstance('$ee');

	poolsService.subscribeUpdate((error: unknown) => {
		if (error) {
			$ee.emit('pools-update', error);
			return;
		}
		$ee.emit('pools-update');
	});

	const { WSS } = appConfig.server;
	const wss = new WebSocket.Server({ port: WSS });

	wss.on('connection', (ws) => {
		ws.on('message', (msg: string) => {
			console.log('received: %s', msg);
		});

		const poolsRepository = ioc.getInstance('poolsRepository');

		$ee.on(EVENTS.POOLS_UPDATE, (error) => {
			if (error) {
				ws.send(JSON.stringify('Ошибка при обновлении пулов'));
				return;
			}
			const pools = poolsRepository.getPools();
			ws.send(JSON.stringify(pools));
		});
	});
};
