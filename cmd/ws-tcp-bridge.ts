import * as tcp from '../ts/kernel/tcp.ts';
import * as osc from '../ts/stdlib/openSoundControl.ts';

function getEnv(variableName: string, defaultValue: string): string {
	return Deno.env.get(variableName) || defaultValue;
}

const bridgeWebSocketPort = Number(getEnv('WsPort', '58110'));

const scSynthTcpAddress: Deno.ConnectOptions = {
	transport: 'tcp',
	hostname: getEnv('ScHostname', '127.0.0.1'),
	port: Number(getEnv('ScPort', '57110')),
};

console.log('scSynthTcpAddress', scSynthTcpAddress);
const tcpSocket: Deno.TcpConn = await Deno.connect(scSynthTcpAddress);
tcpSocket.setNoDelay(true);
tcpSocket.setKeepAlive(true);
const tcpQueue = tcp.tcpQueueOn(tcpSocket);

let webSocket: WebSocket | null = null;

function onRequest(request: Request) {
	if (webSocket != null) {
		webSocket.close();
	}
	if (request.headers.get('upgrade') != 'websocket') {
		return new Response(null, { status: 501 });
	}
	const { socket, response } = Deno.upgradeWebSocket(request);
	webSocket = socket;
	const writerMessageSize = new osc.TcpMessageSize();
	webSocket.addEventListener('message', (event) => {
		const byteArray = new Uint8Array(event.data);
		// console.debug('webSocket.message', byteArray);
		writerMessageSize.enqueue(tcpQueue, byteArray.byteLength);
		tcpQueue.addMessage(byteArray);
	});
	return response;
}

Deno.serve({ port: bridgeWebSocketPort }, onRequest);

osc.tcpOscPacketReader(
	tcpSocket,
	function (byteArray: Uint8Array) {
		if (webSocket != null) {
			webSocket.send(byteArray);
		} else {
			console.error('webSocket is null');
		}
	},
);
