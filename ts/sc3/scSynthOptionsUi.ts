import { withIntegerFromPrompt } from '../kernel/prompt.ts'

import { ScSynthOptions } from './scSynthOptions.ts'

function setHardwareBufferSize(scSynthOptions: ScSynthOptions): void {
	withIntegerFromPrompt(
		'Set hardware buffer size',
		scSynthOptions.hardwareBufferSize,
		aNumber => scSynthOptions.hardwareBufferSize = aNumber
	);
}

function setBlockSize(scSynthOptions: ScSynthOptions): void {
	withIntegerFromPrompt(
		'Set block size',
		scSynthOptions.blockSize,
		aNumber => scSynthOptions.blockSize = aNumber
	);
}

function setNumInputs(scSynthOptions: ScSynthOptions): void {
	withIntegerFromPrompt(
		'Set number of inputs',
		scSynthOptions.numInputs,
		aNumber => scSynthOptions.numInputs = aNumber
	);
}
