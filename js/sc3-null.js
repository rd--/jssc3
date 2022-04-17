'use strict';
function isNull(x) {
    return x === null;
}
function isUndefined(x) {
    return x === undefined;
}
// If inputValue is null or undefined log message and return defaultValue, else return inputValue
function nullFix(message, inputValue, defaultValue) {
    if (isNull(inputValue) || isUndefined(inputValue)) {
        console.warn('nullFix', message, inputValue, defaultValue);
        return defaultValue;
    }
    else {
        return inputValue;
    }
}
