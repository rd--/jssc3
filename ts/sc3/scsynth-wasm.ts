import { OscPacket, decodeOscMessage, encodeOscPacket } from '../stdlib/opensoundcontrol.ts'

import { ScSynth, ReadyState } from './scsynth.ts'
import { ScSynthWasmModule } from './scsynth-wasm-module.ts'

export function scSynthUseWasm(scSynth: ScSynth, wasm: ScSynthWasmModule): void {
	scSynth.connect = () => connect(scSynth, wasm);
	scSynth.sendOsc = (oscPacket) => sendOsc(scSynth, wasm, oscPacket);
	scSynth.hasIoUgens = false;
}

const langPort = 57120;
const synthPort = 57110;

function connect(scSynth: ScSynth, wasm: ScSynthWasmModule): void {
	// console.debug('wasm: connect', scSynth);
	if(scSynth.readyState == ReadyState.Disconnected) {
		const args = wasm['arguments'];
		args[args.indexOf('-i') + 1] = String(scSynth.options.numInputs);
		args[args.indexOf('-o') + 1] = String(scSynth.options.numOutputs);
		args.push('-Z', String(scSynth.options.hardwareBufferSize)); // audio driver block size (frames)
		args.push('-z', String(scSynth.options.blockSize)); // # block size (for sample-rate of 48000 gives blocks of 1ms)
		args.push('-w', '512'); // # wire buffers
		args.push('-m', '32768'); // real time memory (Kb), total memory is fixed at scSynth/wasm compile time, see README_WASM
		// console.debug('wasm: connect: callMain', args);
		wasm.callMain(args);
		setTimeout(function() {
			// console.debug('wasm: oscDriver', wasm, langPort);
			wasm.oscDriver[langPort] = {
				receive: function(address: string, data: Uint8Array) {
					// console.debug('wasm: oscDriver: receive', address, data);
					scSynth.dispatchOscMessage(decodeOscMessage(data));
				}
			};
		}, 1000);
		// console.debug('wasm: connect: startStatusMonitor');
		scSynth.startStatusMonitor();
		scSynth.readyState = ReadyState.Connecting;
	} else {
		console.log('wasm: connect: already connected');
	}
}

function sendOsc(scSynth: ScSynth, wasm: ScSynthWasmModule, oscPacket: OscPacket): void {
	// console.debug('wasm: sendOsc', oscPacket);
	if((scSynth.readyState != ReadyState.Disconnected) && wasm.oscDriver) {
		const port = wasm.oscDriver[synthPort];
		const recv = port && port.receive;
		if(recv) {
			recv(langPort, encodeOscPacket(oscPacket));
		} else {
			console.warn('wasm: sendOsc: recv?');
		}
	} else {
		console.warn('wasm: sendOsc: scSynth not connected', scSynth.readyState);
	}
}
