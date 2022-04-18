function encodeUsing(byteCount : number, writerFunction : (x : DataView) => void) : Uint8Array {
    var arrayBuffer = new ArrayBuffer(byteCount);
    writerFunction(new DataView(arrayBuffer));
    return new Uint8Array(arrayBuffer);
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
    var arrayBuffer = new ArrayBuffer(inputArray.length * 4);
    var dataView = new DataView(arrayBuffer);
    for(var i = 0; i < inputArray.length; i++ ) {
        dataView.setFloat32(i * 4, inputArray[i]);
    }
    var uint8Array = new Uint8Array(arrayBuffer);
    console.debug('encodeFloat32Array', inputArray, arrayBuffer, uint8Array);
    return uint8Array;
}

// encodePascalString('string') //= [6, 115, 116, 114, 105, 110, 103]
function encodePascalString(aString : string) : Uint8Array {
    var uint8Array = new Uint8Array(aString.length + 1);
    uint8Array[0] = aString.length;
    for(var i = 1; i < aString.length + 1; i++) {
        uint8Array[i] = aString.charCodeAt(i - 1);
    }
    return uint8Array;
}
