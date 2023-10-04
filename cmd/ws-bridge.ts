const scSynthAddress: Deno.NetAddr = {
	transport: 'udp',
	hostname: '0.0.0.0',
	port: 57110
};
const bridgeUdpPort: number = 58110;
const bridgeWebSocketPort: number = 57110;

const udp: DatagramConn = Deno.listenDatagram({
	transport: 'udp',
	port: bridgeUdpPort
});

var webSocket: WebSocket | null = null;

const websocketServer = Deno.serve({ port: bridgeWebSocketPort }, (request) => {

	if(webSocket != null) {
		webSocket.close();
	}

	if (request.headers.get('upgrade') != 'websocket') {
		return new Response(null, { status: 501 });
	}

	const { socket, response } = Deno.upgradeWebSocket(request);

	webSocket = socket;

	webSocket.addEventListener('message', (event) => {
		udp.send(event.data, scSynthAddress).then(function(bytesSent: number) {
			if(event.data.byteLength != bytesSent) {
				console.error('udp.send', event.data.byteLength, bytesSent);
			}
		});
	});

	return response;

});

(async () => {
	for await (const [data, address] of udp) {
		if(webSocket != null) {
			webSocket.send(data);
		} else {
			console.error('webSocket is null');
		}
	}
})();
