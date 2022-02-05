'use strict';

// encode and send opensoundcontrol message to sc3_websocket
function sc3_websocket_send_osc(msg) {
    sc3_websocket_send(osc.writePacket(msg));
}

// encode and play ugen
function play(u) {
    var g = new Graph('sc3.js', Out(0, u));
    var d = g.encodeSyndef();
    console.log('play: scsyndef #', d.length);
    sc3_websocket_send_osc(d_recv_then(d, osc.writePacket(s_new0('sc3.js', -1, 1, 1))));
}

// free all
function reset() {
    sc3_websocket_send_osc(g_freeAll1(1));
}
