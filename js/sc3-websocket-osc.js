'use strict';

function play(u) {
    var g = new Graph('sc3.js', Out(0, u));
    var d = g.encodeSyndef();
    console.log('play: scsyndef #', d.length);
    sc3_websocket.send(d_recv_then(d, osc.writePacket(s_new0('sc3.js', -1, 1, 1))));
}

function reset() {
    sc3_websocket.send(g_freeAll1(1));
}
