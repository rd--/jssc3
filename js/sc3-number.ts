// sc3-number.ts

export function isNumber(x: any): boolean {
    return (typeof x === 'number');
}

export var pi: number = Math.PI;

export var inf: number = Infinity;

export function randomInteger(minNumber: number, maxNumber: number): number {
    var min = Math.ceil(minNumber);
    var max = Math.floor(maxNumber);
    return Math.floor(Math.random() * (max - min) + min); // the maximum is exclusive and the minimum is inclusive
}

function randomIntegerInclusive(minNumber: number, maxNumber: number): number {
    var min = Math.ceil(minNumber);
    var max = Math.floor(maxNumber);
    return Math.floor(Math.random() * (max - min + 1) + min); // the maximum is inclusive and the minimum is inclusive
}

export function randomFloat(min: number, max : number): number {
  return Math.random() * (max - min) + min;
}

export function randomBoolean(): boolean {
    return Math.random()  > 0.5;
}

export function numberTimesRepeat(count: number, proc: (aValue: void) => void): void {
    for(var i = 0; i < count; i++) {
        proc();
    }
}

export function numberToString(aNumber: number): string {
    return Number(aNumber).toString();
}
