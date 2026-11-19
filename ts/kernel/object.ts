export function isObject(x: unknown): x is Record<string, unknown> {
	const typeString = typeof x;
	return typeString === 'function'
		|| (typeString === 'object' && !!x);
}

export function objectHasKey(
	x: Record<string, unknown>,
	k: string,
): boolean {
	return x[k] !== undefined;
}

export function objectCopyAllKeysFromTo(
	sourceObject: Record<string, unknown>,
	destinationObject: Record<string, unknown>,
): void {
	Object.keys(sourceObject).forEach(
		function (key) {
			destinationObject[key] = sourceObject[key];
		}
	);
}
