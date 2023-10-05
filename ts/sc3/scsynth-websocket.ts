import { encodeOscPacket, decodeOscMessage } from '../stdlib/opensoundcontrol.ts'

import { ScSynth, ReadyState } from './scsynth.ts'

export function scSynthUseWebSocket(scSynth: ScSynth, url: string | URL): void {
	const webSocket = new WebSocket(url);
	webSocket.binaryType = 'arraybuffer';
	scSynth.connect = () => scSynth.readyState = ReadyState.Connecting;
	scSynth.sendOsc = (oscPacket) => webSocket.send(encodeOscPacket(oscPacket));
	scSynth.hasIoUgens = true;
	webSocket.onopen = function() {
		scSynth.startStatusMonitor();
	}
	webSocket.onmessage = function(event) {
		scSynth.dispatchOscMessage(decodeOscMessage(event.data));
	};
}

export function sc3_web_socket_init(url: string | URL): void {
	const scSynth = new ScSynth();
	scSynthUseWebSocket(scSynth, url);
	globalThis.globalScSynth = scSynth;
}
