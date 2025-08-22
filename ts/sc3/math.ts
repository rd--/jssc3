export function absDif(self: number, aNumber: number) {
	return Math.abs(self - aNumber);
}

export function amClip(self: number, aNumber: number) {
	if (aNumber <= 0) {
		return 0;
	}
	return self * aNumber;
}

export function ampDb(self: number) {
	return Math.log10(self) * 20;
}

export function clip2(self: number, aNumber: number) {
	return self < -aNumber ? -aNumber : (self > aNumber ? aNumber : self);
}

export function coin(self: number) {
	return Math.random() < self;
}

export function cpsMidi(self: number) {
	return Math.log2(self * (1 / 440)) * 12 + 69;
}

export function cpsOct(self: number) {
	return Math.log2(self * (1.0 / 440.0)) + 4.75;
}

export function dbAmp(self: number) {
	return Math.pow(10, self * 0.05);
}

export function difSqr(self: number, aNumber: number) {
	return (self * self) - (aNumber * aNumber);
}

export function hypot(self: number, aNumber: number) {
	return Math.sqrt((self * self) + (aNumber * aNumber));
}

export function midiCps(self: number) {
	return 440 * (2 ** ((self - 69) * (1 / 12)));
}

export function midiRatio(self: number) {
	return Math.pow(2.0, self * (1.0 / 12.0));
}

export function octCps(self: number) {
	return 440.0 * Math.pow(2.0, self - 4.75);
}

export function pow(self: number, aNumber: number) {
	if (self < 0) {
		return -Math.pow(-self, aNumber);
	}
	return Math.pow(self, aNumber);
}

export function ratioMidi(self: number) {
	return 12.0 * Math.log2(self);
}

export function softClip(self: number) {
	const y = Math.abs(self);
	if (y <= 0.5) {
		return self;
	} else {
		return (y - 0.25) / self;
	}
}

export function distort(self: number) {
	return self / (1 + Math.abs(self));
}

// <https://github.com/sveinn-steinarsson/flot-downsample>
export function downsampleSteinarsson(
	data: number[][],
	threshold: number,
): number[][] {
	const floor = Math.floor;
	const abs = Math.abs;
	const data_length = data.length;
	if (threshold >= data_length || threshold === 0) {
		return data;
	}
	const sampled = [];
	let sampled_index = 0;
	const every = (data_length - 2) / (threshold - 2);
	let a = 0;
	let max_area_point = [0, 0];
	let max_area = 0;
	let area = 0;
	let next_a = 0;
	sampled[sampled_index++] = data[a];
	for (let i = 0; i < threshold - 2; i++) {
		let avg_x = 0;
		let avg_y = 0;
		let avg_range_start = floor((i + 1) * every) + 1;
		let avg_range_end = floor((i + 2) * every) + 1;
		avg_range_end = avg_range_end < data_length ? avg_range_end : data_length;
		const avg_range_length = avg_range_end - avg_range_start;
		for (; avg_range_start < avg_range_end; avg_range_start++) {
			avg_x += data[avg_range_start][0] * 1;
			avg_y += data[avg_range_start][1] * 1;
		}
		avg_x /= avg_range_length;
		avg_y /= avg_range_length;
		let range_offs = floor((i + 0) * every) + 1;
		const range_to = floor((i + 1) * every) + 1;
		const point_a_x = data[a][0] * 1;
		const point_a_y = data[a][1] * 1;
		max_area = area = -1;
		for (; range_offs < range_to; range_offs++) {
			area = abs(
				(point_a_x - avg_x) * (data[range_offs][1] - point_a_y) -
					(point_a_x - data[range_offs][0]) * (avg_y - point_a_y),
			) * 0.5;
			if (area > max_area) {
				max_area = area;
				max_area_point = data[range_offs];
				next_a = range_offs;
			}
		}
		sampled[sampled_index++] = max_area_point;
		a = next_a;
	}
	sampled[sampled_index++] = data[data_length - 1];
	return sampled;
}
