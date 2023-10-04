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
	print(): void {
		console.log(
			'-i', this.numInputs,
			'-o', this.numOutputs,
			'-Z', this.hardwareBufferSize,
			'-z', this.blockSize
		)
	}
}

export const scSynthDefaultOptions: ScSynthOptions = new ScSynthOptions(8192, 48, 2, 2);
