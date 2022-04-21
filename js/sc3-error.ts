// Printing to to the console is slow, even if debugging messages aren't displayed
export var sc3_debug: boolean = false;

export function consoleDebug(...args: any[]): void {
    if(sc3_debug) {
        console.debug(...args);
    }
}

export function consoleWarn(...args: any[]): void {
    console.warn(...args);
}

export function consoleError(...args: any[]): void {
    console.error(...args);
}

export function consoleLog(...args: any[]): void {
    console.log(...args);
}

export function consoleLogMessageFrom(from: string, text: string): void {
    console.log(from + ': ', text);
}
