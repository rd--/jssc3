export type Writer<C, M> = (socket: C, message: M) => Promise<void>;

/* | Synchronous writer queue.

addMessage appends a message (M) to the message queue, and begins a write process if required.
writeMessages dequeues messages in sequence and writes them to the socket (C).
*/
export class SynchronousWriterQueue<C, M> {
	writer: Writer<C, M>;
	socket: C;
	messages: M[];
	writeInProgress: boolean;
	constructor(writer: Writer<C, M>, socket: C) {
		this.writer = writer;
		this.socket = socket;
		this.messages = [];
		this.writeInProgress = false;
	}
	addMessage(message: M): void {
		this.messages.push(message);
		if (!this.writeInProgress) {
			this.writeMessages();
		}
	}
	async writeMessages(): Promise<number> {
		const writeCount = this.messages.length;
		if (this.writeInProgress) {
			throw new Error(
				'SynchronousWriterQueue.writeMessages: write in progress?',
			);
		} else {
			this.writeInProgress = true;
			while (this.messages.length > 0) {
				// console.debug('SynchronousWriterQueue.writeMessages: dequeue message');
				const message = this.messages.shift()!;
				await this.writer(this.socket, message);
			}
			this.writeInProgress = false;
		}
		return writeCount;
	}
}
