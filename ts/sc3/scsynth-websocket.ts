import { OscPacket, encodeOscPacket } from '../stdlib/opensoundcontrol.ts'

import { ScSynth } from './scsynth.ts'
import { scSynthDefaultOptions } from './scsynth-options.ts'

export function webSocketSendOsc(ws: WebSocket, oscPacket: OscPacket): void {
	// console.debug(`webSocketSendOsc: ${oscPacket}`);
	ws.send(encodeOscPacket(oscPacket));
}

export function scSynthWebSocket(url: string | URL): ScSynth {
	const webSocket = new WebSocket(url);
	const scSynth = new ScSynth(
		scSynthDefaultOptions,
		() => console.log(`scSynthWebSocket: cannot start remote synthesiser`),
		(oscPacket) => webSocketSendOsc(webSocket, oscPacket),
	);
	scSynth.isAlive = true;
	scSynth.hasIoUgens = true;
	return scSynth;
}
