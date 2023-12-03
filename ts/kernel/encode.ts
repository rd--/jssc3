export function encodeUsing(
	byteCount: number,
	writerFunction: (x: DataView) => void,
): Uint8Array {
	const arrayBuffer = new ArrayBuffer(byteCount);
	writerFunction(new DataView(arrayBuffer));
	return new Uint8Array(arrayBuffer);
}

export function encodeUint8(aNumber: number): Uint8Array {
	return encodeUsing(1, (b) => b.setUint8(0, aNumber));
}

export function encodeInt8(aNumber: number): Uint8Array {
	return encodeUsing(1, (b) => b.setInt8(0, aNumber));
}

export function encodeInt16(aNumber: number): Uint8Array {
	return encodeUsing(2, (b) => b.setInt16(0, aNumber, false));
}

export function encodeInt32(aNumber: number): Uint8Array {
	return encodeUsing(4, (b) => b.setInt32(0, aNumber, false));
}

// encodeFloat32(1.0, false) //= [63, 128, 0, 0]
export function encodeFloat32(
	aNumber: number,
	litteEndian: boolean,
): Uint8Array {
	return encodeUsing(4, (b) => b.setFloat32(0, aNumber, litteEndian));
}

export function encodeFloat32Array(
	inputArray: Float32Array,
	litteEndian: boolean,
): Uint8Array {
	const arrayBuffer = new ArrayBuffer(inputArray.length * 4);
	const dataView = new DataView(arrayBuffer);
	for (let i = 0; i < inputArray.length; i++) {
		dataView.setFloat32(i * 4, inputArray[i], litteEndian);
	}
	const uint8Array = new Uint8Array(arrayBuffer);
	return uint8Array;
}

// encodePascalString('string') //= [6, 115, 116, 114, 105, 110, 103]
export function encodePascalString(aString: string): Uint8Array {
	const uint8Array = new Uint8Array(aString.length + 1);
	uint8Array[0] = aString.length;
	for (let i = 1; i < aString.length + 1; i++) {
		uint8Array[i] = aString.charCodeAt(i - 1);
	}
	return uint8Array;
}
