'use strict';

function setStatus(from, text) {
    var statusText = document.getElementById('statusText');
    if(statusText) {
            statusText.innerHTML = text;
    }
    console.log(from + ':', text);
}

var Module = {
    preRun: [],
    postRun: [],
    print: (function() {
        return function(text) {
            setStatus('print', text);
        };
    })(),
    printErr: function(text) {
        setStatus('error', text);
    },
    setStatus: function(text) {
        setStatus('status', text);
    },
    totalDependencies: 0,
    monitorRunDependencies: function(left) {
        setStatus('monitorRunDependencies', '# ' + String(left));
    },
    onRuntimeInitialized: function() {
        setStatus('onRuntimeInitialized', '...');
    }
};

window.onerror = function(event) {
    setStatus('window.onerror', String(event));
};
