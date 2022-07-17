// sc3-number.ts

export function isNumber<T>(x: T): boolean {
	return (typeof x === 'number');
}

export const pi: number = Math.PI;

export const inf = Infinity;

export function randomInteger(minNumber: number, maxNumber: number): number {
	const min = Math.ceil(minNumber);
	const max = Math.floor(maxNumber);
	return Math.floor(Math.random() * (max - min) + min); // the maximum is exclusive and the minimum is inclusive
}

export function randomIntegerInclusive(minNumber: number, maxNumber: number): number {
	const min = Math.ceil(minNumber);
	const max = Math.floor(maxNumber);
	return Math.floor(Math.random() * (max - min + 1) + min); // the maximum is inclusive and the minimum is inclusive
}

export function randomFloat(min: number, max : number): number {
  return Math.random() * (max - min) + min;
}

export function randomBoolean(): boolean {
	return Math.random()  > 0.5;
}

export function numberTimesRepeat(count: number, proc: (aValue: void) => void): void {
	for(let i = 0; i < count; i++) {
		proc();
	}
}

export function numberToString(aNumber: number): string {
	return Number(aNumber).toString();
}
