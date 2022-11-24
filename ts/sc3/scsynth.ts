import { encodeUgen } from './graph.ts'
import { wrapOut } from './pseudo.ts'
import { ScsynthOptions } from './scsynth-options.ts'
import { ScsynthStatus } from './scsynth-status.ts'
import { ServerMessage, ServerPacket, c_setn1, d_recv_then, decodeServerMessage, encodeServerMessage, encodeServerPacket, g_freeAll1, kAddToTail, m_dumpOsc, m_notify, m_status, s_new0 } from './servercommand.ts'
import { Signal } from './ugen.ts'

type StartSynth = () => void;
type SendOsc = (oscPacket: ServerPacket) => void;
type MonitorDisplay = (text: string) => void;

export class Scsynth {
	options: ScsynthOptions;
	boot: StartSynth;
	sendOsc: SendOsc;
	monitorDisplay: (text: string) => void;
	isAlive: boolean;
	synthPort: number;
	langPort: number;
	status: ScsynthStatus;
	constructor(options: ScsynthOptions, boot: StartSynth, sendOsc: SendOsc, monitorDisplay: MonitorDisplay) {
		this.options = options
		this.boot = boot;
		this.sendOsc = sendOsc;
		this.monitorDisplay = monitorDisplay;
		this.isAlive = false;
		this.synthPort = 57110;
		this.langPort = 57120;
		this.status = {ugenCount: 0};
	}
}

export function playSyndef(scsynth: Scsynth, syndefName: string, syndefData: Uint8Array, groupId: number): void {
	console.log('playSyndef #', syndefData.length);
	scsynth.sendOsc(d_recv_then(syndefData, encodeServerMessage(s_new0(syndefName, -1, kAddToTail, groupId))));
}

export function playUgen(scsynth: Scsynth, ugenGraph: Signal, groupId: number): void {
	const syndefName = 'anonymous';
	const syndef = encodeUgen(syndefName, wrapOut(0, ugenGraph));
	playSyndef(scsynth, syndefName, syndef, groupId);
}

export function playProcedure(scsynth: Scsynth, ugenFunction: () => Signal, groupId: number): void {
	playUgen(scsynth, ugenFunction(), groupId);
}

export function resetScsynth(scsynth: Scsynth): void {
	scsynth.sendOsc(g_freeAll1(0));
}

export function requestStatus(scsynth: Scsynth): void {
	scsynth.sendOsc(m_status);
}

export function requestNotifications(scsynth: Scsynth): void {
	scsynth.sendOsc(m_notify(1, 1));
}

export function requestPrintingOsc(scsynth: Scsynth): void {
	scsynth.sendOsc(m_dumpOsc(1));
}

export function setPointerControls(scsynth: Scsynth, n: number, w: number, x: number, y: number): void {
	if(scsynth.isAlive) {
		scsynth.sendOsc(c_setn1(15001 + (n * 10), [w, x, y]));
	}
}
