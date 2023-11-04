/*
import { osc } from '../../lib/scsynth-wasm-builds/lib/ext/osc.js'
*/

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
	timeTag: {native: number},
	packets: OscMessage[]
};

export type OscPacket = OscMessage | OscBundle;

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

declare namespace osc {
  function readMessage(packet: Uint8Array, options: Record<string, unknown>): OscMessage;
  function writeMessage(message: OscMessage, options: Record<string, unknown>): Uint8Array;
  function writeBundle(bundle: OscBundle, options: Record<string, unknown>): Uint8Array;
  function writePacket(packet: OscPacket, options: Record<string, unknown>): Uint8Array;
}

export function decodeOscMessage(message: Uint8Array): OscMessage {
	// https://github.com/colinbdclark/osc.js/issues/90
	return osc.readMessage(message, {metadata: true});
}

export function encodeOscMessage(message: OscMessage): Uint8Array {
	return osc.writeMessage(message, {metadata: true});
}

export function encodeOscBundle(bundle: OscBundle): Uint8Array {
	return osc.writeBundle(bundle, {metadata: true});
}

export function encodeOscPacket(packet: OscPacket): Uint8Array {
	// console.debug('encodeOscPacket', packet);
	return osc.writePacket(packet, {metadata: true});
}
