import { OscPacket, encodeOscPacket } from '../stdlib/openSoundControl.ts'

import { ScSynth, ReadyState } from './scSynth.ts'
import { scSynthDefaultOptions } from './scSynthOptions.ts'

export const defaultScSynthAddress: Deno.NetAddr = {
	transport: 'tcp',
	hostname: '127.0.0.1',
	port: 57110
};

export async function scSynthUseTcp(scSynth: ScSynth, address: Deno.ConnectOptions): Promise<void> {
	if(scSynth.isConnected()) {
		console.error('scSynthUseTcp: already connected');
	} else {
		const tcpConnection = await Deno.connect(address);
		const packetSizeArrayBuffer = new ArrayBuffer(4);
		const packetSizeDataView = new DataView(packetSizeArrayBuffer);
		const packetSizeArray = new Uint8Array(packetSizeArrayBuffer);
		scSynth.readyState = ReadyState.Connected;
		scSynth.basicSendOsc = function(oscPacket) {
			const byteArray = encodeOscPacket(oscPacket);
			packetSizeDataView.setUint32(0, byteArray.byteLength, false);
			tcpConnection.write(packetSizeArray);
			tcpConnection.write(byteArray);
		}
		scSynth.useIoUgens = true;
	}
}

export async function ScSynthTcp(address: Deno.ConnectOptions): Promise<ScSynth> {
	const scSynth = new ScSynth();
	await scSynthUseTcp(scSynth, address);
	return scSynth;
}
