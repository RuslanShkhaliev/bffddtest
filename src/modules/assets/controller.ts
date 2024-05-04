import { AssetsService } from '@/services/AssetsService';
import { IncomingMessage, ServerResponse } from 'node:http';

export class AssetsController {
	constructor(private assetsService: AssetsService) {}

	public async getAssets(_req: IncomingMessage, res: ServerResponse) {
		try {
			const assets = await this.assetsService.getAssets();
			res.end(JSON.stringify(assets));
		} catch (error) {
			res.writeHead(500);
			res.end('Error fetching assets');
		}
	}
}
