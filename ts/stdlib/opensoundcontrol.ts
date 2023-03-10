export type OscValue = number | string | Uint8Array;

export type OscData = {
	type: string,
	value: OscValue
};

export type OscMessage = {
	address: string,
	args: OscData[]
};

export type OscBundle = {
	timeTag: number,
	packets: OscMessage[]
};

export type OscPacket = OscMessage | OscMessage;

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

// osc.js

declare namespace osc {
  function readPacket(packet: Uint8Array, options: Record<string, unknown>): OscPacket;
  function writePacket(message: OscPacket, options: Record<string, unknown>): Uint8Array;
}

export function decodeOscMessage(packet:  Uint8Array): OscMessage {
	// https://github.com/colinbdclark/osc.js/issues/90
	return osc.readPacket(packet, {metadata: true});
}

export function encodeOscPacket(packet:  OscPacket): Uint8Array {
	return osc.writePacket(packet, {metadata: true});
}

export function encodeOscMessage(message:  OscMessage): Uint8Array {
	return osc.writePacket(message, {metadata: true});
}
