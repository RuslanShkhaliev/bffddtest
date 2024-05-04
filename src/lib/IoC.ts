export type Constructor<T = any> = new (...args: any[]) => T;
export class IoC<Container extends Record<string, Constructor>> {
	private container = new Map<
		keyof Container,
		InstanceType<Container[keyof Container]>
	>();

	public register<K extends keyof Container>(
		key: K,
		constructor: Container[K],
		...deps: any[]
	) {
		if (!this.container.has(key)) {
			this.container.set(key, new constructor(...deps));
		}
		return this;
	}

	public getInstance<K extends keyof Container>(
		name: K,
	): InstanceType<Container[K]> {
		if (!this.container.has(name)) {
			throw new Error(`Dependency ${name as string} not found`);
		}
		return this.container.get(name)!;
	}
}
