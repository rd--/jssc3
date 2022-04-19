var sc3_debug: boolean = false;

function consoleDebug(...args: any[]): void {
    if(sc3_debug) {
        console.debug(...args);
    }
}

