export function consoleDebug(text: string): void {
	console.debug(text);
}

export function consoleWarn(text: string): void {
	console.warn(text);
}

export function consoleError(text: string): void {
	console.error(text);
}

export function throwError(text: string): void {
	console.error(text);
	throw (Error(text));
}

export function consoleLog(text: string): void {
	console.log(text);
}

export function consoleLogMessageFrom(from: string, text: string): void {
	console.log(`${from}: ${text}`);
}

export function logErrorAndReturn<T>(
	fromWhere: string,
	reason: string,
	defaultValue: T,
): T {
	console.error(`${fromWhere}: ${reason}`);
	return defaultValue;
}
