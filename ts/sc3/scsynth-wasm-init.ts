/*
'Module' is the name of the global variable that scsynth-wasm-builds/ext/scsynth.js extends when it is loaded.
This module initialises the required fields before that script is loaded.
*/

import { ScSynthWasmModule, initScSynthWasmModule } from './scsynth-wasm-module.ts'
import { ScSynth } from './scsynth.ts'
import { scSynthUseWasm } from './scsynth-wasm.ts'

declare global {
	var Module: ScSynthWasmModule;
}

if(globalThis.Module !== undefined) {
	initScSynthWasmModule(globalThis.Module, (text) => console.log(text));
}

export function ScSynthWasm(): ScSynth {
	const scSynth = new ScSynth();
	scSynthUseWasm(scSynth, globalThis.Module);
	return scSynth;
}
