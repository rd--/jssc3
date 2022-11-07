export type OscValue = number | string | Uint8Array;

export type OscData = {
	type: string,
	value: OscValue
};

export function oscData(oscType: string, oscValue: OscValue): OscData {
	return {type: oscType, value: oscValue};
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
