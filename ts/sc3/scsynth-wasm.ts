import { OscMessage, OscPacket, decodeOscMessage, encodeOscMessage, encodeOscPacket } from '../stdlib/opensoundcontrol.ts'

import { encodeUgen } from './graph.ts'
import { wrapOut } from './pseudo.ts'
import { c_setn1, d_recv_then, g_freeAll1, kAddToTail, m_dumpOsc, m_notify, m_status, m_parseStatusReply, ScSynthStatus, s_new0 } from './servercommand.ts'
import { ScSynth, initGroupStructure } from './scsynth.ts'
import { ScSynthWasmModule } from './scsynth-wasm-module.ts'
import { ScSynthOptions, scSynthOptionsPrint } from './scsynth-options.ts'
import { Signal } from './ugen.ts'

export function scSynthWasm(options: ScSynthOptions, wasm: ScSynthWasmModule): ScSynth {
	const scSynth: ScSynth = new ScSynth(
		options,
		() => bootScSynthWasm(scSynth, wasm),
		oscPacket => sendOscWasm(scSynth, wasm, oscPacket)
	);
	return scSynth;
}

const langPort = 57120;

export function sendOscWasm(scSynth: ScSynth, wasm: ScSynthWasmModule, oscPacket: OscPacket): void {
	// console.debug(`sendOscWasm: ${oscPacket}`);
	if((scSynth.readyState == 'connecting' || scSynth.readyState == 'connected') && wasm.oscDriver) {
		const port = wasm.oscDriver[scSynth.synthPort];
		const recv = port && port.receive;
		if(recv) {
			recv(langPort, encodeOscPacket(oscPacket));
		} else {
			console.warn('sendOscWasm: recv?');
		}
	} else {
		console.warn('sendOscWasm: scSynth not connected', scSynth.readyState);
	}
}

export function bootScSynthWasm(scSynth: ScSynth, wasm: ScSynthWasmModule): void {
	scSynthOptionsPrint(scSynth.options);
	if(scSynth.readyState == 'disconnected') {
		const args = wasm['arguments'];
		args[args.indexOf('-i') + 1] = String(scSynth.options.numInputs);
		args[args.indexOf('-o') + 1] = String(scSynth.options.numOutputs);
		args.push('-Z', String(scSynth.options.hardwareBufferSize)); // audio driver block size (frames)
		args.push('-z', String(scSynth.options.blockSize)); // # block size (for sample-rate of 48000 gives blocks of 1ms)
		args.push('-w', '512'); // # wire buffers
		args.push('-m', '32768'); // real time memory (Kb), total memory is fixed at scSynth/wasm compile time, see README_WASM
		// console.debug('bootScSynthWasm: callMain');
		wasm.callMain(args);
		setTimeout(() => monitorOscWasm(scSynth, wasm), 1000);
		setInterval(() => sendOscWasm(scSynth, wasm, m_status), 1000);
		scSynth.readyState = 'connecting';
	} else {
		console.log('bootScSynth: already running');
	}
}

function monitorOscWasm(scSynth: ScSynth, wasm: ScSynthWasmModule): void {
	// console.debug('monitorOscWasm');
	wasm.oscDriver[langPort] = {
		receive: function(addr: string, data: Uint8Array) {
			if(scSynth.readyState != 'connected') {
				scSynth.readyState = 'connected';
				console.log('scSynth: connected');
				initGroupStructure(scSynth);
			}
			const msg = decodeOscMessage(data);
			scSynth.oscListeners.forEach(function(value, key) {
				if(msg.address === key) {
					value.forEach(function(handler) {
						handler(msg);
					});
				}
			});
			if(msg.address === '/status.reply') {
				m_parseStatusReply(msg, scSynth.status);
				// scSynth.monitorDisplay('# ' + ugenCount);
			} else if(msg.address === '/done') {
				console.log('/done', msg.args[0]);
			} else {
				console.log('monitorOsc', addr, JSON.stringify(msg, null, 4));
			}
		}
	};
}
