import { encodeUgen } from './graph.ts'
import { wrapOut } from './pseudo.ts'
import { ServerMessage, ServerPacket, c_setn1, d_recv_then, decodeServerMessage, encodeServerMessage, encodeServerPacket, g_freeAll1, kAddToTail, m_dumpOsc, m_notify, m_status, s_new0 } from './servercommand.ts'
import { ScSynth, initGroupStructure } from './scsynth.ts'
import { ScSynthWasmModule } from './scsynth-wasm-module.ts'
import { ScSynthOptions, scSynthOptionsPrint } from './scsynth-options.ts'
import { ScSynthStatus } from './scsynth-status.ts'
import { Signal } from './ugen.ts'

export function scsynthWasm(options: ScSynthOptions, wasm: ScSynthWasmModule, status: (aString: string) => void): ScSynth {
	const scsynth: ScSynth = new ScSynth(
		options,
		() => bootScSynthWasm(scsynth, wasm),
		oscPacket => sendOscWasm(scsynth, wasm, oscPacket),
		status
	);
	return scsynth;
}

export function sendOscWasm(scsynth: ScSynth, wasm: ScSynthWasmModule, oscPacket: ServerPacket): void {
	// console.debug(`sendOscWasm: ${oscPacket}`);
	if((scsynth.isStarting || scsynth.isAlive) && wasm.oscDriver) {
		const port = wasm.oscDriver[scsynth.synthPort];
		const recv = port && port.receive;
		if(recv) {
			recv(scsynth.langPort, encodeServerPacket(oscPacket));
		} else {
			console.warn('sendOscWasm: recv?');
		}
	} else {
		console.warn('sendOscWasm: scsynth not running', scsynth.isStarting, scsynth.isAlive);
	}
}

export function bootScSynthWasm(scsynth: ScSynth, wasm: ScSynthWasmModule): void {
	scSynthOptionsPrint(scsynth.options);
	if(!scsynth.isAlive && !scsynth.isStarting) {
		const args = wasm['arguments'];
		args[args.indexOf('-i') + 1] = String(scsynth.options.numInputs);
		args[args.indexOf('-o') + 1] = String(scsynth.options.numOutputs);
		args.push('-Z', String(scsynth.options.hardwareBufferSize)); // audio driver block size (frames)
		args.push('-z', String(scsynth.options.blockSize)); // # block size (for sample-rate of 48000 gives blocks of 1ms)
		args.push('-w', '512'); // # wire buffers
		args.push('-m', '32768'); // real time memory (Kb), total memory is fixed at scsynth/wasm compile time, see README_WASM
		// console.debug('bootScSynthWasm: callMain');
		wasm.callMain(args);
		setTimeout(() => monitorOscWasm(scsynth, wasm), 1000);
		setInterval(() => sendOscWasm(scsynth, wasm, m_status), 1000);
		scsynth.isStarting = true;
	} else {
		console.log('bootScSynth: already running');
	}
}

function monitorOscWasm(scsynth: ScSynth, wasm: ScSynthWasmModule): void {
	// console.debug('monitorOscWasm');
	wasm.oscDriver[scsynth.langPort] = {
		receive: function(addr: string, data: Uint8Array) {
			if(scsynth.isStarting) {
				scsynth.isStarting = false;
				console.log('scsynth: starting completed');
			}
			if(!scsynth.isAlive) {
				scsynth.isAlive = true;
				initGroupStructure(scsynth);
			}
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
