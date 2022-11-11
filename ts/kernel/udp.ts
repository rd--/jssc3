export type UdpServerProc = (c: Deno.DatagramConn, a: Deno.Addr, d: Uint8Array) => void;

export async function udpServer(host: string, port: number, proc: UdpServerProc): Promise<void> {
	console.log(`udpServer: ${host}: ${port}`);
	const connection = Deno.listenDatagram({ transport: "udp", port });
	for await (const message of connection) {
		proc(connection, message[1], message[0]);
	}
}

export function udpSendTo(host: string, port: number, datagram: Uint8Array): void {
	const connection = Deno.listenDatagram({ transport: "udp", port: 0 });
	const address: Deno.NetAddr = { transport: "udp", hostname: host, port: port };
	connection.send(datagram, address);
	connection.close();
}

export function udpSendToAddr(address: Deno.NetAddr, datagram: Uint8Array): void {
	udpSendTo(address.hostname, address.port, datagram);
}

function testUdpServer() {
	const send = function(message: string) {
		udpSendTo('127.0.0.1', 3010, new TextEncoder().encode(message));
		console.log(`client: sent: ${message}`);
	};
	let connectionCount = 0;
	udpServer('127.0.0.1', 3010, function(connection, address, datagram) {
		console.log(`server: recv: ${datagram}: ${connectionCount}`);
		connection.send(datagram, address);
		console.log(`server: sent: ${datagram}`);
		connectionCount += 1;
	});
	send('Hello world!')
	send('Goodbye world!')
}

// testUdpServer()
