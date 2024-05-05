import * as process from 'node:process';

export const appConfig = {
	endpoints: {
		apiUrl: process.env.BASE_API_URL || 'https://api.dedust.io/v2',
		assetsApiUrl: process.env.ASSETS_API_URL || 'https://assets.dedust.io',
	},
	server: {
		WSS: 5000,
		PORT: process.env.PORT || 8080,
	},
};
