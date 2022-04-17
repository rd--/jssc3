'use strict';

function isUint8Array(x : any) : boolean {
    return (x instanceof Uint8Array);
}

// Flatten a tree of arrays of Uint8Array to an array of U8
function flattenByteEncodingToArray(e : Uint8Array | Uint8Array[], a : number[] ) : void {
    if(isUint8Array(e)) {
        e.forEach(item => a.push(item));
    } else if(Array.isArray(a)) {
        e.forEach(item => flattenByteEncodingToArray(item, a));
    } else {
        console.error("flattenByteEncodingTo", e);
    }
}

function flattenByteEncoding(e : Uint8Array | Uint8Array[] ) :  Uint8Array {
    var a = [];
    flattenByteEncodingToArray(e, a);
    return new Uint8Array(a);
}
