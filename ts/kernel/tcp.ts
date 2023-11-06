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

export async function tcpWriteComplete(socket: Deno.TcpConn, byteArray: Uint8Array): Promise<void> {
	const totalWrite = byteArray.byteLength;
	let bytesWritten = await socket.write(byteArray);
	let previousWrite = bytesWritten;
	while(bytesWritten < totalWrite) {
		const remainder = byteArray.slice(bytesWritten);
		console.debug(
			'tcpWriteComplete: partial write',
			totalWrite,
			bytesWritten,
			previousWrite,
			remainder.byteLength,
			totalWrite - bytesWritten
		);
		previousWrite = await socket.write(remainder);
		bytesWritten += previousWrite;
	}
	console.debug('tcpWriteComplete: write completed', previousWrite);
}

// Synchronous Tcp queue.
export class TcpQueue {
	socket: Deno.TcpConn;
	messages: Uint8Array[];
	writeInProgress: boolean;
	constructor(socket: Deno.TcpConn) {
		this.socket = socket;
		this.messages = [];
		this.writeInProgress = false;
	}
	addMessage(message: Uint8Array): void {
		this.messages.push(message);
		if(!this.writeInProgress) {
			this.writeMessages();
		}
	}
	async writeMessages(): Promise<number> {
		const writeCount = this.messages.length
		if(this.writeInProgress) {
			throw new Error('TcpQueue.writeMessages: write in progress?');
		} else {
			this.writeInProgress = true;
			while(this.messages.length > 0) {
				console.debug('TcpQueue.writeMessages: dequeue message');
				const message = this.messages.shift()!;
				await tcpWriteComplete(this.socket, message);
			}
			this.writeInProgress = false;
		}
		return writeCount;
	}
}
