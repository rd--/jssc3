// Printing to the console is slow, even if debugging messages aren't displayed
export const sc3_debug = false;

export function consoleDebug(text: string): void {
	if(sc3_debug) {
		console.debug(text);
	}
}

export function consoleWarn(text: string): void {
	console.warn(text);
}

export function consoleError(text: string): void {
	console.error(text);
}

export function consoleLog(text: string): void {
	console.log(text);
}

export function consoleLogMessageFrom(from: string, text: string): void {
	console.log(`${from}: ${text}`);
}
