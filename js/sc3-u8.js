'use strict';

// * -> bool
function isUint8Array(x) {
    return (x instanceof Uint8Array);
}

// Flatten a tree of arrays of Uint8Array to an array if U8
function flattenByteEncodingToArray(e, a) {
    if(isUint8Array(e)) {
        e.forEach(item => a.push(item));
    } else if(Array.isArray(a)) {
        e.forEach(item => flattenByteEncodingToArray(item, a));
    } else {
        console.error("flattenByteEncodingTo", e);
    }
}

function flattenByteEncoding(e) {
    var a = []
    flattenByteEncodingToArray(e, a);
    return new Uint8Array(a);
}
