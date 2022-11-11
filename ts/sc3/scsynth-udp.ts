import { consoleDebug } from '../kernel/error.ts'
import { udpSendToAddr } from '../kernel/udp.ts'

import { encodeUgen } from './graph.ts'
import { wrapOut } from './pseudo.ts'
import { ServerPacket, d_recv_then, encodeServerMessage, encodeServerPacket, g_freeAll1, kAddToTail, s_new0 } from './servercommand.ts'
import { Signal } from './ugen.ts'

type ScsynthUdp = Deno.NetAddr;

export const defaultScsynth: ScsynthUdp = { transport: "udp", hostname: "127.0.0.1", port: 57110 };

export function sendOscUdp(scsynth: ScsynthUdp, oscPacket: ServerPacket): void {
	consoleDebug(`sendOsc: ${oscPacket}`);
	udpSendToAddr(scsynth, encodeServerPacket(oscPacket));
}

export function playSyndefUdp(scsynth: ScsynthUdp, syndefName: string, syndefData: Uint8Array, groupId: number): void {
	sendOscUdp(scsynth, d_recv_then(syndefData, encodeServerMessage(s_new0(syndefName, -1, kAddToTail, groupId))));
}

export function playUgenUdp(scsynth: ScsynthUdp, ugenGraph: Signal): void {
	const syndefName = 'jssc3';
	const syndef = encodeUgen(syndefName, wrapOut(0, ugenGraph));
	playSyndefUdp(scsynth, syndefName, syndef, 1);
}

export function resetScsynthUdp(scsynth: ScsynthUdp): void {
	sendOscUdp(scsynth, g_freeAll1(0));
}
