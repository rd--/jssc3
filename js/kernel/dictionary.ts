export type Dictionary<T> = Record<string, T>;

export function isDictionary<T>(aValue: unknown): aValue is Dictionary<T> {
	return (typeof aValue) == 'object';
}

export function dictionaryNew<T>(): Dictionary<T> {
	return {};
}

export function dictionaryAt<T>(aDictionary: Dictionary<T>, aKey: string): T {
	return aDictionary[aKey];
}

export function dictionaryPut<T>(aDictionary: Dictionary<T>, aKey: string, aValue: T): void {
	aDictionary[aKey] = aValue;
}

export function dictionaryHasKey<T>(aDictionary: Dictionary<T>, aKey: string): boolean {
	return aDictionary[aKey] !== undefined;
}

// Copy all entries from sourceDictionary to destinationDictionary.
export function dictionaryCopyAllFromTo<T>(sourceDictionary: Dictionary<T>, destinationDictionary: Dictionary<T>): void {
	Object.entries(sourceDictionary).forEach(([key, value]) => destinationDictionary[key] = value);
}

// Find key at aDictionary that holds aValue.
export function dictionaryFindKeyOfValue<T>(aDictionary: Dictionary<T>, aValue: T): string | undefined {
	const predicateFunction: (aKey: string) => boolean = function(aKey) {
		return aDictionary[aKey] === aValue;
	};
	return Object.keys(aDictionary).find(predicateFunction);
}

// Make a new dictionary having only the indicated fields copied from the input.
// dictionaryCopyKeys({a: 1, b: 2, c: 3}, ['a', 'c']) //= {a: 1, c: 3}
export function dictionaryCopyKeys<T>(aDictionary: Dictionary<T>, keysArray: string[]): Dictionary<T> {
	const answer = dictionaryNew<T>();
	keysArray.forEach(key => answer[key] = aDictionary[key]);
	return answer;
}
