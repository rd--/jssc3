import { consoleDebug } from '../kernel/error.js'

import { encodeSignal } from './graph.js'
import { wrapOut } from './pseudo.js'
import { ServerMessage, ServerPacket, c_setn1, d_recv_then, decodeServerMessage, encodeServerMessage, encodeServerPacket, g_freeAll1, kAddToTail, m_dumpOsc, m_notify, m_status, s_new0 } from './servercommand.js'
import { ScsynthWasmModule } from './scsynth-wasm-module.js'
import { ScsynthOptions, scsynthOptionsPrint } from './scsynth-options.js'
import { ScsynthStatus } from './scsynth-status.js'
import { Signal } from './ugen.js'

export type ScsynthWasm = {
	wasm: ScsynthWasmModule,
	options: ScsynthOptions,
	isAlive: boolean,
	status: ScsynthStatus,
	port: number,
	sclangPort: number,
	monitorDisplay: (text: string) => void,
};

export function makeScsynth(scsynthWasmModule: ScsynthWasmModule, scsynthOptions: ScsynthOptions, monitorDisplay: (text: string) => void): ScsynthWasm {
	return {
		wasm: scsynthWasmModule,
		options: scsynthOptions,
		isAlive: false,
		status: {ugenCount: 0},
		port: 57110,
		sclangPort: 57120,
		monitorDisplay: monitorDisplay
	};
}

export function sendOsc(scsynth: ScsynthWasm, oscPacket: ServerPacket): void {
	consoleDebug(`sendOsc: ${oscPacket}`);
	if(scsynth.isAlive && scsynth.wasm.oscDriver) {
		const port = scsynth.wasm.oscDriver[scsynth.port];
		const recv = port && port.receive;
		if(recv) {
			recv(scsynth.sclangPort, encodeServerPacket(oscPacket));
		} else {
			console.warn('sendOsc: recv?');
		}
	} else {
		console.warn('sendOsc: scsynth not running');
	}
}

export function bootScsynth(scsynth: ScsynthWasm): void {
	scsynthOptionsPrint(scsynth.options);
	if(!scsynth.isAlive) {
		const args = scsynth.wasm['arguments'];
		args[args.indexOf('-i') + 1] = String(scsynth.options.numInputs);
		args[args.indexOf('-o') + 1] = String(scsynth.options.numOutputs);
		args.push('-Z', String(scsynth.options.hardwareBufferSize)); // audio driver block size (frames)
		args.push('-z', String(scsynth.options.blockSize)); // # block size (for sample-rate of 48000 gives blocks of 1ms)
		args.push('-w', '512'); // # wire buffers
		args.push('-m', '32768'); // real time memory (Kb), total memory is fixed at scsynth/wasm compile time, see README_WASM
		scsynth.wasm.callMain(args);
		setTimeout(() => monitorOsc(scsynth), 1000);
		setInterval(() => requestStatus(scsynth), 1000);
		scsynth.isAlive = true;
	} else {
		console.log('bootScsynth: already running');
	}
}

export function playSyndef(scsynth: ScsynthWasm, syndefName: string, syndefData: Uint8Array): void {
	console.log('playSyndef #', syndefData.length);
	sendOsc(scsynth, d_recv_then(syndefData, encodeServerMessage(s_new0(syndefName, -1, kAddToTail, 0))));
}

export function playUgen(scsynth: ScsynthWasm, ugen: Signal): void {
	const name = 'sc3.js';
	const syndef = encodeSignal(name, wrapOut(0, ugen));
	playSyndef(scsynth, name, syndef);
}

export function playProcedure(scsynth: ScsynthWasm, ugenFunction: () => Signal): void {
	playUgen(scsynth, ugenFunction());
}

export function resetScsynth(scsynth: ScsynthWasm): void {
	sendOsc(scsynth, g_freeAll1(0));
}

export function requestStatus(scsynth: ScsynthWasm): void {
	sendOsc(scsynth, m_status);
}

export function requestNotifications(scsynth: ScsynthWasm): void {
	sendOsc(scsynth, m_notify(1, 1));
}

export function requestPrintingOsc(scsynth: ScsynthWasm): void {
	sendOsc(scsynth, m_dumpOsc(1));
}

export function setPointerControls(scsynth: ScsynthWasm, n: number, w: number, x: number, y: number): void {
	if(scsynth.isAlive) {
		sendOsc(scsynth, c_setn1(15001 + (n * 10), [w, x, y]));
	}
}

function monitorOsc(scsynth: ScsynthWasm): void {
	scsynth.wasm.oscDriver[scsynth.sclangPort] = {
		receive: function(addr: string, data: Uint8Array) {
			const msg = decodeServerMessage(data);
			if(msg.address === '/status.reply') {
				const ugenCount = <number>msg.args[1].value;
				scsynth.status.ugenCount = ugenCount;
				scsynth.monitorDisplay('# ' + ugenCount);
			} else if(msg.address === '/done') {
				console.log('/done', msg.args[0]);
			} else {
				console.log('monitorOsc', addr, JSON.stringify(msg, null, 4));
			}
		}
	};
}
