/*
'Module' is the name of the global variable that scsynth-wasm-builds/ext/scsynth.js extends when it is loaded.
This module initialises the required fields before that script is loaded.
*/

import { consoleLogMessageFrom } from '../kernel/error.ts'

import { ScSynthWasmModule, initScSynthWasmModule } from './scsynth-wasm-module.ts'
import { scSynthDefaultOptions } from './scsynth-options.ts'
import { ScSynth } from './scsynth.ts'
import { scsynthWasm } from './scsynth-wasm.ts'

declare global {
	var Module: ScSynthWasmModule;
}

if(globalThis.Module !== undefined) {
	initScSynthWasmModule(globalThis.Module, consoleLogMessageFrom, function(_text: string) { return null; });
}

export function sc3_wasm_init(): void {
	globalThis.globalScSynth = scsynthWasm(scSynthDefaultOptions, globalThis.Module);
    // console.debug(`sc3_wasm_init: Module: ${globalThis.Module}`);
	globalThis.onerror = function(event) {
		consoleLogMessageFrom('globalThis.onerror', String(event));
	};
}
