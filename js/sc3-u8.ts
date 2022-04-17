'use strict';

function isUint8Array(x : any) : boolean {
    return (x instanceof Uint8Array);
}

function uint8ArrayIntoArray(u8Array : Uint8Array, numberArray : number[]) : void {
    u8Array.forEach(aNumber => numberArray.push(aNumber));
}

type Tree<T> = T | Tree<T>[];

// Flatten a tree of Uint8Array to an array of U8
function flattenByteEncodingToArray(e : Tree<Uint8Array>, a : number[] ) : void {
    if(isUint8Array(e)) {
        uint8ArrayIntoArray(<Uint8Array>e, a);
    } else if(Array.isArray(e)) {
        e.forEach(item => flattenByteEncodingToArray(item, a));
    } else {
        console.error("flattenByteEncodingTo?", e);
    }
}

function flattenByteEncoding(e : Tree<Uint8Array>) :  Uint8Array {
    var a : number[] = [];
    flattenByteEncodingToArray(e, a);
    return new Uint8Array(a);
}
