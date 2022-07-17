// sc3-null.ts

export function isNull<T>(aValue : T) : boolean {
	return aValue === null;
}

export function isUndefined<T>(aValue : T) : boolean {
	return aValue === undefined;
}

// If inputValue is null or undefined log message and return defaultValue, else return inputValue
export function nullFix<T>(message : string, inputValue : (T | null | undefined), defaultValue : T) : T {
	if(isNull(inputValue) || isUndefined(inputValue)) {
		console.warn('nullFix', message, inputValue, defaultValue);
		return defaultValue;
	} else {
		return <T>inputValue;
	}
}
