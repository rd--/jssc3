import { withIntegerFromPrompt } from '../kernel/prompt.ts';

import { ScSynthOptions } from './scSynthOptions.ts';

export function setHardwareBufferSize(scSynthOptions: ScSynthOptions): void {
	withIntegerFromPrompt(
		'Set hardware buffer size',
		scSynthOptions.hardwareBufferSize,
		(aNumber) => scSynthOptions.hardwareBufferSize = aNumber,
	);
}

export function setBlockSize(scSynthOptions: ScSynthOptions): void {
	withIntegerFromPrompt(
		'Set block size',
		scSynthOptions.blockSize,
		(aNumber) => scSynthOptions.blockSize = aNumber,
	);
}

export function setNumInputs(scSynthOptions: ScSynthOptions): void {
	withIntegerFromPrompt(
		'Set number of inputs',
		scSynthOptions.numInputs,
		(aNumber) => scSynthOptions.numInputs = aNumber,
	);
}
