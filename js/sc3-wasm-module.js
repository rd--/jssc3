'use strict';

var Module = {
	preRun: [],
	postRun: [],
	print: (function() {
		return function(text) {
			consoleLogMessageFrom('print', text);
		};
	})(),
	printErr: function(text) {
		consoleLogMessageFrom('error', text);
	},
	consoleLogMessageFrom: function(text) {
		consoleLogMessageFrom('status', text);
	},
	totalDependencies: 0,
	monitorRunDependencies: function(left) {
		consoleLogMessageFrom('monitorRunDependencies', '# ' + String(left));
		if(left > 0) {
			setStatusDisplay("Loading...");
		}
	},
	onRuntimeInitialized: function() {
		consoleLogMessageFrom('onRuntimeInitialized', '...');
		setStatusDisplay("&nbsp;");
	}
};

