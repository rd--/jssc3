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

// Throw error if response status is not .ok
function handle_fetch_error(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function load_and_extract_and_then(fileName, typeString, extractFunc, processFunc) {
    fetch(fileName, { cache: 'no-cache' })
        .then(response => handle_fetch_error(response))
        .then(response => extractFunc(response))
        .then(text => processFunc(text))
        .catch(reason => processFunc(log_error_and_return('load' + typeString, reason, '')));
}

// Fetch fileName and apply processFunc to the text read (stored as UTF-8).
function load_utf8_and_then(fileName, processFunc) {
    load_and_extract_and_then(fileName, 'text/utf8', r => r.text(), processFunc);
}

// Fetch fileName and apply processFunc to the object read (stored as JSON).
function load_json_and_then(fileName, processFunc) {
    load_and_extract_and_then(fileName, 'text/json', r => r.json(), processFunc);
}

// Fetch fileName and apply processFunc to the ArrayBuffer object read
function load_arraybuffer_and_then(fileName, processFunc) {
    load_and_extract_and_then(fileName, 'bytes/arraybuffer', r => r.arrayBuffer(), processFunc);
}

// Read named file and run proc on result.
function read_text_file_and_then(fileName, proc) {
    var reader = new FileReader();
    reader.addEventListener('load', () => proc(reader.result), false);
    reader.readAsText(fileName);
}

// Read file from input/file at indicated id and index and run proc.
function read_text_file_from_file_input_and_then(inputId, fileIndex, proc) {
    var inputFile = document.getElementById(inputId).files[fileIndex];
    if (inputFile) {
        read_text_file_and_then(inputFile, proc);
    }
}

// Read named .json file and run proc on parsed result.
function read_json_file_and_then(fileName, proc) {
    read_text_file_and_then(fileName, jsonText => proc(JSON.parse(jsonText)));
}
