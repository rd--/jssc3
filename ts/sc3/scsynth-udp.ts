import { udpSendToAddr } from '../kernel/udp.ts'
import { OscPacket, encodeOscPacket } from '../stdlib/opensoundcontrol.ts'

import { ScSynth, ReadyState } from './scsynth.ts'
import { scSynthDefaultOptions } from './scsynth-options.ts'

export const defaultScSynthAddress: Deno.NetAddr = {
	transport: "udp",
	hostname: "127.0.0.1",
	port: 57110
};

export function scSynthUseUdp(scSynth: ScSynth, address: Deno.NetAddr): void {
	scSynth.readyState = ReadyState.Connected;
	scSynth.basicSendOsc = (oscPacket) => udpSendToAddr(address, encodeOscPacket(oscPacket));
	scSynth.hasIoUgens = true;
}

export function sc3_udp_init(address: Deno.NetAddr): ScSynth {
	const scSynth = new ScSynth();
	scSynthUseUdp(scSynth, address);
	return scSynth;
}
