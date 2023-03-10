import { setter_for_inner_html_of } from '../kernel/dom.ts'
import { OscMessage, OscPacket, decodeOscMessage, encodeOscMessage, encodeOscPacket } from '../stdlib/opensoundcontrol.ts'

import { encodeUgen } from './graph.ts'
import { wrapOut } from './pseudo.ts'
import { ScSynthOptions } from './scsynth-options.ts'
import { c_setn1, d_recv_then, g_freeAll, g_new, kAddToTail, m_dumpOsc, m_notify, m_status, ScSynthStatus, s_new0 } from './servercommand.ts'
import { Signal } from './ugen.ts'

type StartSynth = () => void;
type SendOsc = (oscPacket: OscPacket) => void;
type MessageFunction = (message: OscMessage) => void;
type OscListeners = Map<string, Set<MessageFunction>>;

export class ScSynth {
	options: ScSynthOptions;
	boot: StartSynth;
	sendOsc: SendOsc;
	oscListeners: OscListeners;
	isAlive: boolean;
	isStarting: boolean;
	hasIoUgens: boolean;
	synthPort: number;
	langPort: number;
	status: ScSynthStatus;
	constructor(options: ScSynthOptions, boot: StartSynth, sendOsc: SendOsc) {
		this.options = options
		this.boot = boot;
		this.sendOsc = sendOsc;
		this.oscListeners = new Map();
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

export function scSynthAddOscListener(scSynth: ScSynth, address: string, handler: MessageFunction):void {
	if(scSynth.oscListeners.has(address)) {
		scSynth.oscListeners.get(address)!.add(handler);
	} else {
		scSynth.oscListeners.set(address, new Set([handler]));
	}
}

export function scSynthRemoveOscListener(scSynth: ScSynth, address: string, handler: MessageFunction):void {
		scSynth.oscListeners.get(address)!.delete(handler);
}

export function scSynthInitStatusTextListener(scSynth: ScSynth, nilText: string) {
	let setText = setter_for_inner_html_of('statusText');
	setInterval(function() {
			if(scSynth.isAlive) {
				setText(scSynth.status.ugenCount.toString());
			} else {
				setText(nilText);
			}
	});
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
	scSynth.sendOsc(d_recv_then(synDefData, encodeOscMessage(s_new0(synDefName, -1, kAddToTail, groupId))));
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
