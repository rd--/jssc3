'use strict';

function encodeUsing(k : number, f : (x : DataView) => void) : Uint8Array {
    var b = new ArrayBuffer(k);
    f(new DataView(b));
    return new Uint8Array(b);
}

function encodeUint8(aNumber : number) : Uint8Array {
    return encodeUsing(1, b => b.setUint8(0, aNumber));
}

function encodeInt8(aNumber : number) : Uint8Array {
    return encodeUsing(1, b => b.setInt8(0, aNumber));
}

function encodeInt16(aNumber : number) : Uint8Array {
    return encodeUsing(2, b => b.setInt16(0, aNumber));
}

function encodeInt32(aNumber : number) : Uint8Array {
    return encodeUsing(4, b => b.setInt32(0, aNumber));
}

// encodeFloat32(1.0) //= [63, 128, 0, 0]
function encodeFloat32(aNumber : number) : Uint8Array {
    return encodeUsing(4, b => b.setFloat32(0, aNumber));
}

function encodeFloat32Array(inputArray : number[]) : Uint8Array {
    var count = inputArray.length;
    var arrayBuffer = new ArrayBuffer(count * 4);
    var dataView = new DataView(arrayBuffer);
    for(var i = 0; i < count; i++ ) {
        dataView.setFloat32(i * 4, inputArray[i]);
    }
    var uint8Array = new Uint8Array(arrayBuffer);
    console.debug('encodeFloat32Array: inputArray', inputArray);
    console.debug('encodeFloat32Array: arrayBuffer', arrayBuffer);
    console.debug('encodeFloat32Array: uint8Array', uint8Array);
    return uint8Array;
}

// encodePascalString('string') //= [6, 115, 116, 114, 105, 110, 103]
function encodePascalString(aString : string) : Uint8Array {
    var k = aString.length;
    var e = new Uint8Array(k + 1);
    e[0] = k;
    for(var i = 1; i < k + 1; i++) {
        e[i] = aString.charCodeAt(i - 1);
    }
    return e;
}

var encode = {
    float32: encodeFloat32,
    float32Array: encodeFloat32Array,
    int16: encodeInt16,
    int32: encodeInt32,
    int8: encodeInt8,
    pascalString: encodePascalString,
    uint8: encodeUint8,
    using: encodeUsing
};

// export { encode };
