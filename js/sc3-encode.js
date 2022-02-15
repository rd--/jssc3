'use strict';

function encodeUsing(k, f) {
    var b = new ArrayBuffer(k);
    f(new DataView(b));
    return new Uint8Array(b);
}

function encodeUint8(number) {
    return encodeUsing(1, b => b.setUint8(0, number));
}

function encodeInt8(number) {
    return encodeUsing(1, b => b.setInt8(0, number));
}

function encodeInt16(number) {
    return encodeUsing(2, b => b.setInt16(0, number));
}

function encodeInt32(number) {
    return encodeUsing(4, b => b.setInt32(0, number));
}

// encodeFloat32(1.0) //=> [63, 128, 0, 0]
function encodeFloat32(number) {
    return encodeUsing(4, b => b.setFloat32(0, number));
}

function encodeFloat32Array(inputArray) {
    var count = inputArray.length;
    var arrayBuffer = new ArrayBuffer(count * 4);
    var dataView = new DataView(arrayBuffer);
    for(var i = 0; i < count; i++ ) {
        dataView.setFloat32(i * 4, inputArray[i]);
    }
    var uint8Array = new Uint8Array(arrayBuffer);
    // console.log('encodeFloat32Array: inputArray', inputArray);
    // console.log('encodeFloat32Array: arrayBuffer', arrayBuffer);
    // console.log('encodeFloat32Array: uint8Array', uint8Array);
    return uint8Array;
}

// encodePascalString('string') //=> [6, 115, 116, 114, 105, 110, 103]
function encodePascalString(string) {
    var k = string.length;
    var e = new Uint8Array(k + 1);
    e[0] = k;
    for(var i = 1; i < k + 1; i++) {
        e[i] = string.charCodeAt(i - 1);
    }
    return e;
}
