'use strict';

function logMessage(from, text) {
    console.log(from + ':', text);
}

var Module = {
    preRun: [],
    postRun: [],
    print: (function() {
        return function(text) {
            logMessage('print', text);
        };
    })(),
    printErr: function(text) {
        logMessage('error', text);
    },
    logMessage: function(text) {
        logMessage('status', text);
    },
    totalDependencies: 0,
    monitorRunDependencies: function(left) {
        logMessage('monitorRunDependencies', '# ' + String(left));
    },
    onRuntimeInitialized: function() {
        logMessage('onRuntimeInitialized', '...');
    }
};

window.onerror = function(event) {
    logMessage('window.onerror', String(event));
};
