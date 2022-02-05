'use strict';

function logMessageFrom(from, text) {
    console.log(from + ':', text);
}

var Module = {
    preRun: [],
    postRun: [],
    print: (function() {
        return function(text) {
            logMessageFrom('print', text);
        };
    })(),
    printErr: function(text) {
        logMessageFrom('error', text);
    },
    logMessageFrom: function(text) {
        logMessageFrom('status', text);
    },
    totalDependencies: 0,
    monitorRunDependencies: function(left) {
        logMessageFrom('monitorRunDependencies', '# ' + String(left));
        if(left > 0) {
            setStatusDisplay("Loading...");
        }
    },
    onRuntimeInitialized: function() {
        logMessageFrom('onRuntimeInitialized', '...');
        setStatusDisplay("--------");
    }
};

