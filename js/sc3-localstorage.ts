// Array of all keys at local storage
function local_storage_keys(): string[] {
    var answer = [];
    for(var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if(key) {
            answer.push(key);
        } else {
            console.warn('local_storage_keys: null key?');
        }
    }
    return answer;
}

// Delete all keys selected by predicate
function local_storage_delete_matching(predicate: (x: string) => boolean): void {
    local_storage_keys().forEach(entry => predicate(entry) ? localStorage.removeItem(entry) : null);
}
