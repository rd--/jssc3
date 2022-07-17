// sc3-websocket.ts

export function websocket_open(host: string, port: number): WebSocket | null {
	try {
		const ws_address = 'ws://' + host + ':' + Number(port).toString();
		return new WebSocket(ws_address);
	} catch(err) {
		console.error('websocket_open: ' + err);
		return null;
	}
}

// Prompt for websocket address (host and port) and call function on answer
export function websocket_address_dialog(receiveAddress: (host: string, port: number) => void): void {
	const reply = window.prompt('Set WebSocket address as Host:Port', 'localhost:9160');
	if(reply) {
		const [host, port] = reply.split(':');
		receiveAddress(host, Number(port));
	}
}

// If websocket is not null and is connected, send data.
export function websocket_send(websocket: WebSocket | null, data : string | ArrayBuffer) : void {
	if(websocket && websocket.readyState === 1) {
		websocket.send(data);
	} else {
		console.warn('websocket_send: websocket nil or not ready?');
	}
}

export function websocket_close(websocket: WebSocket | null) : void {
	if(websocket) {
		websocket.close();
	} else {
		console.warn('websocket_close: websocket nil?');
	}
}

export let sc3_websocket: WebSocket | null;

// Initialise WebSocket.  To send .stc to sclang as /eval message see 'blksc3 stc-to-osc'
export function sc3_websocket_init(host : string, port : number) : void {
	websocket_close(sc3_websocket);
	sc3_websocket = websocket_open(host, port);
}

export function sc3_websocket_dialog() : void {
	websocket_address_dialog(sc3_websocket_init);
}

export function sc3_websocket_send(data : string | ArrayBuffer) : void {
	websocket_send(sc3_websocket, data);
}
