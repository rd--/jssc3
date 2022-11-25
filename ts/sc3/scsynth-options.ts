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
