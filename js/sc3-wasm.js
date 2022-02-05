'use strict';

var scsynth_alive = false;
var scsynth_block_size = 2048;

function sendOsc(oscMessage) {
    // console.log('sendOsc', oscMessage);
    if(scsynth_alive && Module.oscDriver) {
        var port = Module.oscDriver[57110];
        var recv = port && port.receive;
        if(recv) {
            recv(57120, osc.writePacket(oscMessage));
        } else {
            console.warn('sendOsc: recv?');
        }
    } else {
        console.warn('sendOsc: scsynth not running');
    }
}

function bootScsynth(numInputs, numOutputs) {
    var args = Module['arguments'];
    args[args.indexOf('-i') + 1] = String(numInputs);
    args[args.indexOf('-o') + 1] = String(numOutputs);
    args.push('-w', '512'); // # wire buffers
    args.push('-Z', String(scsynth_block_size)); // # audio driver block size
    // args.push('-m', '131072'); // fixed at scsynth/wasm compile time, see README_WASM
    Module.callMain(args);
    setTimeout(monitorOsc, 1000);
    setInterval(requestStatus, 1000);
    scsynth_alive = true;
}

function play(u) {
    var g = new Graph('sc3.js', Out(0, u));
    var d = g.encodeSyndef();
    console.log('play: scsyndef #', d.length);
    sendOsc(d_recv_then(d, osc.writePacket(s_new0('sc3.js', -1, 1, 0))));
}

function reset() {
    sendOsc(g_freeAll1(0));
}

function monitorOsc() {
    Module.oscDriver[57120] = {
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
    window.onerror = function(event) {
        logMessageFrom('window.onerror', String(event));
    };
}
