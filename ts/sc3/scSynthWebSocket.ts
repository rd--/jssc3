import {
	decodeOscMessage,
	encodeOscPacket,
} from '../stdlib/openSoundControl.ts';

import { ScSynth } from './scSynth.ts';

export function scSynthUseWebSocket(scSynth: ScSynth, url: string | URL): void {
	if (scSynth.isConnected()) {
		throw Error('scSynthUseWebSocket: already connected');
	} else {
		const webSocket = new WebSocket(url);
		webSocket.binaryType = 'arraybuffer';
		scSynth.basicConnect = () => scSynth.startStatusMonitor();
		scSynth.basicSendOsc = (oscPacket) =>
			webSocket.send(encodeOscPacket(oscPacket));
		scSynth.useIoUgens = true;
		webSocket.onopen = function () {
			// console.debug('ScSynth.WebSocket: open');
		};
		webSocket.onmessage = function (event) {
			// console.debug('ScSynth.WebSocket: message', event.data);
			scSynth.dispatchOscMessage(decodeOscMessage(event.data));
		};
	}
}

export function ScSynthWebSocket(url: string | URL): ScSynth {
	const scSynth = new ScSynth();
	scSynthUseWebSocket(scSynth, url);
	return scSynth;
}
