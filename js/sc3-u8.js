'use strict';
function isUint8Array(x) {
    return (x instanceof Uint8Array);
}
function uint8ArrayIntoArray(u8Array, numberArray) {
    u8Array.forEach(aNumber => numberArray.push(aNumber));
}
// Flatten a tree of Uint8Array to an array of U8
function flattenByteEncodingToArray(e, a) {
    if (isUint8Array(e)) {
        uint8ArrayIntoArray(e, a);
    }
    else if (Array.isArray(e)) {
        e.forEach(item => flattenByteEncodingToArray(item, a));
    }
    else {
        console.error("flattenByteEncodingTo?", e);
    }
}
function flattenByteEncoding(e) {
    var a = [];
    flattenByteEncodingToArray(e, a);
    return new Uint8Array(a);
}
