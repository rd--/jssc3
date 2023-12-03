// Array of all keys at local storage
export function localStorageKeys(): string[] {
	const arrayLength = localStorage.length;
	const answer = Array(arrayLength);
	for (let i = 0; i < arrayLength; i++) {
		const key = localStorage.key(i);
		if (key) {
			answer[i] = key;
		} else {
			console.warn('localStorageKeys: null key?');
		}
	}
	return answer;
}

// Delete all keys selected by predicate
export function localStorageDeleteMatching(
	predicate: (aString: string) => boolean,
): void {
	localStorageKeys().forEach(function (entry) {
		predicate(entry) ? localStorage.removeItem(entry) : null;
	});
}
