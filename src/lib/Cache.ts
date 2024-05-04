export class Cache<T> {
	private cache = new Map<string, T>();

	public add(value: T) {
		this.set('value', value);

		return this;
	}

	public getValue() {
		return Array.from(this.cache.values())[0];
	}

	public isNotEmpty(): boolean {
		return this.cache.size > 0;
	}

	public invalidate() {
		this.cache.clear();
	}

	private set(key: string, value: T) {
		this.cache.set(key, value);
	}

	// private get(key: string) {
	// 	return this.cache.get(key);
	// }
}
