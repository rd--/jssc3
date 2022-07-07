// sc3-localstorage.ts

// Array of all keys at local storage
export function local_storage_keys(): string[] {
	var arrayLength = localStorage.length;
	var answer = Array(arrayLength);
	for(var i = 0; i < arrayLength; i++) {
		var key = localStorage.key(i);
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
