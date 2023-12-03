export function isNumber(aValue: unknown): aValue is number {
	return (typeof aValue === 'number');
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

export function numberToString(aNumber: number): string {
	return Number(aNumber).toString();
}
