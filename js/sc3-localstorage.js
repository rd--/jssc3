'use strict';

// Array of all keys at local storage
function local_storage_keys() {
    var a = [];
    var k = localStorage.length;
    for(var i = 0; i < k; i++) {
        a.push(localStorage.key(i));
    }
    return a;
}

// Delete all keys selected by predicate
function local_storage_delete_matching(predicate) {
    local_storage_keys().forEach(entry => predicate(entry) ? localStorage.removeItem(entry) : null);
}
