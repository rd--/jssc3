'use strict';

function sc3_wasm_init() {
	setGlobalScsynth(makeScsynth(Module, scsynthDefaultOptions, setStatusDisplay));
	console.log('sc3_wasm_init: Module', Module);
	window.onerror = function(event) {
		consoleLogMessageFrom('window.onerror', String(event));
	};
}
