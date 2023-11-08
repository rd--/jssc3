import { TcpQueue } from '../kernel/tcp.ts'

import { osc } from '../../lib/scsynth-wasm-builds/lib/ext/osc.js'

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

/*
declare namespace osc {
  function readMessage(packet: Uint8Array, options: Record<string, unknown>): OscMessage;
  function writeMessage(message: OscMessage, options: Record<string, unknown>): Uint8Array;
  function writeBundle(bundle: OscBundle, options: Record<string, unknown>): Uint8Array;
  function writePacket(packet: OscPacket, options: Record<string, unknown>): Uint8Array;
}
*/

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

export class TcpMessageSize {
	arrayBuffer: ArrayBuffer;
	dataView: DataView;
	byteArray: Uint8Array;
	constructor() {
		this.arrayBuffer = new ArrayBuffer(4);
		this.dataView = new DataView(this.arrayBuffer);
		this.byteArray = new Uint8Array(this.arrayBuffer);
	}
	setSize(size: number) {
		this.dataView.setUint32(0, size, false);
	}
	getSize(): number {
		return this.dataView.getUint32(0, false);
	}
	async read(tcpSocket: Deno.TcpConn): Promise<number> {
		const bytesRead = await tcpSocket.read(this.byteArray) || 0;
		if(bytesRead != 4) {
			throw new Error(`MessageSizeReader.readTcp: read failed: ${bytesRead}`);
		} else {
			return this.getSize();
		}
	}
	enqueue(tcpQueue: TcpQueue, size: number): void {
		this.setSize(size);
		tcpQueue.addMessage(this.byteArray);
	}
}

export async function tcpOscPacketReader(
	tcpSocket: Deno.TcpConn,
	proc: (byteArray: Uint8Array) => void
): Promise<void> {
	const messageSize = new TcpMessageSize();
	const messageSizeLimit = 8388608;
	const readArray = new Uint8Array(messageSizeLimit);
	while(1) {
		const bytesToRead = await messageSize.read(tcpSocket);
		if(bytesToRead > messageSizeLimit) {
			throw new Error(`messageSize exceeds limit: ${bytesToRead}`);
		}
		const bytesRead = await tcpSocket.read(readArray) || 0;
		if(bytesRead < bytesToRead) {
			throw new Error(`bytesRead less than bytesToRead: ${bytesRead}, ${bytesToRead}`);
		} else if(bytesRead == bytesToRead){
			const messagePacket = readArray.slice(0, bytesRead);
			proc(messagePacket);
		} else {
			// Should handle this...
			throw new Error(`bytesRead greater than bytesToRead: ${bytesRead}, ${bytesToRead}`);
		}
	}
}

export async function tcpOscMessageReader(
	tcpSocket: Deno.TcpConn,
	proc: (message: OscMessage) => void
): Promise<void> {
	return tcpOscPacketReader(
		tcpSocket,
		(byteArray: Uint8Array) => proc(decodeOscMessage(byteArray))
	);
}
