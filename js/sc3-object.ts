export function isObject(aValue: unknown): aValue is Record<string, unknown> {
	const type = typeof aValue;
	return type === 'function' || (type === 'object' && !!aValue);
}

export function objectHasKey(anObject: Record<string, unknown>, aKey: string): boolean {
	return anObject[aKey] !== undefined;
}
