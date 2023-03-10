import { prompt_for_int_and_then } from '../kernel/dom.ts'

export class ScSynthOptions {
	hardwareBufferSize: number;
	blockSize: number;
	numInputs: number;
	numOutputs: number;
	constructor(hardwareBufferSize: number, blockSize: number, numInputs: number, numOutputs: number) {
		this.hardwareBufferSize = hardwareBufferSize;
		this.blockSize = blockSize;
		this.numInputs = numInputs;
		this.numOutputs = numOutputs;
	}
}

export const scSynthDefaultOptions: ScSynthOptions = new ScSynthOptions(8192, 48, 2, 2);

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
		function(aNumber) {
			scSynthOptions.hardwareBufferSize = aNumber;
		}
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
