'use strict';

var scsynth_alive;
var scsynth_port;
var sclang_port;

function sendOsc(oscMessage) {
    // console.log('sendOsc', oscMessage);
    if(scsynth_alive && Module.oscDriver) {
        var port = Module.oscDriver[scsynth_port];
        var recv = port && port.receive;
        if(recv) {
            recv(sclang_port, osc.writePacket(oscMessage));
        } else {
            console.warn('sendOsc: recv?');
        }
    } else {
        console.warn('sendOsc: scsynth not running');
    }
}

function bootScsynth(numInputs, numOutputs, blockSize) {
    if(!scsynth_alive) {
        var args = Module['arguments'];
        args[args.indexOf('-i') + 1] = String(numInputs);
        args[args.indexOf('-o') + 1] = String(numOutputs);
        args.push('-w', '512'); // # wire buffers
        args.push('-Z', String(blockSize)); // audio driver block size (frames)
        args.push('-m', '32768'); // real time memory (Kb), total memory is fixed at scsynth/wasm compile time, see README_WASM
        Module.callMain(args);
        setTimeout(monitorOsc, 1000);
        setInterval(requestStatus, 1000);
        scsynth_alive = true;
    } else {
        console.log('bootScsynth: already running');
    }
}

function playSyndef(syndefName, syndefData) {
    console.log('playSyndef #', syndefData.length);
    sendOsc(d_recv_then(syndefData, osc.writePacket(s_new0(syndefName, -1, 1, 0))));
}

function playUgen(ugen) {
    var name = 'sc3.js';
    var graph = new Graph(name, Out(0, ugen));
    playSyndef(name, graph.encodeSyndef());
}

function play(ugenFunction) {
    playUgen(ugenFunction());
}

function reset() {
    sendOsc(g_freeAll1(0));
}

function monitorOsc() {
    Module.oscDriver[sclang_port] = {
        receive: function(addr, data) {
            var msg = osc.readPacket(data, {});
            if(msg.address === '/status.reply') {
                setStatusDisplay('# ' + msg.args[1]);
            } else if(msg.address === '/done') {
                console.log('/done', msg.args[0]);
            } else {
                console.log('monitorOsc', addr, JSON.stringify(msg, null, 4));
            }
        }
    };
}

function requestStatus() {
    sendOsc(m_status);
}

function requestNotifications() {
    sendOsc(m_notify(1, 1));
}

function requestPrintingOsc() {
    sendOsc(m_dumpOsc(1));
}

function setPointerControls(n, w, x, y) {
    if(scsynth_alive) {
        sendOsc(c_setn1(15001 + (n * 10), [w, x, y]));
    }
}

function sc3_wasm_init() {
    scsynth_alive = false;
    scsynth_port = 57110;
    sclang_port = 57120;
    window.onerror = function(event) {
        logMessageFrom('window.onerror', String(event));
    };
}
