export type ScSynthWasmModule = Record<string, any>;

export function initScSynthWasmModule(Module: ScSynthWasmModule, logFunction: (p: string, q: string) => void, displayFunction: (p: string) => void) {
	Module.preRun = [];
	Module.postRun = [];
	Module.print = function(text: string): void {
		logFunction('wasm/print', text);
	};
	Module.printErr = function(text: string): void {
		logFunction('wasm/error', text);
	};
	Module.totalDependencies = 0;
	Module.monitorRunDependencies = function(left: number) {
		logFunction('wasm/monitorRunDependencies', '# ' + String(left));
		if(left > 0) {
			displayFunction("Loading...");
		}
	};
	Module.onRuntimeInitialized = function() {
		logFunction('wasm/onRuntimeInitialized', '...');
		displayFunction("&nbsp;");
	};
}
