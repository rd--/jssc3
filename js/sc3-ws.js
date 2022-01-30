'use strict';

function defaultSc3Ws() {
    return new osc.WebSocketPort({
        url: "ws://localhost:9160",
        metadata: true
    });
}

var sc3 = defaultSc3Ws();

sc3.open();

function play(u) {
    var g = new Graph('sc3.js', Out(0, u));
    var d = g.encodeSyndef();
    console.log('play: scsyndef #', d.length);
    sc3.send(d_recv_then(d, osc.writePacket(s_new0('sc3.js', -1, 1, 1))));
}

function reset() {
    sc3.send(g_freeAll1(1));
}
