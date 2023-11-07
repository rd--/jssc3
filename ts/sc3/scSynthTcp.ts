import * as tcp from '../kernel/tcp.ts'

import { OscPacket, encodeOscPacket, decodeOscMessage } from '../stdlib/openSoundControl.ts'

import { ScSynth, ReadyState } from './scSynth.ts'
import { scSynthDefaultOptions } from './scSynthOptions.ts'

export const defaultScSynthAddress: Deno.ConnectOptions = tcp.tcpAddress('127.0.0.1', 57110);

export async function scSynthUseTcp(scSynth: ScSynth, address: Deno.ConnectOptions): Promise<void> {
	if(scSynth.isConnected()) {
		console.error('scSynthUseTcp: already connected');
	} else {
		const tcpSocket = await Deno.connect(address);
		const tcpQueue = tcp.TcpQueue(tcpSocket);
		const packetSizeArrayBuffer = new ArrayBuffer(4);
		const packetSizeDataView = new DataView(packetSizeArrayBuffer);
		const packetSizeArray = new Uint8Array(packetSizeArrayBuffer);
		scSynth.readyState = ReadyState.Connected;
		scSynth.basicSendOsc = function(oscPacket) {
			const byteArray = encodeOscPacket(oscPacket);
			packetSizeDataView.setUint32(0, byteArray.byteLength, false);
			/* await */tcpQueue.addMessage(packetSizeArray);
			/* await */tcpQueue.addMessage(byteArray);
		}
		scSynth.useIoUgens = true;
		/*
		for await (const message of tcpConnection.readable) {
			console.log('tcp/read', message);
			scSynth.dispatchOscMessage(decodeOscMessage(message));
		}
		*/
	}
}

export async function ScSynthTcp(address: Deno.ConnectOptions): Promise<ScSynth> {
	const scSynth = new ScSynth();
	await scSynthUseTcp(scSynth, address);
	return scSynth;
}

/*

import * as scTcp from './sc3/scSynthTcp.ts'
const scSynth = await scTcp.ScSynthTcp(scTcp.defaultScSynthAddress);

*/
