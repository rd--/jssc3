export type Counter = (() => number);

export function counterNewFromBy(start: number, by: number): Counter {
	let x = start;
	return function() {
		x = x + by;
		return x;
	}
}

export function counterNew(): Counter {
	return counterNewFromBy(0, 1);
}
