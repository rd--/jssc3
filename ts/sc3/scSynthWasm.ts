import {
	decodeOscMessage,
	encodeOscPacket,
	OscPacket,
} from '../stdlib/openSoundControl.ts';

import { ScSynth } from './scSynth.ts';
import { ScSynthWasmModule } from './scSynthWasmModule.ts';

export function scSynthUseWasm(
	scSynth: ScSynth,
	wasm: ScSynthWasmModule,
): void {
	if (scSynth.isConnected()) {
		throw Error('scSynthUseWasm: already connected');
	} else {
		scSynth.basicConnect = () =>
			Promise.resolve(wasmConnect(scSynth, wasm));
		scSynth.basicSendOsc = (oscPacket) =>
			wasmSendOsc(wasm, oscPacket);
	}
}

const langPort = 57120;
const synthPort = 57110;

function wasmConnect(scSynth: ScSynth, wasm: ScSynthWasmModule): void {
	// console.debug('wasm: connect', scSynth);
	const args = wasm['arguments'];
	args[args.indexOf('-i') + 1] = String(scSynth.options.numInputs);
	args[args.indexOf('-o') + 1] = String(scSynth.options.numOutputs);
	// -Z = audio driver block size (frames)
	args.push('-Z', String(scSynth.options.hardwareBufferSize));
	// -z = block size (for sample-rate of 48000, 48 gives blocks of 1ms)
	args.push('-z', String(scSynth.options.blockSize));
	// -w = wire buffer count
	args.push('-w', '512');
	// -m = Real time memory (Kb), total memory is fixed at compile time, see README_WASM
	args.push('-m', '32768');
	// console.debug('wasm: connect: callMain', args);
	wasm.callMain(args);
	// Note: Fix use of arbitary delay
	setTimeout(function () {
		// console.debug('wasm: oscDriver', wasm, langPort);
		wasm.oscDriver[langPort] = {
			receive: function (_unusedAddress: string, data: Uint8Array) {
				// console.debug('wasm: oscDriver: receive', address, data);
				scSynth.dispatchOscMessage(decodeOscMessage(data));
			},
		};
	}, 1000);
	scSynth.startStatusMonitor();
}

function wasmSendOsc(
	wasm: ScSynthWasmModule,
	oscPacket: OscPacket,
): void {
	// console.debug('wasm: sendOsc', oscPacket);
	if (wasm.oscDriver) {
		const port = wasm.oscDriver[synthPort];
		if (port && port.receive) {
			port.receive(langPort, encodeOscPacket(oscPacket));
		} else {
			console.error('wasm: sendOsc: no port or no receive?');
		}
	} else {
		console.error('wasm: sendOsc: no oscDriver?');
	}
}
