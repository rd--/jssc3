export function isNull(aValue: unknown): aValue is null {
	return aValue === null;
}

export function isUndefined(aValue: unknown): aValue is undefined {
	return aValue === undefined;
}

// If inputValue is null or undefined log message and return defaultValue, else return inputValue
export function nullFix<T>(
	message: string,
	inputValue: T | null | undefined,
	defaultValue: T,
): T {
	if (isNull(inputValue) || isUndefined(inputValue)) {
		console.warn(
			`nullFix: ${message}: input = ${inputValue}, default = ${defaultValue}`,
		);
		return defaultValue;
	} else {
		return inputValue;
	}
}
