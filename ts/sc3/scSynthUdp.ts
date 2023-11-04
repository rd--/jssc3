import { udpSendToAddr } from '../kernel/udp.ts'
import { OscPacket, encodeOscPacket } from '../stdlib/openSoundControl.ts'

import { ScSynth, ReadyState } from './scSynth.ts'
import { scSynthDefaultOptions } from './scSynthOptions.ts'

export const defaultScSynthAddress: Deno.NetAddr = {
	transport: 'udp',
	hostname: '127.0.0.1',
	port: 57110
};

export function scSynthUseUdp(scSynth: ScSynth, address: Deno.NetAddr): void {
	if(scSynth.isConnected()) {
		console.error('scSynthUseUdp: already connected');
	} else {
		scSynth.readyState = ReadyState.Connected;
		scSynth.basicSendOsc = (oscPacket) => udpSendToAddr(address, encodeOscPacket(oscPacket));
		scSynth.useIoUgens = true;
	}
}

export function ScSynthUdp(address: Deno.NetAddr): ScSynth {
	const scSynth = new ScSynth();
	scSynthUseUdp(scSynth, address);
	return scSynth;
}
