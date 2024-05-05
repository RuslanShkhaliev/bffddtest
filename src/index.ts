import dotenv from 'dotenv';
import { bootstrap } from './bootstrap';
import { appConfig } from './config';
import { assetsRouter } from './modules/assets';
import { poolsRouter } from './modules/pools';
import { createServer } from './server';

dotenv.config();

bootstrap().then(() => {
	const appRouter = Object.assign({}, assetsRouter(), poolsRouter());
	const { PORT } = appConfig.server;

	createServer(appRouter).listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
