// deno run --unstable --allow-net --allow-read --allow-write ws-bridge.ts

const scSynthUdpPort: number = 57110;
const scSynthAddress: Deno.NetAddr = {
	transport: 'udp',
	hostname: '0.0.0.0',
	port: scSynthUdpPort
};
const bridgeUdpPort: number = 58110;
const bridgeWebSocketPort: number = 57110;
var webSocket: WebSocket | null = null;

const udp: DatagramConn = Deno.listenDatagram({
	transport: 'udp',
	port: bridgeUdpPort
});

// console.log('listenDatagram', udp);

const websocketServer = Deno.serve({ port: bridgeWebSocketPort }, (request) => {

	if(webSocket != null) {
		webSocket.close();
	}

	if (request.headers.get('upgrade') != 'websocket') {
		return new Response(null, { status: 501 });
	}

	const { socket, response } = Deno.upgradeWebSocket(request);

	webSocket = socket;

	webSocket.addEventListener('open', () => {
		// console.log('webSocket: open');
	});

	webSocket.addEventListener('message', (event) => {
		// console.log('webSocket message', event.data);
		udp.send(event.data, scSynthAddress).then(function(bytesSent) {
			// console.log('udp.send', bytesSent);
		});
	});

	return response;

});

(async () => {
	for await (const [data, address] of udp) {
		// console.log('udp.receive', data, address);
		webSocket.send(data);
	}
})();
