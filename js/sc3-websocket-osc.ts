import { encodeUgen } from './sc3-graph.js'
import { wrapOut } from './sc3-pseudo.js'
import { ServerMessage, d_recv_then, encodeServerMessage, g_freeAll1, kAddToTail, s_new0 } from './sc3-servercommand.js'
import { Signal } from './sc3-ugen.js'
import { sc3_websocket_send } from './sc3-websocket-global.js'

// Encode and send OpenSoundControl message to sc3_websocket.
export function sc3_websocket_send_osc(msg: ServerMessage): void {
	sc3_websocket_send(encodeServerMessage(msg));
}

// Play Ugen.
export function playUgenWs(ugen: Signal): void {
	const name = 'sc3.js';
	const bus = 0;
	const syndef = encodeUgen(name, wrapOut(bus, ugen));
	console.log(`playUgen: scsyndef.length = ${syndef.length}`);
	sc3_websocket_send_osc(d_recv_then(syndef, encodeServerMessage(s_new0(name, -1, kAddToTail, 1))));
}

// Free all.
export function resetWs(): void {
	sc3_websocket_send_osc(g_freeAll1(1));
}
