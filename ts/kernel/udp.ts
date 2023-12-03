export type UdpServerProc = (
	c: Deno.DatagramConn,
	a: Deno.Addr,
	d: Uint8Array,
) => void;

export function udpAddress(hostname: string, port: number): Deno.NetAddr {
	return {
		transport: 'udp',
		hostname: '127.0.0.1',
		port: 57110,
	};
}

export async function udpServer(
	hostname: string,
	port: number,
	proc: UdpServerProc,
): Promise<void> {
	console.log(`udpServer: ${hostname}: ${port}`);
	const connection = Deno.listenDatagram({
		transport: 'udp',
		hostname: hostname,
		port: port,
	});
	for await (const message of connection) {
		proc(connection, message[1], message[0]);
	}
}

export async function udpSendToAddr(
	address: Deno.NetAddr,
	datagram: Uint8Array,
): Promise<void> {
	const connection = Deno.listenDatagram({
		transport: 'udp',
		hostname: '0.0.0.0',
		port: 0,
	});
	await connection.send(datagram, address);
	connection.close();
}

export async function udpSendTo(
	hostname: string,
	port: number,
	datagram: Uint8Array,
): Promise<void> {
	udpSendToAddr(udpAddress(hostname, port), datagram);
}

/*
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
*/
