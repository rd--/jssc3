export type ScsynthModule = Record<string, any>;

export function makeScsynthModule(logFunction: (p: string, q: string) => void, displayFunction: (p: string) => void): ScsynthModule {
	return {
		preRun: [],
		postRun: [],
		print: function(text: string): void {
			logFunction('wasm/print', text);
		},
		printErr: function(text: string): void {
			logFunction('wasm/error', text);
		},
		totalDependencies: 0,
		monitorRunDependencies: function(left: number) {
			logFunction('wasm/monitorRunDependencies', '# ' + String(left));
			if(left > 0) {
				displayFunction("Loading...");
			}
		},
		onRuntimeInitialized: function() {
			logFunction('wasm/onRuntimeInitialized', '...');
			displayFunction("&nbsp;");
		}
	};
}
