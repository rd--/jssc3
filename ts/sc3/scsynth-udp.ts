import { consoleDebug } from '../kernel/error.ts'
import { udpSendToAddr } from '../kernel/udp.ts'

import { Scsynth } from './scsynth.ts'
import { scsynthDefaultOptions } from './scsynth-options.ts'
import { ServerPacket, encodeServerPacket } from './servercommand.ts'

type ScsynthUdp = Deno.NetAddr;

export const defaultScsynthUdp: ScsynthUdp = {
	transport: "udp",
	hostname: "127.0.0.1",
	port: 57110
};

export function sendOscUdp(scsynthUdp: ScsynthUdp, oscPacket: ServerPacket): void {
	consoleDebug(`sendOsc: ${oscPacket}`);
	udpSendToAddr(scsynthUdp, encodeServerPacket(oscPacket));
}

export function scsynthUdp(scsynthUdp: ScsynthUdp): Scsynth {
	const scsynth = new Scsynth(
		scsynthDefaultOptions,
		() => console.log(`scsynthUdp: cannot start remote synthesiser`),
		(oscPacket) => sendOscUdp(scsynthUdp, oscPacket),
		(aString) => console.log(`scsynthUdp: ${aString}`)
	);
	scsynth.isAlive = true;
	return scsynth;
}
