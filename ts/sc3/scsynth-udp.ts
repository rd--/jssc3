import { udpSendToAddr } from '../kernel/udp.ts'
import { OscPacket, encodeOscPacket } from '../stdlib/opensoundcontrol.ts'

import { ScSynth } from './scsynth.ts'
import { scSynthDefaultOptions } from './scsynth-options.ts'

type ScSynthUdp = Deno.NetAddr;

export const defaultScSynthUdp: ScSynthUdp = {
	transport: "udp",
	hostname: "127.0.0.1",
	port: 57110
};

export function sendOscUdp(scSynthUdp: ScSynthUdp, oscPacket: OscPacket): void {
	// console.debug(`sendOsc: ${oscPacket}`);
	udpSendToAddr(scSynthUdp, encodeOscPacket(oscPacket));
}

export function scSynthUdp(scSynthUdp: ScSynthUdp): ScSynth {
	const scSynth = new ScSynth(
		scSynthDefaultOptions,
		() => console.log(`scSynthUdp: cannot start remote synthesiser`),
		(oscPacket) => sendOscUdp(scSynthUdp, oscPacket),
	);
	scSynth.readyState = 'connected';
	scSynth.hasIoUgens = true;
	return scSynth;
}
