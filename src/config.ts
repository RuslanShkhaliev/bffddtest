import * as process from 'node:process';

export const appConfig = {
	apiUrl: process.env.BASE_API_URL || 'https://api.dedust.io/v2',
	assetsApiUrl: process.env.ASSETS_API_URL || 'https://assets.dedust.io',
};
