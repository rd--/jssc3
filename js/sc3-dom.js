'use strict';

// Append timestamp to URL to defeat cache
function url_append_timestamp(url) {
    var ext = ((/\?/).test(url) ? '&' : '?') + (new Date()).getTime();
    return url + ext;
}

// Fetch url with indicated response type and run proc on result.
function fetch_url_and_then(url, type, proc) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', () => proc(request.response));
    request.open('GET', url);
    request.responseType = type;
    request.send();
}

// Function to return a function to set the innerHTML of elemId
function set_inner_html_of(elemId) {
    var selectElem = document.getElementById(elemId);
    return function(innerHtml) {
        selectElem.innerHTML = innerHtml;
    };
}

// Throw error if response status is not .ok
function handle_fetch_error(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// Log error and return default value
function log_error_and_return(from, reason, defaultValue) {
    console.debug(from, ': ', reason);
    return defaultValue;
}

// Fetch fileName and apply processFunc to the text read (stored as UTF-8).
function load_utf8_and_then(fileName, processFunc) {
    fetch(fileName, { cache: 'no-cache' })
        .then(response => handle_fetch_error(response))
        .then(response => response.text())
        .then(text => processFunc(text))
        .catch(reason => processFunc(log_error_and_return('utf8', reason, '')));
}

// Fetch fileName and apply processFunc to the object read (stored as JSON).
function load_json_and_then(fileName, processFunc) {
    fetch(fileName, { cache: 'no-cache' })
        .then(response => handle_fetch_error(response))
        .then(response => response.json())
        .then(obj => processFunc(obj));
}

// Set onchange handler
function select_on_change(selectId, proc) {
    var select = document.getElementById(selectId);
    select.addEventListener('change', e => e.target.value ? proc(e.target.value) : null);
}

// Add option to select at elemId
function select_add_option(elemId, value, text) {
    var select = document.getElementById(elemId);
    var option = document.createElement('option');
    option.value = value;
    option.text = text;
    select.add(option, null);
}

// Delete all options at selectId from startIndex
function select_clear_from(selectId, startIndex) {
    var select = document.getElementById(selectId);
    var k = select.length;
    for(var i = startIndex; i < k; i++) {
        select.remove(startIndex);
    }
}

// Add all keys as entries, both value and text, at selectId
function select_add_keys_as_options(selectId, keyArray) {
    var select = document.getElementById(selectId);
    keyArray.forEach(function(key) {
        var option = document.createElement('option');
        option.value = key;
        option.text = key;
        select.add(option, null);
        console.debug('select_add_keys_as_options', key);
    });
}

// Add listener to button passes click events to input.
function connect_button_to_input(buttonId, inputId) {
    var button = document.getElementById(buttonId);
    var input = document.getElementById(inputId);
    button.addEventListener('click', e => input.click(), false);
}

// Read named file and run proc on result.
function read_text_file_and_then(fileName, proc) {
    var reader = new FileReader();
    reader.addEventListener('load', () => proc(reader.result), false);
    reader.readAsText(fileName);
}

// Read named .json file and run proc on parsed result.
function read_json_file_and_then(fileName, proc) {
    read_text_file_and_then(fileName, jsonText => proc(JSON.parse(jsonText)));
}

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
