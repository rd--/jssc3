export function isPrime(aNumber: number): boolean {
	if (aNumber <= 1) {
		return false;
	} else if (aNumber === 2) {
		return true;
	} else {
		const sqrt = Math.sqrt(aNumber);
		for (let i = 2; i <= sqrt; i++) {
			if (aNumber % i === 0) {
				return false;
			}
		}
		return true;
	}
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
