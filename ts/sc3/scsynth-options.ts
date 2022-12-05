import { prompt_for_int_and_then } from '../kernel/dom.ts'

export type ScsynthOptions = {
	hardwareBufferSize: number,
	blockSize: number,
	numInputs: number,
	numOutputs: number
};

export const scsynthDefaultOptions: ScsynthOptions = {
	numInputs: 2,
	numOutputs: 2,
	hardwareBufferSize: 8192,
	blockSize: 48
};

export function scsynthOptionsPrint(options: ScsynthOptions):void {
	console.log(
		'-i', options.numInputs,
		'-o', options.numOutputs,
		'-Z', options.hardwareBufferSize,
		'-z', options.blockSize
	);
}

function set_hardware_buffer_size(scsynthOptions: ScsynthOptions): void {
	prompt_for_int_and_then(
		'Set hardware buffer size',
		scsynthOptions.hardwareBufferSize,
		function(aNumber) { scsynthOptions.hardwareBufferSize = aNumber; }
	);
}

function set_block_size(scsynthOptions: ScsynthOptions): void {
	prompt_for_int_and_then(
		'Set block size',
		scsynthOptions.blockSize,
		function(aNumber) { scsynthOptions.blockSize = aNumber; }
	);
}

function set_num_inputs(scsynthOptions: ScsynthOptions): void {
	prompt_for_int_and_then(
		'Set number of inputs',
		scsynthOptions.numInputs,
		function(aNumber) { scsynthOptions.numInputs = aNumber; }
	);
}
