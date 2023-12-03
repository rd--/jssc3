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
		scSynth.basicConnect = () => basicConnect(scSynth, wasm);
		scSynth.basicSendOsc = (oscPacket) =>
			basicSendOsc(scSynth, wasm, oscPacket);
	}
}

const langPort = 57120;
const synthPort = 57110;

function basicConnect(scSynth: ScSynth, wasm: ScSynthWasmModule): void {
	// console.debug('wasm: connect', scSynth);
	const args = wasm['arguments'];
	args[args.indexOf('-i') + 1] = String(scSynth.options.numInputs);
	args[args.indexOf('-o') + 1] = String(scSynth.options.numOutputs);
	args.push('-Z', String(scSynth.options.hardwareBufferSize)); // audio driver block size (frames)
	args.push('-z', String(scSynth.options.blockSize)); // # block size (for sample-rate of 48000 gives blocks of 1ms)
	args.push('-w', '512'); // # wire buffers
	args.push('-m', '32768'); // real time memory (Kb), total memory is fixed at scSynth/wasm compile time, see README_WASM
	// console.debug('wasm: connect: callMain', args);
	wasm.callMain(args);
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

function basicSendOsc(
	_unusedScSynth: ScSynth,
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
