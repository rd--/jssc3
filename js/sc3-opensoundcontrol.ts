// sc3-opensoundcontrol.ts

export type OscData = {
    type: string,
    value: number | string | Uint8Array
};

export function oscData(t: string, x: any): OscData {
    return {type: t, value: x};
}

export function oscInt32(x : number): OscData {
    return oscData('i', x);
}

export function oscFloat(x: number): OscData {
    return oscData('f', x);
}

export function oscString(x: string): OscData {
    return oscData('s', x);
}

export function oscBlob(x: Uint8Array): OscData {
    return oscData('b', x);
}
