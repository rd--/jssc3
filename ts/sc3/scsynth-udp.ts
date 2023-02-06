import { udpSendToAddr } from '../kernel/udp.ts'

import { ScSynth } from './scsynth.ts'
import { scSynthDefaultOptions } from './scsynth-options.ts'
import { ServerPacket, encodeServerPacket } from './servercommand.ts'

type ScSynthUdp = Deno.NetAddr;

export const defaultScSynthUdp: ScSynthUdp = {
	transport: "udp",
	hostname: "127.0.0.1",
	port: 57110
};

export function sendOscUdp(scSynthUdp: ScSynthUdp, oscPacket: ServerPacket): void {
	// console.debug(`sendOsc: ${oscPacket}`);
	udpSendToAddr(scSynthUdp, encodeServerPacket(oscPacket));
}

export function scSynthUdp(scSynthUdp: ScSynthUdp): ScSynth {
	const scSynth = new ScSynth(
		scSynthDefaultOptions,
		() => console.log(`scSynthUdp: cannot start remote synthesiser`),
		(oscPacket) => sendOscUdp(scSynthUdp, oscPacket),
		(aString) => console.log(`scSynthUdp: ${aString}`)
	);
	scSynth.isAlive = true;
	scSynth.hasIoUgens = true;
	return scSynth;
}
