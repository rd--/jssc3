"use strict";
function isArray(aValue) {
    return Array.isArray(aValue);
}
// arrayAppend([1, 2, 3], [4, 5, 6]) //= [1, 2, 3, 4, 5, 6]
function arrayAppend(lhs, rhs) {
    return lhs.concat(rhs);
}
// [1, [1, 2]].map(arrayAsArray) //= [[1], [1, 2]]
function arrayAsArray(maybeArray) {
    return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
// arrayAt([1, 2, 3, 4], 3) === 4
function arrayAt(anArray, index) {
    return anArray[index];
}
// arrayAtIndices([1, 2, 3], [0, 2]) //= [1, 3]
function arrayAtIndices(anArray, indices) {
    return indices.map(index => anArray[index]);
}
// arrayAtWrap([1, 2, 3], 5) === 3
function arrayAtWrap(anArray, index) {
    console.debug('atWrap', anArray, index);
    return anArray[index % anArray.length];
}
// arrayClump(arrayIota(20), 5)
function arrayClump(anArray, n) {
    var k = Math.ceil(anArray.length / n);
    return arrayIota(k).map(i => anArray.slice(i * n, i * n + n));
}
// arrayConcatenation([[1, 2, 3], [4, 5]]) //= [1, 2, 3, 4, 5]
function arrayConcatenation(anArray) {
    return anArray.flat(1);
}
// arrayContainsarray([1, 2, [3, 4]]) === true
function arrayContainsArray(anArray) {
    return anArray.some(item => Array.isArray(item));
}
// arrayDropWhile([1, 2, 3, 4], x => x < 3) //= [3, 4]
function arrayDropWhile(anArray, predicate) {
    var [x, ...xs] = anArray;
    if (anArray.length > 0 && predicate(x)) {
        return arrayDropWhile(xs, predicate);
    }
    else {
        return anArray;
    }
}
// arrayExtendCyclically([1, 2, 3], 8) //= [1, 2, 3, 1, 2, 3, 1, 2]
function arrayExtendCyclically(anArray, size) {
    var k = anArray.length;
    var result = anArray.slice(0, k);
    for (var x = 0; x < size - k; x += 1) {
        result.push(arrayAtWrap(anArray, x));
    }
    return result;
}
// arrayExtendToBeOfEqualSize([[1, 2], [3, 4, 5]]) //= [[1, 2, 1], [3, 4, 5]]
// arrayExtendToBeOfEqualSize([[440, 550], 0]) //= [[440, 550], [0, 0]]
function arrayExtendToBeOfEqualSize(anArray) {
    var m = arrayMaxItem(anArray.map(item => Array.isArray(item) ? item.length : 1));
    return anArray.map(item => arrayExtendCyclically(Array.isArray(item) ? item : [item], m));
}
// arrayFill(5, () => Math.random())
function arrayFill(k, f) {
    if (f.length != 0) {
        console.error('arrayFill: arity error');
    }
    return arrayIota(k).map(unusedItem => f());
}
// arrayFillWithIndex(5, i => i * i) //= [0, 1, 4, 9, 16]
function arrayFillWithIndex(k, f) {
    if (f.length != 1) {
        console.error('arrayFillWithIndex: arity error');
    }
    return arrayIota(k).map(f);
}
function arrayFilter(anArray, aFunction) {
    return anArray.filter(aFunction);
}
function arrayFind(anArray, aFunction) {
    return anArray.find(aFunction);
}
function arrayFindIndex(anArray, aFunction) {
    return anArray.findIndex(aFunction);
}
function arrayFirst(anArray) {
    return anArray[0];
}
function arrayForEach(anArray, aFunction) {
    anArray.forEach(aFunction);
}
// arrayFromTo(1, 5) //= [1, 2, 3, 4, 5]
function arrayFromTo(from, to) {
    return arrayFromToBy(from, to, 1);
}
// arrayFromToBy(1, 9, 2) //= [1, 3, 5, 7, 9]
function arrayFromToBy(from, to, by) {
    var r = [];
    for (var i = from; i <= to; i += by) {
        r.push(i);
    }
    return r;
}
function arrayIndexOf(anArray, aValue) {
    return anArray.indexOf(aValue);
}
// arrayIota(5) //= [0, 1, 2, 3, 4]
function arrayIota(k) {
    return arrayFromTo(0, k - 1);
}
function arrayLength(anArray) {
    return anArray.length;
}
function arrayMap(anArray, aFunction) {
    return anArray.map(aFunction);
}
// arrayMaxItem([1, 2, 3, 4, 3, 2, 1]) === 4
function arrayMaxItem(anArray) {
    return anArray.reduce((i, j) => Math.max(i, j));
}
// Delete duplicate entries, retain ordering
// arrayNub([1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1]) //= [1, 2, 3, 4]
function arrayNub(anArray) {
    return anArray.filter((item, index) => anArray.indexOf(item) === index);
}
function arrayPush(anArray, aValue) {
    return anArray.push(aValue);
}
// arrayReplicate(5, 1) //= [1, 1, 1, 1, 1]
function arrayReplicate(k, v) {
    return arrayIota(k).map(unusedItem => v);
}
// arrayShallowEq([1, 2, 3], [1, 2, 3]) === true
function arrayShallowEq(lhs, rhs) {
    if (lhs === rhs) {
        return true;
    }
    if (!Array.isArray(rhs) || (lhs.length !== rhs.length)) {
        return false;
    }
    for (var i = 0; i < lhs.length; i++) {
        if (lhs[i] !== rhs[i]) {
            return false;
        }
    }
    return true;
}
function arraySort(anArray, aFunction) {
    return anArray.sort(aFunction);
}
function arraySum(anArray) {
    return anArray.reduce((lhs, rhs) => lhs + rhs);
}
// arrayTail([1, 2, 3, 4]) // => [2, 3, 4]
function arrayTail(anArray) {
    return anArray.slice(1, anArray.length);
}
// arrayTakeWhile([1, 2, 3, 4], x => x < 3) //= [1, 2]
function arrayTakeWhile(anArray, predicate) {
    var [x, ...xs] = anArray;
    if (anArray.length > 0 && predicate(x)) {
        return [x, ...arrayTakeWhile(xs, predicate)];
    }
    else {
        return [];
    }
}
// arrayTranspose([[1, 2, 3], [4, 5, 6]]) //= [[1, 4], [2, 5], [3, 6]]
function arrayTranspose(anArray) {
    return anArray[0].map((col, i) => anArray.map(row => row[i]));
}
// arrayTreeEq([1, 2, [3, [4, 5]]], [1, 2, [3, [4, 5]]])
function arrayTreeEq(lhs, rhs) {
    if (lhs === rhs) {
        return true;
    }
    if (!Array.isArray(rhs) || (lhs.length !== rhs.length)) {
        return false;
    }
    for (var i = 0; i < lhs.length; i++) {
        if (Array.isArray(lhs[i])) {
            if (!arrayTreeEq(lhs[i], rhs[i])) {
                return false;
            }
        }
        else {
            if (lhs[i] !== rhs[i]) {
                return false;
            }
        }
    }
    return true;
}
function arrayUnlines(anArray) {
    return anArray.join('\n');
}
function dictionaryNew() {
    return {};
}
function dictionaryAt(aDictionary, aKey) {
    return aDictionary[aKey];
}
function dictionaryPut(aDictionary, aKey, aValue) {
    aDictionary[aKey] = aValue;
}
// Find key at aDictionary that holds aValue.
function dictionaryFindKeyOfValue(aDictionary, aValue) {
    var predicateFunction = function (aKey) { return aDictionary[aKey] === aValue; };
    return Object.keys(aDictionary).find(predicateFunction);
}
// Make a new dictionary having only the indicated fields copied from the input.
// dictionaryCopyKeys({a: 1, b: 2, c: 3}, ['a', 'c']) //= {a: 1, c: 3}
function dictionaryCopyKeys(aDictionary, keysArray) {
    var answer = dictionaryNew();
    keysArray.forEach(key => answer[key] = aDictionary[key]);
    return answer;
}
// Return a function to set the inner Html of elemId
function setter_for_inner_html_of(elemId) {
    var elem = document.getElementById(elemId);
    return function (innerHtml) {
        if (elem) {
            elem.innerHTML = innerHtml;
        }
        else {
            console.warn('setter_for_inner_html_of: elem was nil?');
        }
    };
}
// Set onchange handler of selectId, guards against absence of selection (proc is only called if value is set).
function select_on_change(selectId, proc) {
    var select = document.getElementById(selectId);
    var guardedProc = function (event) {
        var target = event.target;
        if (target && target.value) {
            proc(target.value);
        }
    };
    select.addEventListener('change', guardedProc);
}
// Create option element and add to select element.
function select_add_option_to(select, value, text) {
    var option = document.createElement('option');
    option.value = value;
    option.text = text;
    select.add(option, null);
}
// Add option to selectId
function select_add_option_at_id(selectId, value, text) {
    var select = document.getElementById(selectId);
    select_add_option_to(select, value, text);
}
// Delete all options at selectId from startIndex
function select_clear_from(selectId, startIndex) {
    var select = document.getElementById(selectId);
    var k = select.length;
    for (var i = startIndex; i < k; i++) {
        select.remove(startIndex);
    }
}
// Add all keys as entries, both value and text, at selectId
function select_add_keys_as_options(selectId, keyArray) {
    var select = document.getElementById(selectId);
    keyArray.forEach(function (key) {
        var option = document.createElement('option');
        option.value = key;
        option.text = key;
        select.add(option, null);
        console.debug('select_add_keys_as_options', key);
    });
}
// Add a listener to buttonId that passes click events to inputId.
function connect_button_to_input(buttonId, inputId) {
    var button = document.getElementById(buttonId);
    var input = document.getElementById(inputId);
    if (!button || !input) {
        console.warn('connect_button_to_input: element not located?');
    }
    else {
        button.addEventListener('click', e => input.click(), false);
    }
}
// If some text is selected, get only the selected text, else get the entire text.
function textarea_get_selection_or_contents(textarea) {
    if (textarea.selectionStart === textarea.selectionEnd) {
        return textarea.value;
    }
    else {
        return textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    }
}
// Lookup key in parameters of Url of current document.  (C.f. window.location)
function url_get_param(key) {
    var params = new URLSearchParams(document.location.search);
    return params.get(key);
}
// Set key to value in window location url.
function window_url_set_param(key, value) {
    var windowUrl = new URL(window.location.href);
    windowUrl.searchParams.set(key, value);
    window.history.pushState({}, '', windowUrl);
}
function encodeUsing(byteCount, writerFunction) {
    var arrayBuffer = new ArrayBuffer(byteCount);
    writerFunction(new DataView(arrayBuffer));
    return new Uint8Array(arrayBuffer);
}
function encodeUint8(aNumber) {
    return encodeUsing(1, b => b.setUint8(0, aNumber));
}
function encodeInt8(aNumber) {
    return encodeUsing(1, b => b.setInt8(0, aNumber));
}
function encodeInt16(aNumber) {
    return encodeUsing(2, b => b.setInt16(0, aNumber));
}
function encodeInt32(aNumber) {
    return encodeUsing(4, b => b.setInt32(0, aNumber));
}
// encodeFloat32(1.0) //= [63, 128, 0, 0]
function encodeFloat32(aNumber) {
    return encodeUsing(4, b => b.setFloat32(0, aNumber));
}
function encodeFloat32Array(inputArray) {
    var arrayBuffer = new ArrayBuffer(inputArray.length * 4);
    var dataView = new DataView(arrayBuffer);
    for (var i = 0; i < inputArray.length; i++) {
        dataView.setFloat32(i * 4, inputArray[i]);
    }
    var uint8Array = new Uint8Array(arrayBuffer);
    console.debug('encodeFloat32Array', inputArray, arrayBuffer, uint8Array);
    return uint8Array;
}
// encodePascalString('string') //= [6, 115, 116, 114, 105, 110, 103]
function encodePascalString(aString) {
    var uint8Array = new Uint8Array(aString.length + 1);
    uint8Array[0] = aString.length;
    for (var i = 1; i < aString.length + 1; i++) {
        uint8Array[i] = aString.charCodeAt(i - 1);
    }
    return uint8Array;
}
// Append timestamp to URL to defeat cache
function url_append_timestamp(url) {
    var ext = ((/\?/).test(url) ? '&' : '?') + (new Date()).getTime();
    return url + ext;
}
// Fetch url with indicated responseType and run proc on result.
function fetch_url_and_then(url, responseType, proc) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', () => proc(request.response));
    request.open('GET', url);
    request.responseType = responseType;
    request.send();
}
// Throw error if response status is not .ok
function handle_fetch_error(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
// Log error and return default value
function log_error_and_return(fromWhere, reason, defaultValue) {
    console.debug(fromWhere, ': ', reason);
    return defaultValue;
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
// Read text file and run proc on result.
function read_text_file_and_then(textFile, proc) {
    var reader = new FileReader();
    reader.addEventListener('load', () => proc(reader.result), false);
    reader.readAsText(textFile);
}
// Read file from input/file at indicated inputId and fileIndex and run proc.
function read_text_file_from_file_input_and_then(inputId, fileIndex, proc) {
    var inputElement = document.getElementById(inputId);
    if (inputElement.files) {
        var inputFile = inputElement.files[fileIndex];
        if (inputFile) {
            read_text_file_and_then(inputFile, proc);
        }
        else {
            console.warn('read_text_file_from_file_input_and_then: no input file at index?');
        }
    }
    else {
        console.warn('read_text_file_from_file_input_and_then: no files at input element?');
    }
}
// Read json file and run proc on parsed result.
function read_json_file_and_then(jsonFile, proc) {
    read_text_file_and_then(jsonFile, jsonText => proc(JSON.parse(jsonText)));
}
// Array of all keys at local storage
function local_storage_keys() {
    var answer = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key) {
            answer.push(key);
        }
        else {
            console.warn('local_storage_keys: null key?');
        }
    }
    return answer;
}
// Delete all keys selected by predicate
function local_storage_delete_matching(predicate) {
    local_storage_keys().forEach(entry => predicate(entry) ? localStorage.removeItem(entry) : null);
}
function isNull(x) {
    return x === null;
}
function isUndefined(x) {
    return x === undefined;
}
// If inputValue is null or undefined log message and return defaultValue, else return inputValue
function nullFix(message, inputValue, defaultValue) {
    if (isNull(inputValue) || isUndefined(inputValue)) {
        console.warn('nullFix', message, inputValue, defaultValue);
        return defaultValue;
    }
    else {
        return inputValue;
    }
}
function isNumber(x) {
    return (typeof x === 'number');
}
var pi = Math.PI;
var inf = Infinity;
function randomInteger(minNumber, maxNumber) {
    var min = Math.ceil(minNumber);
    var max = Math.floor(maxNumber);
    return Math.floor(Math.random() * (max - min) + min); // the maximum is exclusive and the minimum is inclusive
}
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
function randomBoolean() {
    return Math.random() > 0.5;
}
function oscData(t, x) {
    return { type: t, value: x };
}
function oscInt32(x) {
    return oscData('i', x);
}
function oscFloat(x) {
    return oscData('f', x);
}
function oscString(x) {
    return oscData('s', x);
}
function oscBlob(x) {
    return oscData('b', x);
}
var unaryOperators = {
    neg: 0,
    not: 1,
    isNil: 2,
    notNil: 3,
    bitNot: 4,
    abs: 5,
    asFloat: 6,
    asInt: 7,
    ceil: 8,
    floor: 9,
    frac: 10,
    sign: 11,
    squared: 12,
    cubed: 13,
    sqrt: 14,
    exp: 15,
    recip: 16,
    midiCps: 17,
    cpsMidi: 18,
    midiRatio: 19,
    ratioMidi: 20,
    dbAmp: 21,
    ampDb: 22,
    octCps: 23,
    cpsOct: 24,
    log: 25,
    log2: 26,
    log10: 27,
    sin: 28,
    cos: 29,
    tan: 30,
    arcSin: 31,
    arcCos: 32,
    arcTan: 33,
    sinH: 34,
    cosH: 35,
    tanH: 36,
    rand_: 37,
    rand2: 38,
    linRand_: 39,
    biLinRand: 40,
    sum3Rand: 41,
    distort: 42,
    softClip: 43,
    coin: 44,
    digitValue: 45,
    silence: 46,
    thru: 47,
    rectWindow: 48,
    hanWindow: 49,
    welchWindow: 50,
    triWindow: 51,
    ramp_: 52,
    scurve: 53,
};
var binaryOperators = {
    add: 0,
    sub: 1,
    mul: 2,
    idiv: 3,
    fdiv: 4,
    mod: 5,
    eq: 6,
    ne: 7,
    lt: 8,
    gt: 9,
    le: 10,
    ge: 11,
    min: 12,
    max: 13,
    bitAnd: 14,
    bitOr: 15,
    bitXor: 16,
    lcm: 17,
    gcd: 18,
    round: 19,
    roundUp: 20,
    trunc: 21,
    atan2: 22,
    hypot: 23,
    hypotx: 24,
    pow: 25,
    shiftLeft: 26,
    shiftRight: 27,
    unsignedShift: 28,
    fill: 29,
    ring1: 30,
    ring2: 31,
    ring3: 32,
    ring4: 33,
    difSqr: 34,
    sumSqr: 35,
    sqrSum: 36,
    sqrDif: 37,
    absDif: 38,
    thresh: 39,
    amClip: 40,
    scaleNeg: 41,
    clip2: 42,
    excess: 43,
    fold2: 44,
    wrap2: 45,
    firstArg: 46,
    randRange: 47,
    expRandRange: 48,
};
var rateIr = 0;
var rateKr = 1;
var rateAr = 2;
var rateDr = 3;
var rateSelectorTable = { 0: 'ir', 1: 'kr', 2: 'ar', 3: 'dr' };
// rateSelector(rateKr) === 'kr'
function rateSelector(aRate) {
    return rateSelectorTable[String(aRate)];
}
var rate = {
    ir: rateIr,
    kr: rateKr,
    ar: rateAr,
    dr: rateDr,
    selectorTable: rateSelectorTable,
    selector: rateSelector
};
function setAdd(aSet, aValue) {
    aSet.add(aValue);
}
function setHas(aSet, aValue) {
    return aSet.has(aValue);
}
function setFromArray(anArray) {
    return new Set(anArray);
}
function setNew() {
    return new Set();
}
function setToArray(aSet) {
    return Array.from(aSet);
}
var setPut = setAdd;
// isString('string') === true
function isString(x) {
    return typeof x === 'string';
}
function stringLines(aString) {
    return aString.split('\n');
}
function stringIsPrefixOf(lhs, rhs) {
    return rhs.slice(0, lhs.length) === lhs;
}
function isUint8Array(x) {
    return (x instanceof Uint8Array);
}
function uint8ArrayIntoArray(u8Array, numberArray) {
    u8Array.forEach(aNumber => numberArray.push(aNumber));
}
// Flatten a tree of Uint8Array to an array of U8
function flattenByteEncodingToArray(e, a) {
    if (isUint8Array(e)) {
        uint8ArrayIntoArray(e, a);
    }
    else if (Array.isArray(e)) {
        e.forEach(item => flattenByteEncodingToArray(item, a));
    }
    else {
        console.error("flattenByteEncodingTo?", e);
    }
}
function flattenByteEncoding(e) {
    var a = [];
    flattenByteEncodingToArray(e, a);
    return new Uint8Array(a);
}
var sc3_websocket;
// Initialise WebSocket.  To send .stc to sclang as /eval message see 'blksc3 stc-to-osc'
function sc3_websocket_init(host, port) {
    if (sc3_websocket) {
        sc3_websocket.close();
    }
    try {
        var ws_address = 'ws://' + host + ':' + Number(port).toString();
        sc3_websocket = new WebSocket(ws_address);
    }
    catch (err) {
        console.error('sc3_websocket_init: ' + err);
    }
}
// Prompt for WebSocket address (host and port) and initialise WebSocket.
function sc3_websocket_dialog() {
    var reply = window.prompt('Set WebSocket address as Host:Port', 'localhost:9160');
    if (reply) {
        var [host, port] = reply.split(':');
        sc3_websocket_init(host, Number(port));
    }
}
// If websocket is connected, send data.
function sc3_websocket_send(data) {
    if (sc3_websocket && sc3_websocket.readyState === 1) {
        sc3_websocket.send(data);
    }
    else {
        console.error('sc3_websocket_send: websocket nil or not ready?');
    }
}
// requires: sc3-array, sc3-dictionary
// Return the header fields of an audioBuffer.  length is the number of frames.
function audiobuffer_header(audioBuffer) {
    var keysArray = ['length', 'duration', 'sampleRate', 'numberOfChannels'];
    return dictionaryCopyKeys(audioBuffer, keysArray);
}
// Number of frames multiplied by the number of channels.
function audiobuffer_number_of_samples(audioBuffer) {
    return audioBuffer.length * audioBuffer.numberOfChannels;
}
// Get all audio data as an array of Float32Array.
function audiobuffer_channel_data_array(audioBuffer) {
    return arrayIota(audioBuffer.numberOfChannels).map(i => audioBuffer.getChannelData(i));
}
// Interleave data from channelsArray into outputArray.
function interleave_sample_data(numberOfFrames, numberOfChannels, channelsArray, outputArray) {
    for (var i = 0; i < numberOfFrames; i++) {
        for (var j = 0; j < numberOfChannels; j++) {
            outputArray[i * numberOfChannels + j] = channelsArray[j][i];
        }
    }
}
// Get all audio data as an interleaved Float32Array.
function audiobuffer_interleaved_channel_data(audioBuffer) {
    if (audioBuffer.numberOfChannels === 1) {
        return audioBuffer.getChannelData(0);
    }
    else {
        var channelsArray = arrayIota(audioBuffer.numberOfChannels).map(i => audioBuffer.getChannelData(i));
        var outputArray = new Float32Array(audioBuffer.length * audioBuffer.numberOfChannels);
        interleave_sample_data(audioBuffer.length, audioBuffer.numberOfChannels, channelsArray, outputArray);
        return outputArray;
    }
}
function audiobuffer_maximum_absolute_value_and_frame_number_of(audioBuffer) {
    var channelsArray = arrayIota(audioBuffer.numberOfChannels).map(i => audioBuffer.getChannelData(i));
    var maximumValue = 0;
    var frameNumber = 0;
    for (var i = 0; i < audioBuffer.length; i++) {
        for (var j = 0; j < audioBuffer.numberOfChannels; j++) {
            var nextValue = Math.abs(channelsArray[j][i]);
            if (nextValue > maximumValue) {
                maximumValue = nextValue;
                frameNumber = i;
            }
        }
    }
    return [maximumValue, frameNumber];
}
// Get the sample rate of the audio context
function system_samplerate() {
    var audioContext = new window.AudioContext();
    console.log('audioContext.sampleRate', audioContext.sampleRate);
    return audioContext.sampleRate;
}
// Load soundfile from url, decode it, and call proc on the resulting AudioBuffer.
function fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, proc) {
    var audioContext = new window.AudioContext();
    load_arraybuffer_and_then(soundFileUrl, function (arrayBuffer) {
        audioContext.decodeAudioData(arrayBuffer).then(proc);
    });
}
// requires: sc3-io
function stc_is_binary_selector(text) {
    var allowed = Array.from('!%&*+/<=>?@\\~|-');
    var answer = Array.from(text).every(item => allowed.includes(item));
    console.debug('stc_is_binary_selector', text, answer);
    return answer;
}
function stc_binary_selector_from_operator(text) {
    switch (text) {
        case '+': return 'add';
        case '-': return 'sub';
        case '*': return 'mul';
        case '/': return 'fdiv';
        case '%': return 'mod';
        case '==': return 'eq';
        case '!=': return 'neq';
        case '<': return 'lt';
        case '>': return 'gt';
        case '<=': return 'le';
        case '>=': return 'ge';
        case '&': return 'bitAnd';
        case '|': return 'bitOr';
        case '<<': return 'bitShiftLeft';
        case '>>': return 'bitShiftRight';
        case '**': return 'pow';
        default: return text;
    }
}
// Request .stc to .js translation from server, result text is sent to proc (async).
function stc_to_js_and_then(stcText, proc) {
    if (stcText.trim() === '') {
        proc('');
    }
    else {
        var urlPrefix = 'cgi-bin/stsc3-cgi.py?cmd=stc-to-js&stc=';
        var encodedStcText = encodeURIComponent(stcText);
        fetch_url_and_then(urlPrefix + encodedStcText, 'text', proc);
    }
}
