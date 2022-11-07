export function websocket_open(host: string, port: number): WebSocket | null {
	try {
		const ws_address = `ws://${host}:${Number(port).toString()}`;
		return new WebSocket(ws_address);
	} catch(error) {
		console.error(`websocket_open: error = ${error}`);
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
export function websocket_send(websocket: WebSocket | null, data: string | ArrayBuffer): void {
	if(websocket && websocket.readyState === 1) {
		websocket.send(data);
	} else {
		console.warn('websocket_send: websocket nil or not ready?');
	}
}

export function websocket_send_string(websocket: WebSocket, data: string): void {
	return websocket_send(websocket, data);
}

export function websocket_send_binary(websocket: WebSocket, data: ArrayBuffer): void {
	return websocket_send(websocket, data);
}

export function websocket_close(websocket: WebSocket | null): void {
	if(websocket) {
		websocket.close();
	} else {
		console.warn('websocket_close: websocket nil?');
	}
}
