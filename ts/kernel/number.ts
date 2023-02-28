export function isNumber(aValue: unknown): aValue is number {
	return (typeof aValue === 'number');
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

export function isPrime(aNumber: number): boolean {
	if (aNumber <= 1) return false;
	if (aNumber === 2) return true;
	const sqrt = Math.sqrt(aNumber);
	for (let i = 2; i <= sqrt; i++) {
		if (aNumber % i === 0) {
			return false;
		}
	}
	return true;
}

export function primeFactors(aNumber: number): number[] {
	const factors = [];
	let divisor = 2;
	let n = aNumber;
	while (n >= 2) {
		if (n % divisor == 0) {
			factors.push(divisor);
			n = n / divisor;
		} else {
			divisor++;
		}
	}
	return factors;
}
