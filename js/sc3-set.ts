// sc3-set.ts

export function isSet<T>(aValue: (aValue: T) => boolean) {
	return aValue.toString() == '[object Set]';
}

export function setNew<T>(): Set<T> {
	return new Set();
}

export function setFromArray<T>(anArray: Array<T>): Set<T> {
	return new Set(anArray);
}

export function setAdd<T>(aSet: Set<T>, aValue: T): void {
	aSet.add(aValue);
}

export function setIncludes<T>(aSet: Set<T>, aValue: T): boolean {
	return aSet.has(aValue);
}

export function setAsArray<T>(aSet: Set<T>): Array<T> {
	return Array.from(aSet);
}
