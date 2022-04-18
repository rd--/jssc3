type OscData = {
    type: string,
    value: number | string | Uint8Array
};

function oscData(t: string, x: any): OscData {
    return {type: t, value: x};
}

function oscInt32(x : number): OscData {
    return oscData('i', x);
}

function oscFloat(x: number): OscData {
    return oscData('f', x);
}

function oscString(x: string): OscData {
    return oscData('s', x);
}

function oscBlob(x: Uint8Array): OscData {
    return oscData('b', x);
}
