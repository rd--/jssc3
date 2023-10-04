import { OscPacket, encodeOscPacket, decodeOscMessage } from '../stdlib/opensoundcontrol.ts'

import { ScSynth } from './scsynth.ts'
import { scSynthDefaultOptions } from './scsynth-options.ts'
import { m_notify, m_parseStatusReply, m_status } from './servercommand.ts'

export function webSocketSendOsc(ws: WebSocket, oscPacket: OscPacket): void {
	// console.debug(`webSocketSendOsc: ${oscPacket}`);
	ws.send(encodeOscPacket(oscPacket));
}

export function scSynthWebSocket(url: string | URL): ScSynth {
	const webSocket = new WebSocket(url);
	webSocket.binaryType = 'arraybuffer';
	const scSynth = new ScSynth(
		scSynthDefaultOptions,
		() => console.log(`scSynthWebSocket: cannot start remote synthesiser`),
		(oscPacket) => webSocketSendOsc(webSocket, oscPacket),
	);
	scSynth.isAlive = true;
	scSynth.hasIoUgens = true;
	webSocket.onopen = function() {
		// webSocket.send(encodeOscPacket(m_notify(1, 1)));
		setInterval(() => webSocket.send(encodeOscPacket(m_status)), 1000);
	}
	webSocket.onmessage = function(event) {
		const msg = decodeOscMessage(event.data);
		console.log('scSynth webSocket message', msg);
		if(msg.address === '/status.reply') {
			m_parseStatusReply(msg, scSynth.status);
		}
	};
	return scSynth;
}
