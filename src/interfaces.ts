import { IncomingMessage, ServerResponse } from 'node:http';

export type Controller = (req: IncomingMessage, res: ServerResponse) => void;

export type Router = Record<string, Controller>;

type ErrorHandler = (error: unknown) => void;
type ResponseHandler<T> = (data: T) => void;
interface Options {
	ms: number;
	immediate?: boolean;
}
export interface LongPolling {
	connect(url: string, options?: Options): this;
	disconnect(): void;
	onError(handler: ErrorHandler): this;
	onResponse<T>(handler: ResponseHandler<T>): this;
}
