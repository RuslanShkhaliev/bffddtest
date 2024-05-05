import { IncomingMessage, ServerResponse } from 'node:http';
import { AssetsService } from '../../services/AssetsService';

export class AssetsController {
	constructor(private assetsService: AssetsService) {}

	public async getAssets(_req: IncomingMessage, res: ServerResponse) {
		try {
			res.writeHead(200, { 'Content-Type': 'application/json' });

			const assets = await this.assetsService.getAssets();
			res.end(JSON.stringify(assets));
		} catch (error) {
			res.writeHead(500);
			res.end('Error fetching assets');
		}
	}
}
