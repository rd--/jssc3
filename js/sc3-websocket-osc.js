'use strict';

// Encode and send OpenSoundControl message to sc3_websocket.
function sc3_websocket_send_osc(msg) {
    sc3_websocket_send(osc.writePacket(msg));
}

// Encode and play Ugen.
function play(ugen) {
    var graph = Graph('sc3.js', wrapOut(0, ugen));
    var syndef = graphEncodeSyndef(graph);
    console.log('play: scsyndef #', syndef.length);
    sc3_websocket_send_osc(d_recv_then(syndef, osc.writePacket(s_new0('sc3.js', -1, kAddToTail, 1))));
}

// Free all.
function reset() {
    sc3_websocket_send_osc(g_freeAll1(1));
}
