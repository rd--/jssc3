/*
'Module' is the name of the global variable that scsynth-wasm-builds/ext/scsynth.js extends when it is loaded.
This module initialises the required fields before that script is loaded.
*/

import { consoleLogMessageFrom } from './sc3-error.js'
import { makeScsynthModule } from './sc3-scsynth-module.js'
import { scsynthDefaultOptions } from './sc3-scsynth-options.js'
import { setGlobalScsynth }from './sc3-scsynth.js'

export var Module = makeScsynthModule(consoleLogMessageFrom, function(_text) { return null; });

export function sc3_wasm_init(showStatus: (text: string) => void): void {
	setGlobalScsynth(makeScsynth(Module, scsynthDefaultOptions, showStatus));
	console.log('sc3_wasm_init: Module', Module);
	globalThis.onerror = function(event) {
		consoleLogMessageFrom('globalThis.onerror', String(event));
	};
}
