export type ScSynthWasmModule = Record<string, any>;

export function initScSynthWasmModule(
	scSynthModule: ScSynthWasmModule,
	logFunction: (msg: string) => void,
) {
	scSynthModule.preRun = [];
	scSynthModule.postRun = [];
	scSynthModule.print = function (text: string): void {
		logFunction(`wasm/print:  ${text}`);
	};
	scSynthModule.printErr = function (text: string): void {
		logFunction(`wasm/error: ${text}`);
	};
	scSynthModule.totalDependencies = 0;
	scSynthModule.monitorRunDependencies = function (left: number) {
		logFunction(`wasm/monitorRunDependencies: # ${String(left)}`);
	};
	scSynthModule.onRuntimeInitialized = function () {
		logFunction('wasm/onRuntimeInitialized: ...');
	};
}
