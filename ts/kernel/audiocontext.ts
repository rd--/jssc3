/* Get the sample rate of the audio context */
export function system_samplerate(): number {
	const audioContext = new window.AudioContext();
	console.log('audioContext.sampleRate', audioContext.sampleRate);
	return audioContext.sampleRate;
}
