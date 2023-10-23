export type UdpServerProc = (c: Deno.DatagramConn, a: Deno.Addr, d: Uint8Array) => void;

export async function udpServer(host: string, port: number, proc: UdpServerProc): Promise<void> {
	console.log(`udpServer: ${host}: ${port}`);
	const connection = Deno.listenDatagram({
		transport: "udp",
		hostname: host,
		port: port
	});
	for await (const message of connection) {
		proc(connection, message[1], message[0]);
	}
}

export function udpSendToAddr(address: Deno.NetAddr, datagram: Uint8Array): void {
	const connection = Deno.listenDatagram({
		transport: "udp",
		hostname: "0.0.0.0",
		port: 0
	});
	connection.send(datagram, address);
	connection.close();
}

export function udpSendTo(host: string, port: number, datagram: Uint8Array): void {
	const address: Deno.NetAddr = {
		transport: "udp",
		hostname: host,
		port: port
	};
	udpSendToAddr(address, datagram);
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
