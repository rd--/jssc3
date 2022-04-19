// Printing to to the console is slow, even if debugging messages aren't displayed
var sc3_debug: boolean = false;

function consoleDebug(...args: any[]): void {
    if(sc3_debug) {
        console.debug(...args);
    }
}

function consoleError(...args: any[]): void {
    console.error(...args);
}