import { EventEmitter } from 'node:events';
import { fetchPools } from '../modules/pools';

interface Options {
	ms: number;
	immediate?: boolean;
}

type ErrorHandler = (error: unknown) => void;
type ResponseHandler<T> = (data: T) => void;

export class PollingClient {
	private emitter = new EventEmitter();
	private timer: NodeJS.Timeout | null = null;

	public connect = (url: string, options?: Options) => {
		const { ms = 10_000, immediate = false } = options || {};

		if (immediate) {
			fetchPools()
				.then((data) => {
					this.emitter.emit('response', data);
				})
				.catch((err) => {
					this.emitter.emit('error', err);
				});
		}

		this.timer = setInterval(async () => {
			try {
				const response = await fetch(url);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await fetchPools();

				this.emitter.emit('response', data);
			} catch (err: unknown) {
				this.emitter.emit('error', err);
			}
		}, ms);

		return this;
	};

	public onError = (handler: ErrorHandler) => {
		this.emitter.on('error', handler);

		return this;
	};

	public onResponse = <T>(handler: ResponseHandler<T>) => {
		this.emitter.on('response', handler);

		return this;
	};

	public disconnect = (): void => {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	};
}
