export function isObject(aValue: unknown): aValue is Record<string, unknown> {
	const typeString = typeof aValue;
	return typeString === 'function' || (typeString === 'object' && !!aValue);
}

export function objectHasKey(anObject: Record<string, unknown>, aKey: string): boolean {
	return anObject[aKey] !== undefined;
}
