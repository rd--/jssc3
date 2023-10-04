import { setter_for_inner_html_of } from '../kernel/dom.ts'

import { Counter, counterNew } from '../stdlib/counter.ts'
import { OscMessage, OscPacket, encodeOscMessage, encodeOscBundle } from '../stdlib/opensoundcontrol.ts'

import { encodeUgen } from './graph.ts'
import { wrapOut } from './pseudo.ts'
import { ScSynthOptions } from './scsynth-options.ts'
import { c_setn1, d_recv, d_recv_then, g_freeAll, g_new, kAddToTail, m_dumpOsc, m_notify, m_status, ScSynthStatus, defaultScSynthStatus, s_new } from './servercommand.ts'
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
	readyState: string; // connecting connected disconnected
	hasIoUgens: boolean;
	synthPort: number;
	status: ScSynthStatus;
	constructor(options: ScSynthOptions, boot: StartSynth, sendOsc: SendOsc) {
		this.options = options
		this.boot = boot;
		this.sendOsc = sendOsc;
		this.oscListeners = new Map();
		this.readyState = 'disconnected';
		this.synthPort = 57110;
		this.hasIoUgens = false;
		this.status = defaultScSynthStatus;
	}
}

declare global {
	var globalScSynth: ScSynth;
}

const synthdefCounter: Counter = counterNew();

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
			if(scSynth.readState == 'connected') {
				setText(scSynth.status.ugenCount.toString());
			} else {
				setText(nilText);
			}
	});
}

export function scSynthEnsure(scSynth: ScSynth, activity: () => void) {
	switch(scSynth.readyState) {
		case 'connected':
			// console.debug('scSynthEnsure: connected, do activity');
			activity();
			break;
		case 'connecting':
			console.log('scSynthEnsure: connecting, schedule activity');
			setTimeout(() => scSynthEnsure(scSynth, activity), 1000);
			break;
		case 'disconnected':
			console.log('scSynthEnsure: disconnected, start and schedule activity');
			if(scSynth.boot) {
				scSynth.boot();
				setTimeout(() => scSynthEnsure(scSynth, activity), 1000);
			} else {
				console.log('scSynthEnsure: cannot start scsynth');
			}
			break;
		default:
			console.log('scSynthEnsure: unknown readyState', scSynth.readyState);
	}
}

export function playSynDefAt(scSynth: ScSynth, synDefName: string, synDefData: Uint8Array, nodeId: number, groupId: number, parameterArray: [string, number][], systemTimeInSeconds: number | null): void {
	if(systemTimeInSeconds == null) {
		scSynth.sendOsc(d_recv_then(synDefData, encodeOscMessage(s_new(synDefName, nodeId, kAddToTail, groupId, parameterArray))));
	} else {
		const unixTimeInMilliseconds = performance.timeOrigin + (systemTimeInSeconds * 1000);
		scSynth.sendOsc(d_recv_then(synDefData, encodeOscBundle({
			timeTag: {native: unixTimeInMilliseconds},
			packets: [s_new(synDefName, nodeId, kAddToTail, groupId, parameterArray)]
		})));
	}
}

export function playUgenAt(scSynth: ScSynth, ugenGraph: Signal, nodeId: number, groupId: number, parameterArray: [string, number][], systemTimeInSeconds: number | null): void {
	const synDefName = 'anonymous_' + synthdefCounter();
	const synDefData = encodeUgen(synDefName, wrapOut(0, ugenGraph));
	playSynDefAt(scSynth, synDefName, synDefData, nodeId, groupId, parameterArray, systemTimeInSeconds);
}

export function playProcedureAt(scSynth: ScSynth, ugenFunction: () => Signal, nodeId: number, groupId: number, systemTimeInSeconds: number | null): void {
	playUgenAt(scSynth, ugenFunction(), nodeId, groupId, [], systemTimeInSeconds);
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
	if(scSynth.readyState == 'connected') {
		scSynth.sendOsc(c_setn1(15001 + (n * 10), [w, x, y]));
	}
}
