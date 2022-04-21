// sc3-null.ts

export function isNull(x : any) : boolean {
    return x === null;
}

export function isUndefined(x : any) : boolean {
    return x === undefined;
}

// If inputValue is null or undefined log message and return defaultValue, else return inputValue
export function nullFix(message : string, inputValue : any, defaultValue : any) : any {
    if(isNull(inputValue) || isUndefined(inputValue)) {
        console.warn('nullFix', message, inputValue, defaultValue);
        return defaultValue;
    } else {
        return inputValue;
    }
}
