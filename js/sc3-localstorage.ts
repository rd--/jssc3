// sc3-localstorage.ts

// Array of all keys at local storage
export function local_storage_keys(): string[] {
	const arrayLength = localStorage.length;
	const answer = Array(arrayLength);
	for(let i = 0; i < arrayLength; i++) {
		const key = localStorage.key(i);
		if(key) {
			answer[i] = key;
		} else {
			console.warn('local_storage_keys: null key?');
		}
	}
	return answer;
}

// Delete all keys selected by predicate
export function local_storage_delete_matching(predicate:  (aString: string) => boolean): void {
	local_storage_keys().forEach(entry => predicate(entry) ? localStorage.removeItem(entry) : null);
}
