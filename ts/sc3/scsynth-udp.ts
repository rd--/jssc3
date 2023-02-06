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

export function sendOscUdp(scsynthUdp: ScSynthUdp, oscPacket: ServerPacket): void {
	// console.debug(`sendOsc: ${oscPacket}`);
	udpSendToAddr(scsynthUdp, encodeServerPacket(oscPacket));
}

export function scsynthUdp(scsynthUdp: ScSynthUdp): ScSynth {
	const scsynth = new ScSynth(
		scSynthDefaultOptions,
		() => console.log(`scsynthUdp: cannot start remote synthesiser`),
		(oscPacket) => sendOscUdp(scsynthUdp, oscPacket),
		(aString) => console.log(`scsynthUdp: ${aString}`)
	);
	scsynth.isAlive = true;
	scsynth.hasIoUgens = true;
	return scsynth;
}
