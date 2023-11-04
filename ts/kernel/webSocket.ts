export function webSocketOpen(host: string, port: number): WebSocket | null {
	try {
		const wsAddress = `ws://${host}:${Number(port).toString()}`;
		return new WebSocket(wsAddress);
	} catch(error) {
		console.error(`webSocketOpen: error = ${error}`);
		return null;
	}
}

// If webSocket is not null and is connected, send data.
export function webSocketSend(webSocket: WebSocket | null, data: string | ArrayBuffer): void {
	if(webSocket && webSocket.readyState === 1) {
		webSocket.send(data);
	} else {
		console.warn('webSocketSend: webSocket nil or not ready?');
	}
}

export function webSocketSendString(webSocket: WebSocket, data: string): void {
	return webSocketSend(webSocket, data);
}

export function webSocketSendBinary(webSocket: WebSocket, data: ArrayBuffer): void {
	return webSocketSend(webSocket, data);
}

export function webSocketClose(webSocket: WebSocket | null): void {
	if(webSocket) {
		webSocket.close();
	} else {
		console.warn('webSocketClose: webSocket nil?');
	}
}
