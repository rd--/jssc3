/*
'Module' is the name of the global variable that scsynth-wasm-builds/ext/scsynth.js extends when it is loaded.
This module initialises the required fields before that script is loaded.
*/

import { consoleLogMessageFrom } from '../kernel/error.js'

import { ScsynthModule, initScsynthModule } from './scsynth-module.js'
import { scsynthDefaultOptions } from './scsynth-options.js'
import { makeScsynth, setGlobalScsynth }from './scsynth.js'

declare global {
  var Module: ScsynthModule;
}

initScsynthModule(globalThis.Module, consoleLogMessageFrom, function(_text: string) { return null; });

export function sc3_wasm_init(showStatus: (text: string) => void): void {
	setGlobalScsynth(makeScsynth(globalThis.Module, scsynthDefaultOptions, showStatus));
	console.log('sc3_wasm_init: Module', globalThis.Module);
	globalThis.onerror = function(event) {
		consoleLogMessageFrom('globalThis.onerror', String(event));
	};
}
