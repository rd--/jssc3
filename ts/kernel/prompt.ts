import { parseIntOrAlertAndThen } from './dom.ts'

export function promptForIntAndThen(
	promptText: string,
	defaultValue: number,
	proc: (aNumber: number) => void
): void {
	const integerText = window.prompt(promptText, String(defaultValue));
	if(integerText) {
		parseIntOrAlertAndThen(integerText, 'Not an integer?', proc);
	}
}

// Prompt for WebSocket address (host and port) and call function on answer
export function webSocketAddressDialog(receiveAddress: (host: string, port: number) => void): void {
	const reply = window.prompt('Set WebSocket address as Host:Port', 'localhost:9160');
	if(reply) {
		const [host, port] = reply.split(':');
		receiveAddress(host, Number(port));
	}
}
