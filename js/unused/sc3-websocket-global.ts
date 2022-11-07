import { websocket_address_dialog, websocket_close, websocket_open, websocket_send } from './sc3-websocket.js'

export let sc3_websocket: WebSocket | null;

// Initialise WebSocket.  To send .stc to sclang as /eval message see 'blksc3 stc-to-osc'
export function sc3_websocket_init(host: string, port: number): void {
	websocket_close(sc3_websocket);
	sc3_websocket = websocket_open(host, port);
}

export function sc3_websocket_dialog(): void {
	websocket_address_dialog(sc3_websocket_init);
}

export function sc3_websocket_send(data: string | ArrayBuffer): void {
	websocket_send(sc3_websocket, data);
}
