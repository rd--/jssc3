export function isObject(aValue: unknown): aValue is Record<string, unknown> {
	const typeString = typeof aValue;
	return typeString === 'function' || (typeString === 'object' && !!aValue);
}

export function objectHasKey(
	anObject: Record<string, unknown>,
	aKey: string,
): boolean {
	return anObject[aKey] !== undefined;
}

export function objectCopyAllKeysFromTo(
	sourceObject: Record<string, unknown>,
	destinationObject: Record<string, unknown>,
): void {
	Object.keys(sourceObject).forEach(function (key) {
		destinationObject[key] = sourceObject[key];
	});
}
