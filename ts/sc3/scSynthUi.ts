import { setterForInnerHtmlOf } from '../kernel/dom.ts'

import { ScSynth } from './scSynth.ts'

export function scSynthInitStatusTextListener(scSynth: ScSynth, nilText: string) {
	let setText = setterForInnerHtmlOf('statusText');
	setInterval(function() {
			if(scSynth.isConnected()) {
				setText(scSynth.status.ugenCount.toString());
			} else {
				setText(nilText);
			}
	});
}
