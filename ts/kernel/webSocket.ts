export function webSocket_open(host: string, port: number): WebSocket | null {
	try {
		const ws_address = `ws://${host}:${Number(port).toString()}`;
		return new WebSocket(ws_address);
	} catch(error) {
		console.error(`webSocket_open: error = ${error}`);
		return null;
	}
}

// If webSocket is not null and is connected, send data.
export function webSocket_send(webSocket: WebSocket | null, data: string | ArrayBuffer): void {
	if(webSocket && webSocket.readyState === 1) {
		webSocket.send(data);
	} else {
		console.warn('webSocket_send: webSocket nil or not ready?');
	}
}

export function webSocket_send_string(webSocket: WebSocket, data: string): void {
	return webSocket_send(webSocket, data);
}

export function webSocket_send_binary(webSocket: WebSocket, data: ArrayBuffer): void {
	return webSocket_send(webSocket, data);
}

export function webSocket_close(webSocket: WebSocket | null): void {
	if(webSocket) {
		webSocket.close();
	} else {
		console.warn('webSocket_close: webSocket nil?');
	}
}
