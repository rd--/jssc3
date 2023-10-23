export type TcpServerProc = (c: Deno.Conn, a: Deno.Addr, d: Uint8Array) => void;

export async function tcpServer(host: string, port: number, proc: TcpServerProc): Promise<void> {
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

export async function tcpSendToAddr(address: Deno.ConnectOptions, message: Uint8Array): Promise<void> {
	const connection = await Deno.connect(address);
	connection.write(message);
	connection.close();
}
