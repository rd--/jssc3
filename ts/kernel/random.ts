// The maximum is exclusive and the minimum is inclusive.
export function randomInteger(minNumber: number, maxNumber: number): number {
	const min = Math.ceil(minNumber);
	const max = Math.floor(maxNumber);
	return Math.floor(Math.random() * (max - min) + min);
}

// The maximum and minimum are both inclusive.
export function randomIntegerInclusive(
	minNumber: number,
	maxNumber: number,
): number {
	const min = Math.ceil(minNumber);
	const max = Math.floor(maxNumber);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomFloat(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

export function randomBoolean(): boolean {
	return Math.random() > 0.5;
}
