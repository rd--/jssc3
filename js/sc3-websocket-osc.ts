// sc3-websocket-osc.js

import { graphEncodeSyndef, makeGraph } from './sc3-graph.js'
import { wrapOut } from './sc3-pseudo.js'
import { ServerMessage, d_recv_then, g_freeAll1, kAddToTail, s_new0 } from './sc3-servercommand.js'
import { Signal } from './sc3-ugen.js'
import { sc3_websocket_send } from './sc3-websocket.js'

declare namespace osc {
	function writePacket(message: ServerMessage): Uint8Array;
}

// Encode and send OpenSoundControl message to sc3_websocket.
export function sc3_websocket_send_osc(msg: ServerMessage): void {
	sc3_websocket_send(osc.writePacket(msg));
}

// Encode and play Ugen.
export function playUgen(ugen: Signal): void {
	var graph = makeGraph('sc3.js', wrapOut(0, ugen));
	var syndef = graphEncodeSyndef(graph);
	console.log('play: scsyndef #', syndef.length);
	sc3_websocket_send_osc(d_recv_then(syndef, osc.writePacket(s_new0('sc3.js', -1, kAddToTail, 1))));
}

// Free all.
export function reset(): void {
	sc3_websocket_send_osc(g_freeAll1(1));
}
