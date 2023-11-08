import { SynchronousWriterQueue} from './synchronousWriterQueue.ts'

export type TcpServerProc = (
	connection: Deno.Conn,
	address: Deno.Addr,
	message: Uint8Array
) => void;

export function tcpAddress(hostname: string, port: number): Deno.ConnectOptions {
	return {
		transport: 'tcp',
		hostname: hostname,
		port: port
	};
}

export async function tcpServer(
	host: string,
	port: number,
	proc: TcpServerProc
): Promise<void> {
	console.log(`tcpServer: ${host}: ${port}`);
	const listener = Deno.listen({
		transport: "tcp",
		hostname: host,
		port: port
	});
	for await(const connection of listener) {
		for await (const message of connection.readable) {
			proc(connection, connection.remoteAddr, message);
		}
	}
}

export async function tcpSendToAddr(
	address: Deno.ConnectOptions,
	message: Uint8Array
): Promise<void> {
	const connection = await Deno.connect(address);
	await connection.write(message);
	connection.close();
}

// Write a complete message to a Tcp socket.
export async function tcpWriteComplete(socket: Deno.TcpConn, byteArray: Uint8Array): Promise<void> {
	const messageSize = byteArray.byteLength;
	let writeCount = await socket.write(byteArray);
	let previousWrite = writeCount;
	// console.debug('tcpWriteComplete: initial write', messageSize, previousWrite);
	while(writeCount < messageSize) {
		const remainder = byteArray.slice(writeCount);
		previousWrite = await socket.write(remainder);
		// console.debug('tcpWriteComplete: partial write',	previousWrite);
		writeCount += previousWrite;
	}
	// console.debug('tcpWriteComplete: write completed', previousWrite);
}

export type TcpQueue = SynchronousWriterQueue<Deno.TcpConn,Uint8Array>;

// Implement a SynchronousWriterQueue for a Tcp socket.
export function tcpQueueOn(tcpSocket: Deno.TcpConn): TcpQueue {
	return new SynchronousWriterQueue(tcpWriteComplete, tcpSocket);
}
