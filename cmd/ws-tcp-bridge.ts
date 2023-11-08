import * as tcp from '../ts/kernel/tcp.ts'
import { TcpMessageSize, tcpOscPacketReader } from '../ts/stdlib/openSoundControl.ts'

function getEnv(variableName: string, defaultValue: string): string {
	return Deno.env.get(variableName) || defaultValue;
}

const bridgeWebSocketPort: number = Number(getEnv('WsPort', '58110'));

const scSynthTcpAddress: Deno.ConnectOptions = {
	transport: 'tcp',
	hostname: getEnv('ScHostname', '127.0.0.1'),
	port: Number(getEnv('ScPort', '57110'))
};

const tcpSocket: Deno.TcpConn = await Deno.connect(scSynthTcpAddress);
tcpSocket.setNoDelay(true);
tcpSocket.setKeepAlive(true);
const tcpQueue = tcp.tcpQueueOn(tcpSocket);

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

	const writerMessageSize = new TcpMessageSize();

	webSocket.addEventListener('message', (event) => {
		const byteArray = new Uint8Array(event.data);
		// console.debug('webSocket: message', byteArray);
		// prefix packet with size
		writerMessageSize.enqueue(tcpQueue, byteArray.byteLength);
		tcpQueue.addMessage(byteArray);
	});
	return response;

});

tcpOscPacketReader(
	tcpSocket,
	function(byteArray: Uint8Array) {
		if(webSocket != null) {
			webSocket.send(byteArray);
		} else {
			console.error('webSocket is null');
		}
	}
);
