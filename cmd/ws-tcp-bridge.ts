const bridgeWebSocketPort: number = 58110;

const scSynthTcpAddress: Deno.NetAddr = {
	transport: 'tcp',
	hostname: '192.168.1.53', /* 127.0.0.1 192.168.1.53 */
	port: 57110
};

const tcp: TcpConn = await Deno.connect(scSynthTcpAddress);

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

	const packetSizeArrayBuffer = new ArrayBuffer(4);
	const packetSizeDataView = new DataView(packetSizeArrayBuffer);
	const packetSizeArray = new Uint8Array(packetSizeArrayBuffer);

	webSocket.addEventListener('message', (event) => {
		const byteArray = new Uint8Array(event.data);
		console.debug('webSocket: message', byteArray);
		console.debug('tcp', tcp.localAddr, tcp.remoteAddr);
		packetSizeDataView.setUint32(0, byteArray.byteLength, false);
		tcp.write(packetSizeArray); // prefix packet with size
		tcp.write(byteArray).then(function(bytesSent: number) {
			if(byteArray.byteLength != bytesSent) {
				console.error('tcp.write', byteArray.byteLength, bytesSent);
			} else {
				console.debug('tcp.write: successful');
			}
		});
	});

	return response;

});

const readSize = new Uint8Array(4);
const readArray = new Uint8Array(65536);
while(1) {
    await tcp.read(readSize) || 0;
    const bytesRead = await tcp.read(readArray) || 0;
    const message = readArray.slice(0, bytesRead);
	if(webSocket != null) {
		webSocket.send(message);
	} else {
		console.error('webSocket is null');
	}
}
