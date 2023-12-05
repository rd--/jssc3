import * as tcp from '../kernel/tcp.ts';

import {
	encodeOscPacket,
	OscPacket,
	TcpMessageSize,
} from '../stdlib/openSoundControl.ts';

import { ScSynth, ReadyState } from './scSynth.ts';

export const defaultScSynthAddress: Deno.ConnectOptions = tcp.tcpAddress(
	'127.0.0.1',
	57110,
);

async function dispatchIncoming(
	_unusedScSynth: ScSynth,
	tcpSocket: Deno.TcpConn,
): Promise<void> {
	for await (const message of tcpSocket.readable) {
		const messageSize = (new DataView(message.buffer, 0, 4)).getUint32(
			0,
			false,
		);
		console.log(messageSize, message);
	}
}

async function tcpConnect(
	scSynth: ScSynth,
	hostname: string,
	port: number,
): Promise<void> {
	const address = tcp.tcpAddress(hostname, port);
	const tcpSocket = await Deno.connect(address);
	const tcpQueue = tcp.tcpQueueOn(tcpSocket);
	const writerPacketSize = new TcpMessageSize();
	scSynth.readyState = ReadyState.Connected;
	scSynth.basicSendOsc = function(oscPacket: OscPacket) {
		const byteArray = encodeOscPacket(oscPacket);
		writerPacketSize.enqueue(tcpQueue, byteArray.byteLength);
		tcpQueue.addMessage(byteArray);
	};
	scSynth.useIoUgens = true;
	dispatchIncoming(scSynth, tcpSocket);
}

export function scSynthUseTcp(
	scSynth: ScSynth,
	hostname: string,
	port: number,
): void {
	if (scSynth.isConnected()) {
		throw new Error('scSynthUseTcp: already connected');
	} else {
		scSynth.readyState = ReadyState.Disconnected;
		scSynth.basicConnect = () => tcpConnect(scSynth, hostname, port);
	}
}

export function ScSynthTcp(
	hostname: string,
	port: number,
): ScSynth {
	const scSynth = new ScSynth();
	scSynthUseTcp(scSynth, hostname, port);
	return scSynth;
}

/*

import * as scTcp from './sc3/scSynthTcp.ts'
const scSynth = await scTcp.ScSynthTcp(scTcp.defaultScSynthAddress);

*/
