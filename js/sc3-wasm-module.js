/*
'Module' is the name of the global variable that scsynth-wasm-builds/ext/scsynth.js extends when it is loaded.
This file initialises required fields before that script is loaded.
*/

'use strict';

var Module = makeScsynthModule(consoleLogMessageFrom, setStatusDisplay);
