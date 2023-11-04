import { Counter, counterNew } from '../stdlib/counter.ts'
import { OscMessage, OscPacket, encodeOscMessage, encodeOscBundle } from '../stdlib/openSoundControl.ts'

import { encodeUgen } from './graph.ts'
import { wrapOut } from './pseudo.ts'
import { ScSynthOptions, scSynthDefaultOptions } from './scSynthOptions.ts'
import { c_setn1, d_recv, g_freeAll, g_new, kAddToTail, m_dumpOsc, m_notify, m_status, m_parseStatusReplyInto, ScSynthStatus, defaultScSynthStatus, s_new } from './serverCommand.ts'
import { Signal } from './ugen.ts'

type OscMessageFunction = (message: OscMessage) => void;
type OscListeners = Map<string, Set<OscMessageFunction>>;

export enum ReadyState {
	Connecting = 'Connecting',
	Connected = 'Connected',
	Disconnected = 'Disconnected'
};

/*
Model connection to ScSynth, which may be:
1. Wasm (Internal)
2. WebSocket (External)
3. Udp (Cli only, External)
The underlying connection sets basicConnect & basicSendOsc, and calls dispatchOscMessage.
*/
export class ScSynth {
	options: ScSynthOptions;
	basicConnect: () => void;
	basicSendOsc: (oscPacket: OscPacket) => void;
	oscListeners: OscListeners;
	readyState: ReadyState;
	useIoUgens: boolean;
	status: ScSynthStatus;
	statusMonitor: number | null;
	constructor() {
		this.options = scSynthDefaultOptions
		this.basicConnect = () => console.log('basicConnect: not initialized');
		this.basicSendOsc = (packet) => console.log('basicSendOsc: not initialized');
		this.oscListeners = new Map();
		this.readyState = ReadyState.Disconnected;
		this.useIoUgens = false; // true iff scSynth io ugens installed *and* instance is local
		this.status = defaultScSynthStatus;
		this.statusMonitor = null;
	}
	addOscListener(address: string, handler: OscMessageFunction):void {
		if(this.oscListeners.has(address)) {
			this.oscListeners.get(address)!.add(handler);
		} else {
			this.oscListeners.set(address, new Set([handler]));
		}
	}
	connect(): void {
		this.basicConnect();
		this.readyState = ReadyState.Connecting;
	}
	dispatchOscMessage(message: OscMessage): void {
		// console.debug('dispatchOscMessage', JSON.stringify(message, null, 4));
		if(this.readyState != ReadyState.Connected) {
			this.readyState = ReadyState.Connected;
			console.log('scSynth: connected');
			this.initGroupStructure();
		}
		this.oscListeners.forEach(function(value, key) {
			if(message.address === key) {
				value.forEach(function(handler) {
					handler(message);
				});
			}
		});
		if(message.address === '/status.reply') {
			m_parseStatusReplyInto(message, this.status);
		}
	}
	initGroupStructure(): void {
		this.sendOsc(g_new([
			[1, kAddToTail, 0],
			[2, kAddToTail, 0]
		]));
	}
	isConnected(): boolean {
		return (this.readyState == ReadyState.Connected);
	}
	playProcedureAt(ugenFunction: () => Signal, nodeId: number, groupId: number, systemTimeInSeconds: number | null): void {
		this.playUgenAt(ugenFunction(), nodeId, groupId, [], systemTimeInSeconds);
	}
	playSynDefAt(synDefName: string, synDefData: Uint8Array, nodeId: number, groupId: number, parameterArray: [string, number][], systemTimeInSeconds: number | null): void {
		this.whenConnected(() =>
			this.sendOsc(
				playSynDefAtMessage(synDefName, synDefData, nodeId, groupId, parameterArray, systemTimeInSeconds)
			)
	  );
	}
	playUgenAt(ugenGraph: Signal, nodeId: number, groupId: number, parameterArray: [string, number][], systemTimeInSeconds: number | null): void {
		const synDefName = 'anonymous_' + synthdefCounter();
		const synDefData = encodeUgen(synDefName, wrapOut(0, ugenGraph));
		this.playSynDefAt(synDefName, synDefData, nodeId, groupId, parameterArray, systemTimeInSeconds)
	}
	removeOscListener(address: string, handler: OscMessageFunction):void {
		this.oscListeners.get(address)!.delete(handler);
	}
	requestNotifications(): void {
		this.sendOsc(m_notify(1, 1));
	}
	requestPrintingOsc(): void {
		this.sendOsc(m_dumpOsc(1));
	}
	requestStatus(): void {
		// console.debug('requestStatus');
		this.sendOsc(m_status);
	}
	reset(): void {
		this.sendOsc(g_freeAll([1, 2]));
		this.initGroupStructure();
	}
	sendOsc(oscPacket: OscPacket): void {
		/* Note: do basicSend if Connecting.  Getting a reply signals that we are Connected. */
		if(this.readyState != ReadyState.Disconnected) {
			this.basicSendOsc(oscPacket);
		} else {
			console.warn('ScSynth.sendOsc: disconnected');
		}
	}
	startStatusMonitor(): void {
		if(this.statusMonitor == null) {
			this.statusMonitor = setInterval(() => this.requestStatus(), 1000);
		} else {
			console.error('ScSynth.startStatusMonitor: monitor started?');
		}
	}
	stopStatusMonitor(): void {
		if(this.statusMonitor != null) {
			clearInterval(this.statusMonitor);
			this.statusMonitor = null;
		}
	}
	whenConnected(activity: () => void) {
		switch(this.readyState) {
			case ReadyState.Connected:
				activity();
				break;
			case ReadyState.Connecting:
				console.log('ScSynth.whenConnected: connecting, schedule activity');
				setTimeout(() => this.whenConnected(activity), 1000);
				break;
			case ReadyState.Disconnected:
				console.log('ScSynth.whenConnected: disconnected, start and schedule activity');
				this.connect();
				setTimeout(() => this.whenConnected(activity), 1000);
				break;
			default:
				console.log('ScSynth.whenConnected: unknown readyState', this.readyState);
		}
	}
}

declare global {
	var globalScSynth: ScSynth;
}

const synthdefCounter: Counter = counterNew();

export function playSynDefAtMessage(synDefName: string, synDefData: Uint8Array, nodeId: number, groupId: number, parameterArray: [string, number][], systemTimeInSeconds: number | null): OscMessage {
	const sNew = s_new(synDefName, nodeId, kAddToTail, groupId, parameterArray);
	const completionMessage =
		(systemTimeInSeconds == null) ?
		encodeOscMessage(sNew) :
		encodeOscBundle({
			timeTag: {native: performance.timeOrigin + (systemTimeInSeconds * 1000)},
			packets: [sNew]
		});
	return d_recv(
		synDefData,
		completionMessage
	);
}

export function setPointerControls(scSynth: ScSynth, n: number, w: number, x: number, y: number): void {
	if(scSynth.isConnected() && !scSynth.useIoUgens) {
		scSynth.sendOsc(c_setn1(15001 + (n * 10), [w, x, y]));
	}
}
