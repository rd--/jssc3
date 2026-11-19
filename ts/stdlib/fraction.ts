export type Fraction = {
	numerator: bigint;
	denominator: bigint;
}

export function fractionToNumber(x: Fraction): number {
	return Number(x.numerator) / Number(x.denominator);
}

export function isFraction(x: unknown): x is Fraction {
	return x !== null
		&& typeof x === "object"
		&& Object.hasOwn(x, "numerator")
		&& Object.hasOwn(x, "denominator");
}
