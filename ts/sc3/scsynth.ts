import { encodeUgen } from './graph.ts'
import { wrapOut } from './pseudo.ts'
import { ScSynthOptions } from './scsynth-options.ts'
import { ScSynthStatus } from './scsynth-status.ts'
import { ServerMessage, ServerPacket, c_setn1, d_recv_then, decodeServerMessage, encodeServerMessage, encodeServerPacket, g_freeAll, g_new, kAddToTail, m_dumpOsc, m_notify, m_status, s_new0 } from './servercommand.ts'
import { Signal } from './ugen.ts'

type StartSynth = () => void;
type SendOsc = (oscPacket: ServerPacket) => void;
type MonitorDisplay = (text: string) => void;

export class ScSynth {
	options: ScSynthOptions;
	boot: StartSynth;
	sendOsc: SendOsc;
	monitorDisplay: (text: string) => void;
	isAlive: boolean;
	isStarting: boolean;
	hasIoUgens: boolean;
	synthPort: number;
	langPort: number;
	status: ScSynthStatus;
	constructor(options: ScSynthOptions, boot: StartSynth, sendOsc: SendOsc, monitorDisplay: MonitorDisplay) {
		this.options = options
		this.boot = boot;
		this.sendOsc = sendOsc;
		this.monitorDisplay = monitorDisplay;
		this.isAlive = false;
		this.isStarting = false;
		this.synthPort = 57110;
		this.langPort = 57120;
		this.hasIoUgens = false;
		this.status = {ugenCount: 0};
	}
}

declare global {
	var globalScSynth: ScSynth;
}

export function scSynthEnsure(scSynth: ScSynth, activity: () => void) {
	if(scSynth.isAlive) {
		// console.debug('scSynthEnsure: alive, do activity');
		activity();
	} else if(scSynth.isStarting) {
		console.log('scSynthEnsure: starting, schedule activity');
		setTimeout(() => scSynthEnsure(scSynth, activity), 1000);
	} else {
		console.log('scSynthEnsure: offline, start and schedule activity');
		scSynth.boot();
		setTimeout(() => scSynthEnsure(scSynth, activity), 1000);
	}
}

export function playSynDef(scSynth: ScSynth, synDefName: string, synDefData: Uint8Array, groupId: number): void {
	console.log('playSynDef #', synDefData.length);
	scSynth.sendOsc(d_recv_then(synDefData, encodeServerMessage(s_new0(synDefName, -1, kAddToTail, groupId))));
}

export function playUgen(scSynth: ScSynth, ugenGraph: Signal, groupId: number): void {
	const synDefName = 'anonymous';
	const synDef = encodeUgen(synDefName, wrapOut(0, ugenGraph));
	playSynDef(scSynth, synDefName, synDef, groupId);
}

export function playProcedure(scSynth: ScSynth, ugenFunction: () => Signal, groupId: number): void {
	playUgen(scSynth, ugenFunction(), groupId);
}

export function initGroupStructure(scSynth: ScSynth): void {
	scSynth.sendOsc(g_new([
		[1, kAddToTail, 0],
		[2, kAddToTail, 0]
	]));
}

export function resetScSynth(scSynth: ScSynth): void {
	scSynth.sendOsc(g_freeAll([1, 2]));
	initGroupStructure(scSynth);
}

export function requestStatus(scSynth: ScSynth): void {
	scSynth.sendOsc(m_status);
}

export function requestNotifications(scSynth: ScSynth): void {
	scSynth.sendOsc(m_notify(1, 1));
}

export function requestPrintingOsc(scSynth: ScSynth): void {
	scSynth.sendOsc(m_dumpOsc(1));
}

export function setPointerControls(scSynth: ScSynth, n: number, w: number, x: number, y: number): void {
	if(scSynth.isAlive) {
		scSynth.sendOsc(c_setn1(15001 + (n * 10), [w, x, y]));
	}
}
