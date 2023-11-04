import { promptForIntAndThen } from '../kernel/prompt.ts'

import { ScSynthOptions } from './scSynthOptions.ts'

function setHardwareBufferSize(scSynthOptions: ScSynthOptions): void {
	promptForIntAndThen(
		'Set hardware buffer size',
		scSynthOptions.hardwareBufferSize,
		function(aNumber) {
			scSynthOptions.hardwareBufferSize = aNumber;
		}
	);
}

function setBlockSize(scSynthOptions: ScSynthOptions): void {
	promptForIntAndThen(
		'Set block size',
		scSynthOptions.blockSize,
		function(aNumber) { scSynthOptions.blockSize = aNumber; }
	);
}

function setNumInputs(scSynthOptions: ScSynthOptions): void {
	promptForIntAndThen(
		'Set number of inputs',
		scSynthOptions.numInputs,
		function(aNumber) { scSynthOptions.numInputs = aNumber; }
	);
}
