import * as tcp from '../kernel/tcp.ts'

import { OscPacket, encodeOscPacket, decodeOscMessage, TcpMessageSize } from '../stdlib/openSoundControl.ts'

import { ScSynth, ReadyState } from './scSynth.ts'
import { scSynthDefaultOptions } from './scSynthOptions.ts'

export const defaultScSynthAddress: Deno.ConnectOptions = tcp.tcpAddress('127.0.0.1', 57110);

async function dispatchIncoming(scSynth: ScSynth, tcpSocket: Deno.TcpConn): Promise<void> {
	for await (const message of tcpSocket.readable) {
		const messageSize = (new DataView(message.buffer, 0, 4)).getUint32(0, false);
		console.log(messageSize, message);
	}
}

export async function scSynthUseTcp(
	scSynth: ScSynth,
	hostname: string,
	port: number
): Promise<Deno.TcpConn> {
	if(scSynth.isConnected()) {
		throw new Error('scSynthUseTcp: already connected');
	} else {
		const address = tcp.tcpAddress(hostname, port);
		const tcpSocket = await Deno.connect(address);
		const tcpQueue = tcp.tcpQueueOn(tcpSocket);
		const writerPacketSize = new TcpMessageSize();
		scSynth.readyState = ReadyState.Connected;
		scSynth.basicSendOsc = function(oscPacket) {
			const byteArray = encodeOscPacket(oscPacket);
			writerPacketSize.enqueue(tcpQueue, byteArray.byteLength);
			tcpQueue.addMessage(byteArray);
		}
		scSynth.useIoUgens = true;
		return tcpSocket;
	}
}

export async function ScSynthTcp(
	hostname: string,
	port: number
): Promise<ScSynth> {
	const scSynth = new ScSynth();
	const tcpSocket = await scSynthUseTcp(scSynth, hostname, port);
	dispatchIncoming(scSynth, tcpSocket);
	return scSynth;
}

/*

import * as scTcp from './sc3/scSynthTcp.ts'
const scSynth = await scTcp.ScSynthTcp(scTcp.defaultScSynthAddress);

*/
