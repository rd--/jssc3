/*
'Module' is the name of the global variable that scsynth-wasm-builds/ext/scsynth.js extends when it is loaded.
This module initialises the required fields before that script is loaded.
*/

import { consoleDebug, consoleLogMessageFrom } from '../kernel/error.js'

import { ScsynthWasmModule, initScsynthWasmModule } from './scsynth-wasm-module.js'
import { scsynthDefaultOptions } from './scsynth-options.js'
import { ScsynthWasm, makeScsynth }from './scsynth-wasm.js'

declare global {
	var Module: ScsynthWasmModule;
	var globalScsynth: ScsynthWasm;
}

if(globalThis.Module !== undefined) {
	initScsynthWasmModule(globalThis.Module, consoleLogMessageFrom, function(_text: string) { return null; });
}

export function sc3_wasm_init(showStatus: (text: string) => void): void {
	globalThis.globalScsynth = makeScsynth(globalThis.Module, scsynthDefaultOptions, showStatus);
    consoleDebug(`sc3_wasm_init: Module: ${globalThis.Module}`);
	globalThis.onerror = function(event) {
		consoleLogMessageFrom('globalThis.onerror', String(event));
	};
}
