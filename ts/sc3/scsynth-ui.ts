import { setter_for_inner_html_of } from '../kernel/dom.ts'

import { ScSynth, ReadyState } from './scsynth.ts'

export function scSynthInitStatusTextListener(scSynth: ScSynth, nilText: string) {
	let setText = setter_for_inner_html_of('statusText');
	setInterval(function() {
			if(scSynth.readyState == ReadyState.Connected) {
				setText(scSynth.status.ugenCount.toString());
			} else {
				setText(nilText);
			}
	});
}
