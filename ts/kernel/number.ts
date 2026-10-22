// Predicate that determines if x is a number.
export function isNumber(x: unknown): x is number {
	return (typeof x === 'number');
}

// Predicate that determines if x is a number or bigint.
export function isNumberOrBigInt(x: unknown): x is number | bigint {
	return (typeof x === 'number' || typeof x === 'bigint');
}

export const numberPi: number = Math.PI;

export const numberInfinity = Infinity;

export function numberTimesRepeat(
	count: number,
	proc: (aValue: void) => void,
): void {
	for (let i = 0; i < count; i++) {
		proc();
	}
}

export function numberToString(x: number): string {
	return Number(x).toString();
}
