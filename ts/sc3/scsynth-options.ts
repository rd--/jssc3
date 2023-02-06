import { prompt_for_int_and_then } from '../kernel/dom.ts'

export type ScSynthOptions = {
	hardwareBufferSize: number,
	blockSize: number,
	numInputs: number,
	numOutputs: number
};

export const scSynthDefaultOptions: ScSynthOptions = {
	numInputs: 2,
	numOutputs: 2,
	hardwareBufferSize: 8192,
	blockSize: 48
};

export function scSynthOptionsPrint(options: ScSynthOptions):void {
	console.log(
		'-i', options.numInputs,
		'-o', options.numOutputs,
		'-Z', options.hardwareBufferSize,
		'-z', options.blockSize
	);
}

function set_hardware_buffer_size(scSynthOptions: ScSynthOptions): void {
	prompt_for_int_and_then(
		'Set hardware buffer size',
		scSynthOptions.hardwareBufferSize,
		function(aNumber) { scSynthOptions.hardwareBufferSize = aNumber; }
	);
}

function set_block_size(scSynthOptions: ScSynthOptions): void {
	prompt_for_int_and_then(
		'Set block size',
		scSynthOptions.blockSize,
		function(aNumber) { scSynthOptions.blockSize = aNumber; }
	);
}

function set_num_inputs(scSynthOptions: ScSynthOptions): void {
	prompt_for_int_and_then(
		'Set number of inputs',
		scSynthOptions.numInputs,
		function(aNumber) { scSynthOptions.numInputs = aNumber; }
	);
}
