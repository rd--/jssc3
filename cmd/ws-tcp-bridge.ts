import * as tcp from '../ts/kernel/tcp.ts'

function getEnv(variableName: string, defaultValue: string): string {
	return Deno.env.get(variableName) || defaultValue;
}

const bridgeWebSocketPort: number = Number(getEnv('WsPort', '58110'));

const scSynthTcpAddress: Deno.ConnectOptions = {
	transport: 'tcp',
	hostname: getEnv('ScHostname', '127.0.0.1'),
	port: Number(getEnv('ScPort', '57110'))
};

const tcpConnection: Deno.TcpConn = await Deno.connect(scSynthTcpAddress);
tcpConnection.setNoDelay(true);
tcpConnection.setKeepAlive(true);

var webSocket: WebSocket | null = null;

const websocketServer = Deno.serve({ port: bridgeWebSocketPort }, (request) => {

	if(webSocket != null) {
		webSocket.close();
	}

	if(request.headers.get('upgrade') != 'websocket') {
		return new Response(null, { status: 501 });
	}

	const { socket, response } = Deno.upgradeWebSocket(request);

	webSocket = socket;

	const packetSizeArrayBuffer = new ArrayBuffer(4);
	const packetSizeDataView = new DataView(packetSizeArrayBuffer);
	const packetSizeArray = new Uint8Array(packetSizeArrayBuffer);

	webSocket.addEventListener('message', (event) => {
		const byteArray = new Uint8Array(event.data);
		// console.debug('webSocket: message', byteArray);
		// prefix packet with size
		packetSizeDataView.setUint32(0, byteArray.byteLength, false);
		tcp.tcpWriteComplete(tcpConnection, packetSizeArray);
		tcp.tcpWriteComplete(tcpConnection, byteArray);
	});
	return response;

});

const tcpMaxSize = 8388608;
const readSize = new Uint8Array(4);
const readArray = new Uint8Array(tcpMaxSize);
while(1) {
    let bytesRead = await tcpConnection.read(readSize) || 0;
	if(bytesRead != 4) {
		throw new Error(`tcpConnection.read: packet size read failed: ${bytesRead}`);
	}
    bytesRead = await tcpConnection.read(readArray) || 0;
    const message = readArray.slice(0, bytesRead);
	if(webSocket != null) {
		webSocket.send(message);
	} else {
		console.error('webSocket is null');
	}
}
