import dotenv from 'dotenv';
import { bootstrap } from './bootstrap';
import { ioc } from './ioc';
import { assetsRouter } from './modules/assets';
import { poolsRouter } from './modules/pools';
import { createServer } from './server';

dotenv.config();

bootstrap().then(() => {
	console.log(ioc, 'ioc');
	const appRouter = Object.assign({}, assetsRouter(), poolsRouter());
	const PORT = process.env.PORT || 8080;
	createServer(appRouter).listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
