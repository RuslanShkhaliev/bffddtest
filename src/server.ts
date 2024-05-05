import * as http from 'node:http';
import { type Router } from './interfaces';

export const createServer = (router: Router) => {
	return http.createServer((req, res) => {
		// Устанавливаем заголовки для CORS
		res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешить все домены
		res.setHeader(
			'Access-Control-Allow-Methods',
			'OPTIONS, GET, POST, PUT, PATCH, DELETE',
		); // Разрешить методы
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Content-Type, Authorization',
		); // Разрешить заголовки

		const { url = '' } = req;
		const controller = router[url];
		if (controller) {
			controller(req, res);
		} else {
			res.writeHead(404);
			res.end('Not found');
		}
	});
};
