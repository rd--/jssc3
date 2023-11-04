// Prompt for websocket address (host and port) and call function on answer
export function websocket_address_dialog(receiveAddress: (host: string, port: number) => void): void {
	const reply = window.prompt('Set WebSocket address as Host:Port', 'localhost:9160');
	if(reply) {
		const [host, port] = reply.split(':');
		receiveAddress(host, Number(port));
	}
}
