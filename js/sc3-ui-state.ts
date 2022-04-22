export type ScsynthOptions = {
    hardwareBufferSize: number,
    blockSize: number,
    numInputs: number,
    numOutputs: number
};

export var scsynth_options: ScsynthOptions;

export function scsynthOptionsPrint(options: ScsynthOptions):void {
    console.log('-i', options.numInputs, '-o', options.numOutputs, '-Z', options.hardwareBufferSize, '-z', options.blockSize);
}
