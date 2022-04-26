"use strict";
// sc3-array.ts
function isArray(aValue) {
    return Array.isArray(aValue);
}
function arrayNew(size) {
    return new Array(size);
}
// arrayAppend([1, 2, 3], [4, 5]) //=> [1, 2, 3, 4, 5]
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
    return anArray[index % anArray.length];
}
// arrayChoose([1, 2, 3, 4, 5])
function arrayChoose(anArray) {
    return anArray[Math.floor(Math.random() * anArray.length)];
}
// arrayClump(arrayIota(20), 5)
function arrayClump(anArray, clumpSize) {
    var clumpCount = Math.ceil(anArray.length / clumpSize);
    return arrayIota(clumpCount).map(i => anArray.slice(i * clumpSize, i * clumpSize + clumpSize));
}
// arrayConcat([1, 2, 3], [4, 5, 6]) //= [1, 2, 3, 4, 5, 6] ; c.f. arrayAppend
function arrayConcat(lhs, rhs) {
    return lhs.concat(rhs);
}
// arrayConcatenation([[1, 2, 3], [4, 5]]) //= [1, 2, 3, 4, 5]
function arrayConcatenation(anArray) {
    return anArray.flat(1);
}
function arrayCons(anArray, aValue) {
    return anArray.unshift(aValue);
}
// arrayContainsarray([1, 2, [3, 4]]) === true
function arrayContainsArray(anArray) {
    return anArray.some(item => Array.isArray(item));
}
// x = [1, 2, 3, 4, 5]; y = arrayCopy(x); x[0] = -1; [x, y]
function arrayCopy(anArray) {
    return anArray.slice(0, anArray.length);
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
function arrayEvery(anArray, aPredicate) {
    return anArray.every(aPredicate);
}
// arrayExtendCyclically([1, 2, 3], 8) //= [1, 2, 3, 1, 2, 3, 1, 2]
function arrayExtendCyclically(anArray, size) {
    var initialSize = anArray.length;
    var result = anArray.slice(0, initialSize);
    for (var x = 0; x < size - initialSize; x += 1) {
        result.push(arrayAtWrap(anArray, x));
    }
    return result;
}
// arrayExtendToBeOfEqualSize([[1, 2], [3, 4, 5]]) //= [[1, 2, 1], [3, 4, 5]]
// arrayExtendToBeOfEqualSize([[440, 550], 0]) //= [[440, 550], [0, 0]]
function arrayExtendToBeOfEqualSize(anArray) {
    var maxSize = arrayMaxItem(anArray.map(item => Array.isArray(item) ? item.length : 1));
    return anArray.map(item => arrayExtendCyclically(Array.isArray(item) ? item : [item], maxSize));
}
// arrayFill(5, () => Math.random())
function arrayFill(size, elemProc) {
    if (elemProc.length != 0) {
        console.error('arrayFill: arity error');
    }
    return arrayIota(size).map(unusedItem => elemProc());
}
// arrayFillWithIndex(5, i => i * i) //= [0, 1, 4, 9, 16]
function arrayFillWithIndex(size, elemProc) {
    if (elemProc.length != 1) {
        console.error('arrayFillWithIndex: arity error');
    }
    return arrayIota(size).map(elemProc);
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
    var answer = [];
    for (var i = from; i <= to; i += by) {
        answer.push(i);
    }
    return answer;
}
function arrayIndexOf(anArray, aValue) {
    return anArray.indexOf(aValue);
}
// arrayIota(5) //= [0, 1, 2, 3, 4]
function arrayIota(k) {
    return arrayFromTo(0, k - 1);
}
// x = [1, 2, 3]; arrayInsert([4, 5, 6], x); x //= [1, 2, 3, 4, 5, 6]
function arrayInsert(sourceArray, destinationArray) {
    sourceArray.forEach(item => destinationArray.push(item));
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
function arrayPut(anArray, anIndex, aValue) {
    anArray[anIndex] = aValue;
}
// arrayReplicate(5, 1) //= [1, 1, 1, 1, 1]
function arrayReplicate(k, v) {
    return arrayIota(k).map(unusedItem => v);
}
function arrayReduce(anArray, aFunction) {
    return anArray.reduce(aFunction);
}
// x = [1, 2, 3, 4, 5]; arrayReverseInPlace(x); x
function arrayReverseInPlace(anArray) {
    anArray.reverse();
}
// x = [1, 2, 3, 4, 5]; y = arrayReverse(x); [x, y]
function arrayReverse(anArray) {
    return arrayCopy(anArray).reverse();
}
function arraySecond(anArray) {
    return anArray[1];
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
function arraySize(anArray) {
    return anArray.length;
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
function counterNewFromBy(start, by) {
    var x = start;
    return function () {
        x = x + by;
        return x;
    };
}
function counterNew() {
    return counterNewFromBy(0, 1);
}
function isDictionary(aValue) {
    return (typeof aValue) == 'object';
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
function dictionaryHasKey(aDictionary, aKey) {
    return aDictionary[aKey] !== undefined;
}
// Copy all entries from sourceDictionary to destinationDictionary.
function dictionaryCopyAllFromTo(sourceDictionary, destinationDictionary) {
    Object.entries(sourceDictionary).forEach(([key, value]) => destinationDictionary[key] = value);
}
// Find key at aDictionary that holds aValue.
function dictionaryFindKeyOfValue(aDictionary, aValue) {
    var predicateFunction = function (aKey) {
        return aDictionary[aKey] === aValue;
    };
    return Object.keys(aDictionary).find(predicateFunction);
}
// Make a new dictionary having only the indicated fields copied from the input.
// dictionaryCopyKeys({a: 1, b: 2, c: 3}, ['a', 'c']) //= {a: 1, c: 3}
function dictionaryCopyKeys(aDictionary, keysArray) {
    var answer = dictionaryNew();
    keysArray.forEach(key => answer[key] = aDictionary[key]);
    return answer;
}
// sc3-dom.ts
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
function get_select_element_and_then(selectId, proc) {
    var selectElement = document.getElementById(selectId);
    if (!selectElement) {
        console.error('get_select_element: not found: ', selectId);
    }
    else {
        proc(selectElement);
    }
}
// Set onchange handler of selectId, guards against absence of selection (proc is only called if value is set).
function select_on_change(selectId, proc) {
    var guardedProc = function (anEvent) {
        var target = anEvent.target;
        if (target && target.value) {
            proc(target, target.value);
        }
    };
    get_select_element_and_then(selectId, selectElement => selectElement.addEventListener('change', guardedProc));
}
// Create option element and add to select element.
function select_add_option_to(selectElement, optionValue, optionText) {
    var optionElement = document.createElement('option');
    optionElement.value = optionValue;
    optionElement.text = optionText;
    selectElement.add(optionElement, null);
}
// Add option to selectId
function select_add_option_at_id(selectId, optionValue, optionText) {
    get_select_element_and_then(selectId, selectElement => select_add_option_to(selectElement, optionValue, optionText));
}
// Delete all options at selectId from startIndex
function select_clear_from(selectId, startIndex) {
    get_select_element_and_then(selectId, function (selectElement) {
        var endIndex = selectElement.length;
        for (var i = startIndex; i < endIndex; i++) {
            selectElement.remove(startIndex);
        }
    });
}
// Add all keys as entries, both value and text, at selectId
function select_add_keys_as_options(selectId, keyArray) {
    get_select_element_and_then(selectId, function (selectElement) {
        keyArray.forEach(function (key) {
            var option = document.createElement('option');
            option.value = key;
            option.text = key;
            selectElement.add(option, null);
        });
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
function textarea_get_selection_or_contents(textareaElement) {
    if (textareaElement.selectionStart === textareaElement.selectionEnd) {
        return textareaElement.value;
    }
    else {
        return textareaElement.value.substring(textareaElement.selectionStart, textareaElement.selectionEnd);
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
function parse_int_or_alert(integerText, errorText, defaultAnswer) {
    var answer = Number.parseInt(integerText, 10);
    if (isNaN(answer)) {
        window.alert(errorText);
        return defaultAnswer;
    }
    else {
        return answer;
    }
}
function parse_int_or_alert_and_then(integerText, errorText, proc) {
    var answer = Number.parseInt(integerText, 10);
    if (isNaN(answer)) {
        window.alert(errorText);
    }
    else {
        proc(answer);
    }
}
function prompt_for_int_and_then(promptText, defaultValue, proc) {
    var integerText = window.prompt(promptText, String(defaultValue));
    if (integerText) {
        parse_int_or_alert_and_then(integerText, 'Not an integer?', proc);
    }
}
// sc3-encode.ts
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
// Printing to to the console is slow, even if debugging messages aren't displayed
var sc3_debug = false;
function consoleDebug(...args) {
    if (sc3_debug) {
        console.debug(...args);
    }
}
function consoleWarn(...args) {
    console.warn(...args);
}
function consoleError(...args) {
    console.error(...args);
}
function consoleLog(...args) {
    console.log(...args);
}
function consoleLogMessageFrom(from, text) {
    console.log(from + ': ', text);
}
// [() => null, Math.abs, Math.pow, console.log].map(functionArity) //= [0, 1, 2, 0]
function functionArity(aFunction) {
    return aFunction.length;
}
// sc3-io.ts
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
// sc3-localstorage.ts
// Array of all keys at local storage
function local_storage_keys() {
    var arrayLength = localStorage.length;
    var answer = Array(arrayLength);
    for (var i = 0; i < arrayLength; i++) {
        var key = localStorage.key(i);
        if (key) {
            answer[i] = key;
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
// sc3-null.ts
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
// sc3-number.ts
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
function randomIntegerInclusive(minNumber, maxNumber) {
    var min = Math.ceil(minNumber);
    var max = Math.floor(maxNumber);
    return Math.floor(Math.random() * (max - min + 1) + min); // the maximum is inclusive and the minimum is inclusive
}
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
function randomBoolean() {
    return Math.random() > 0.5;
}
function numberTimesRepeat(count, proc) {
    for (var i = 0; i < count; i++) {
        proc();
    }
}
function numberToString(aNumber) {
    return Number(aNumber).toString();
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
function unaryOperatorName(specialIndex) {
    return Object.keys(unaryOperators).find(key => unaryOperators[key] === specialIndex) || 'unknown unary operator name?';
}
function binaryOperatorName(specialIndex) {
    return Object.keys(binaryOperators).find(key => binaryOperators[key] === specialIndex) || 'unknown binary operator name?';
}
function isQueue(aValue) {
    return aValue.typeString === 'queue';
}
function queueNew() {
    return {
        typeString: 'queue',
        queue: []
    };
}
function queuePush(aQueue, aValue) {
    aQueue.queue.push(aValue);
}
function queuePop(aQueue) {
    return aQueue.queue.pop;
}
// q = queueNew(); [1, 2, 3].forEach(item => queuePush(q, item)); queueAsArray(q) //= [1, 2, 3]
function queueAsArray(aQueue) {
    return aQueue.queue;
}
// sc3-rate.ts
var rateIr = 0;
var rateKr = 1;
var rateAr = 2;
var rateDr = 3;
var rateSelectorTable = {
    0: 'ir',
    1: 'kr',
    2: 'ar',
    3: 'dr'
};
// rateSelector(rateKr) === 'kr'
function rateSelector(aRate) {
    return rateSelectorTable[String(aRate)];
}
// sc3-set.ts
function isSet(aValue) {
    return aValue.toString() == '[object Set]';
}
function setNew() {
    return new Set();
}
function setFromArray(anArray) {
    return new Set(anArray);
}
function setPut(aSet, aValue) {
    aSet.add(aValue);
}
function setIncludes(aSet, aValue) {
    return aSet.has(aValue);
}
function setAsArray(aSet) {
    return Array.from(aSet);
}
// sc3-string.ts
// isString('string') === true
function isString(aValue) {
    return typeof aValue === 'string';
}
// stringIsPrefixOf('str', 'string') === true
function stringIsPrefixOf(aPrefix, aString) {
    return aString.slice(0, aPrefix.length) === aPrefix;
}
function stringLines(aString) {
    return aString.split('\n');
}
// The split method accepts regular expressions, this is a simpler function.
function stringSplitOn(aString, aDelimiter) {
    return aString.split(aDelimiter);
}
function stringUnlines(anArray) {
    return anArray.join('\n');
}
function treeVisit(aTree, visitFunction) {
    if (Array.isArray(aTree)) {
        aTree.forEach(item => treeVisit(item, visitFunction));
    }
    else {
        visitFunction(aTree);
    }
}
function treeFlattenIntoArray(aTree, anArray) {
    treeVisit(aTree, item => anArray.push(item));
}
// treeFlatten(1) //= [1]
// treeFlatten([1, [2, [3, 4], 5], 6]) //= [1, 2, 3, 4, 5, 6]
function treeFlatten(aTree) {
    var anArray = [];
    treeFlattenIntoArray(aTree, anArray);
    return anArray;
}
function forestFlatten(aForest) {
    return treeFlatten(aForest);
}
// sc3-websocket.ts
function websocket_open(host, port) {
    try {
        var ws_address = 'ws://' + host + ':' + Number(port).toString();
        return new WebSocket(ws_address);
    }
    catch (err) {
        console.error('websocket_open: ' + err);
        return null;
    }
}
// Prompt for websocket address (host and port) and call function on answer
function websocket_address_dialog(receiveAddress) {
    var reply = window.prompt('Set WebSocket address as Host:Port', 'localhost:9160');
    if (reply) {
        var [host, port] = reply.split(':');
        receiveAddress(host, Number(port));
    }
}
// If websocket is not null and is connected, send data.
function websocket_send(websocket, data) {
    if (websocket && websocket.readyState === 1) {
        websocket.send(data);
    }
    else {
        console.warn('websocket_send: websocket nil or not ready?');
    }
}
function websocket_close(websocket) {
    if (websocket) {
        websocket.close();
    }
    else {
        console.warn('websocket_close: websocket nil?');
    }
}
var sc3_websocket;
// Initialise WebSocket.  To send .stc to sclang as /eval message see 'blksc3 stc-to-osc'
function sc3_websocket_init(host, port) {
    websocket_close(sc3_websocket);
    sc3_websocket = websocket_open(host, port);
}
function sc3_websocket_dialog() {
    websocket_address_dialog(sc3_websocket_init);
}
function sc3_websocket_send(data) {
    websocket_send(sc3_websocket, data);
}
function splay2(inArray) {
    return Splay2(inArray);
}
function bitShiftLeft(a, b) {
    return shiftLeft(a, b);
}
// Schroeder allpass delay line with cubic interpolation.
function AllpassC(input, maxdelaytime, delaytime, decaytime) {
    return makeUgen('AllpassC', 1, [0], 0, [input, maxdelaytime, delaytime, decaytime]);
}
// Schroeder allpass delay line with linear interpolation.
function AllpassL(input, maxdelaytime, delaytime, decaytime) {
    return makeUgen('AllpassL', 1, [0], 0, [input, maxdelaytime, delaytime, decaytime]);
}
// Schroeder allpass delay line with no interpolation.
function AllpassN(input, maxdelaytime, delaytime, decaytime) {
    return makeUgen('AllpassN', 1, [0], 0, [input, maxdelaytime, delaytime, decaytime]);
}
// Basic psychoacoustic amplitude compensation.
function AmpComp(freq, root, exp) {
    return makeUgen('AmpComp', 1, rateAr, 0, [freq, root, exp]);
}
// Basic psychoacoustic amplitude compensation (ANSI A-weighting curve).
function AmpCompA(freq, root, minAmp, rootAmp) {
    return makeUgen('AmpCompA', 1, rateAr, 0, [freq, root, minAmp, rootAmp]);
}
// Amplitude follower
function Amplitude(input, attackTime, releaseTime) {
    return makeUgen('Amplitude', 1, rateAr, 0, [input, attackTime, releaseTime]);
}
// Stereo signal balancer
function Balance2(left, right, pos, level) {
    return makeUgen('Balance2', 2, [0, 1], 0, [left, right, pos, level]);
}
// Band Pass Filter
function BBandPass(input, freq, bw) {
    return makeUgen('BBandPass', 1, [0], 0, [input, freq, bw]);
}
// Band reject filter
function BBandStop(input, freq, bw) {
    return makeUgen('BBandStop', 1, [0], 0, [input, freq, bw]);
}
// Band limited impulse oscillator.
function Blip(freq, numharm) {
    return makeUgen('Blip', 1, rateAr, 0, [freq, numharm]);
}
// (Undocumented class)
function BlockSize() {
    return makeUgen('BlockSize', 1, rateIr, 0, []);
}
// 12db/oct rolloff - 2nd order resonant Low Pass Filter
function BLowPass(input, freq, rq) {
    return makeUgen('BLowPass', 1, [0], 0, [input, freq, rq]);
}
// Parametric equalizer
function BPeakEQ(input, freq, rq, db) {
    return makeUgen('BPeakEQ', 1, [0], 0, [input, freq, rq, db]);
}
// 2nd order Butterworth bandpass filter.
function BPF(input, freq, rq) {
    return makeUgen('BPF', 1, [0], 0, [input, freq, rq]);
}
// Two zero fixed midpass.
function BPZ2(input) {
    return makeUgen('BPZ2', 1, [0], 0, [input]);
}
// 2nd order Butterworth band reject filter.
function BRF(input, freq, rq) {
    return makeUgen('BRF', 1, [0], 0, [input, freq, rq]);
}
// Two zero fixed midcut.
function BRZ2(input) {
    return makeUgen('BRZ2', 1, [0], 0, [input]);
}
// Brown Noise.
function BrownNoise() {
    return makeUgen('BrownNoise', 1, rateAr, 0, []);
}
// Current duration of soundfile in buffer.
function BufDur(bufnum) {
    return makeUgen('BufDur', 1, rateKr, 0, [bufnum]);
}
// Current number of frames allocated in the buffer.
function BufFrames(bufnum) {
    return makeUgen('BufFrames', 1, rateKr, 0, [bufnum]);
}
// Buffer rate scaling in respect to server samplerate.
function BufRateScale(bufnum) {
    return makeUgen('BufRateScale', 1, rateKr, 0, [bufnum]);
}
// Buffer reading oscillator.
function BufRd(numChan, bufnum, phase, loop, interpolation) {
    return makeUgen('BufRd', numChan, rateAr, 0, [bufnum, phase, loop, interpolation]);
}
// Buffer sample rate.
function BufSampleRate(bufnum) {
    return makeUgen('BufSampleRate', 1, rateKr, 0, [bufnum]);
}
// Buffer writing oscillator.
function BufWr(bufnum, phase, loop, inputArray) {
    return makeUgen('BufWr', 1, [3], 0, arrayConcat([bufnum, phase, loop], (arrayAsArray(inputArray))));
}
// (Undocumented class)
function ClearBuf(buf) {
    return makeUgen('ClearBuf', 1, rateIr, 0, [buf]);
}
// Clip a signal outside given thresholds.
function Clip(input, lo, hi) {
    return makeUgen('Clip', 1, [0], 0, [input, lo, hi]);
}
// Clip Noise.
function ClipNoise() {
    return makeUgen('ClipNoise', 1, rateAr, 0, []);
}
// Statistical gate.
function CoinGate(prob, input) {
    return makeUgen('CoinGate', 1, [1], 0, [prob, input]);
}
// Comb delay line with cubic interpolation.
function CombC(input, maxdelaytime, delaytime, decaytime) {
    return makeUgen('CombC', 1, [0], 0, [input, maxdelaytime, delaytime, decaytime]);
}
// Comb delay line with linear interpolation.
function CombL(input, maxdelaytime, delaytime, decaytime) {
    return makeUgen('CombL', 1, [0], 0, [input, maxdelaytime, delaytime, decaytime]);
}
// Comb delay line with no interpolation.
function CombN(input, maxdelaytime, delaytime, decaytime) {
    return makeUgen('CombN', 1, [0], 0, [input, maxdelaytime, delaytime, decaytime]);
}
// Duration of one block
function ControlDur() {
    return makeUgen('ControlDur', 1, rateIr, 0, []);
}
// Server control rate.
function ControlRate() {
    return makeUgen('ControlRate', 1, rateIr, 0, []);
}
// Real-time convolver.
function Convolution(input, kernel, framesize) {
    return makeUgen('Convolution', 1, rateAr, 0, [input, kernel, framesize]);
}
// Chaotic noise function.
function Crackle(chaosParam) {
    return makeUgen('Crackle', 1, rateAr, 0, [chaosParam]);
}
// Cusp map chaotic generator
function CuspL(freq, a, b, xi) {
    return makeUgen('CuspL', 1, rateAr, 0, [freq, a, b, xi]);
}
// Buffer read demand ugen
function Dbufrd(bufnum, phase, loop) {
    return makeUgen('Dbufrd', 1, rateDr, 0, [bufnum, phase, loop]);
}
// Buffer write demand ugen
function Dbufwr(bufnum, phase, input, loop) {
    return makeUgen('Dbufwr', 1, rateDr, 0, [bufnum, phase, input, loop]);
}
// Create a constant amplitude signal
function DC(input) {
    return makeUgen('DC', 1, rateAr, 0, [input]);
}
// Exponential decay
function Decay(input, decayTime) {
    return makeUgen('Decay', 1, [0], 0, [input, decayTime]);
}
// Exponential decay
function Decay2(input, attackTime, decayTime) {
    return makeUgen('Decay2', 1, [0], 0, [input, attackTime, decayTime]);
}
// Convert signal to modal pitch.
function DegreeToKey(bufnum, input, octave) {
    return makeUgen('DegreeToKey', 1, [1], 0, [bufnum, input, octave]);
}
// Single sample delay.
function Delay1(input) {
    return makeUgen('Delay1', 1, [0], 0, [input]);
}
// Two sample delay.
function Delay2(input) {
    return makeUgen('Delay2', 1, [0], 0, [input]);
}
// Simple delay line with cubic interpolation.
function DelayC(input, maxdelaytime, delaytime) {
    return makeUgen('DelayC', 1, [0], 0, [input, maxdelaytime, delaytime]);
}
// Simple delay line with linear interpolation.
function DelayL(input, maxdelaytime, delaytime) {
    return makeUgen('DelayL', 1, [0], 0, [input, maxdelaytime, delaytime]);
}
// Simple delay line with no interpolation.
function DelayN(input, maxdelaytime, delaytime) {
    return makeUgen('DelayN', 1, [0], 0, [input, maxdelaytime, delaytime]);
}
// Demand results from demand rate UGens.
function Demand(trig, reset, demandUGens) {
    return makeUgen('Demand', arrayLength(arrayAsArray(demandUGens)), [0], 0, arrayConcat([trig, reset], (arrayAsArray(demandUGens))));
}
// Detect when input falls below an amplitude threshold
function DetectSilence(input, amp, time, doneAction) {
    return makeUgen('DetectSilence', 1, [0], 0, [input, amp, time, doneAction]);
}
// Demand rate white noise random generator.
function Diwhite(length, lo, hi) {
    return makeUgen('Diwhite', 1, rateDr, 0, [length, lo, hi]);
}
// Demand rate random sequence generator.
function Drand(repeats, list) {
    return makeUgen('Drand', 1, rateDr, 0, arrayConcat([repeats], (arrayAsArray(list))));
}
// Demand rate sequence generator.
function Dseq(repeats, list) {
    return makeUgen('Dseq', 1, rateDr, 0, arrayConcat([repeats], (arrayAsArray(list))));
}
// Demand rate arithmetic series UGen.
function Dseries(length, start, step) {
    return makeUgen('Dseries', 1, rateDr, 0, [length, start, step]);
}
// Demand rate random sequence generator
function Dshuf(repeats, list) {
    return makeUgen('Dshuf', 1, rateDr, 0, arrayConcat([repeats], (arrayAsArray(list))));
}
// Random impulses.
function Dust(density) {
    return makeUgen('Dust', 1, rateAr, 0, [density]);
}
// Random impulses.
function Dust2(density) {
    return makeUgen('Dust2', 1, rateAr, 0, [density]);
}
// Demand results from demand rate UGens.
function Duty(dur, reset, doneAction, level) {
    return makeUgen('Duty', 1, rateAr, 0, [dur, reset, doneAction, level]);
}
// Plucked physical model.
function DWGPluckedStiff(freq, amp, gate, pos, c1, c3, inp, release, fB) {
    return makeUgen('DWGPluckedStiff', 1, rateAr, 0, [freq, amp, gate, pos, c1, c3, inp, release, fB]);
}
// Envelope generator
function EnvGen(gate, levelScale, levelBias, timeScale, doneAction, envelope) {
    return makeUgen('EnvGen', 1, rateAr, 0, arrayConcat([gate, levelScale, levelBias, timeScale, doneAction], (arrayAsArray(envelope))));
}
// Exponential single random number generator.
function ExpRand(lo, hi) {
    return makeUgen('ExpRand', 1, rateIr, 0, [lo, hi]);
}
// Feedback sine with chaotic phase indexing
function FBSineL(freq, im, fb, a, c, xi, yi) {
    return makeUgen('FBSineL', 1, rateAr, 0, [freq, im, fb, a, c, xi, yi]);
}
// Feedback sine with chaotic phase indexing
function FBSineC(freq, im, fb, a, c, xi, yi) {
    return makeUgen('FBSineC', 1, rateAr, 0, [freq, im, fb, a, c, xi, yi]);
}
// Fast Fourier Transform
function FFT(buffer, input, hop, wintype, active, winsize) {
    return makeUgen('FFT', 1, rateKr, 0, [buffer, input, hop, wintype, active, winsize]);
}
// Fold a signal outside given thresholds.
function Fold(input, lo, hi) {
    return makeUgen('Fold', 1, [0], 0, [input, lo, hi]);
}
// Formant oscillator
function Formant(fundfreq, formfreq, bwfreq) {
    return makeUgen('Formant', 1, rateAr, 0, [fundfreq, formfreq, bwfreq]);
}
// FOF-like filter.
function Formlet(input, freq, attacktime, decaytime) {
    return makeUgen('Formlet', 1, [0], 0, [input, freq, attacktime, decaytime]);
}
// First order filter section.
function FOS(input, a0, a1, b1) {
    return makeUgen('FOS', 1, [0], 0, [input, a0, a1, b1]);
}
// Frequency Shifter.
function FreqShift(input, freq, phase) {
    return makeUgen('FreqShift', 1, rateAr, 0, [input, freq, phase]);
}
// Fast sine oscillator.
function FSinOsc(freq, iphase) {
    return makeUgen('FSinOsc', 1, rateAr, 0, [freq, iphase]);
}
// A reverb
function FreeVerb(input, mix, room, damp) {
    return makeUgen('FreeVerb', 1, [0], 0, [input, mix, room, damp]);
}
// A two-channel reverb
function FreeVerb2(input, in2, mix, room, damp) {
    return makeUgen('FreeVerb2', 2, [0], 0, [input, in2, mix, room, damp]);
}
// Gate or hold.
function Gate(input, trig) {
    return makeUgen('Gate', 1, [0], 0, [input, trig]);
}
// Dynamic stochastic synthesis generator.
function Gendy1(ampdist, durdist, adparam, ddparam, minfreq, maxfreq, ampscale, durscale, initCPs, knum) {
    return makeUgen('Gendy1', 1, rateAr, 0, [ampdist, durdist, adparam, ddparam, minfreq, maxfreq, ampscale, durscale, initCPs, knum]);
}
// Granular synthesis with frequency modulated sine tones
function GrainFM(numChan, trigger, dur, carfreq, modfreq, index, pan, envbufnum, maxGrains) {
    return makeUgen('GrainFM', numChan, rateAr, 0, [trigger, dur, carfreq, modfreq, index, pan, envbufnum, maxGrains]);
}
// Granular synthesis with sine tones
function GrainSin(numChan, trigger, dur, freq, pan, envbufnum, maxGrains) {
    return makeUgen('GrainSin', numChan, rateAr, 0, [trigger, dur, freq, pan, envbufnum, maxGrains]);
}
// Gray Noise.
function GrayNoise() {
    return makeUgen('GrayNoise', 1, rateAr, 0, []);
}
// A two-channel reverb
function GVerb(input, roomsize, revtime, damping, inputbw, spread, drylevel, earlyreflevel, taillevel, maxroomsize) {
    return makeUgen('GVerb', 2, [0], 0, [input, roomsize, revtime, damping, inputbw, spread, drylevel, earlyreflevel, taillevel, maxroomsize]);
}
// Scrambled value with a hash function.
function Hasher(input) {
    return makeUgen('Hasher', 1, [0], 0, [input]);
}
// Henon map chaotic generator
function HenonL(freq, a, b, x0, x1) {
    return makeUgen('HenonL', 1, rateAr, 0, [freq, a, b, x0, x1]);
}
// Henon map chaotic generator
function HenonC(freq, a, b, x0, x1) {
    return makeUgen('HenonC', 1, rateAr, 0, [freq, a, b, x0, x1]);
}
// 2nd order Butterworth highpass filter.
function HPF(input, freq) {
    return makeUgen('HPF', 1, [0], 0, [input, freq]);
}
// Two point difference filter
function HPZ1(input) {
    return makeUgen('HPZ1', 1, [0], 0, [input]);
}
// Two zero fixed midcut.
function HPZ2(input) {
    return makeUgen('HPZ2', 1, [0], 0, [input]);
}
// Inverse Fast Fourier Transform
function IFFT(buffer, wintype, winsize) {
    return makeUgen('IFFT', 1, rateAr, 0, [buffer, wintype, winsize]);
}
// Impulse oscillator.
function Impulse(freq, phase) {
    return makeUgen('Impulse', 1, rateAr, 0, [freq, phase]);
}
// Read a signal from a bus.
function In(numChan, bus) {
    return makeUgen('In', numChan, rateAr, 0, [bus]);
}
// Index into a table with a signal
function Index(bufnum, input) {
    return makeUgen('Index', 1, [1], 0, [bufnum, input]);
}
// Finds the (lowest) point in the Buffer at which the input signal lies in-between the two values
function IndexInBetween(bufnum, input) {
    return makeUgen('IndexInBetween', 1, [1], 0, [bufnum, input]);
}
// Read signal from a bus with a current or one cycle old timestamp.
function InFeedback(numChan, bus) {
    return makeUgen('InFeedback', numChan, rateAr, 0, [bus]);
}
// Tests if a signal is within a given range.
function InRange(input, lo, hi) {
    return makeUgen('InRange', 1, [0], 0, [input, lo, hi]);
}
// Single integer random number generator.
function IRand(lo, hi) {
    return makeUgen('IRand', 1, rateIr, 0, [lo, hi]);
}
// A leaky integrator.
function Integrator(input, coef) {
    return makeUgen('Integrator', 1, [0], 0, [input, coef]);
}
// Control to audio rate converter.
function K2A(input) {
    return makeUgen('K2A', 1, rateAr, 0, [input]);
}
// Respond to the state of a key
function KeyState(keycode, minval, maxval, lag) {
    return makeUgen('KeyState', 1, rateKr, 0, [keycode, minval, maxval, lag]);
}
// Sine oscillator bank
function Klang(freqscale, freqoffset, specificationsArrayRef) {
    return makeUgen('Klang', 1, rateAr, 0, arrayConcat([freqscale, freqoffset], (arrayAsArray(specificationsArrayRef))));
}
// Bank of resonators
function Klank(input, freqscale, freqoffset, decayscale, specificationsArrayRef) {
    return makeUgen('Klank', 1, [0], 0, arrayConcat([input, freqscale, freqoffset, decayscale], (arrayAsArray(specificationsArrayRef))));
}
// random walk linear interp
function LFBrownNoise1(freq, dev, dist) {
    return makeUgen('LFBrownNoise1', 1, rateAr, 0, [freq, dev, dist]);
}
// Clipped noise
function LFClipNoise(freq) {
    return makeUgen('LFClipNoise', 1, rateAr, 0, [freq]);
}
// A sine like shape made of two cubic pieces
function LFCub(freq, iphase) {
    return makeUgen('LFCub', 1, rateAr, 0, [freq, iphase]);
}
// Dynamic ramp noise
function LFDNoise1(freq) {
    return makeUgen('LFDNoise1', 1, rateAr, 0, [freq]);
}
// Dynamic cubic noise
function LFDNoise3(freq) {
    return makeUgen('LFDNoise3', 1, rateAr, 0, [freq]);
}
// Gaussian function oscillator
function LFGauss(duration, width, iphase, loop, doneAction) {
    return makeUgen('LFGauss', 1, rateAr, 0, [duration, width, iphase, loop, doneAction]);
}
// Step noise
function LFNoise0(freq) {
    return makeUgen('LFNoise0', 1, rateAr, 0, [freq]);
}
// Ramp noise
function LFNoise1(freq) {
    return makeUgen('LFNoise1', 1, rateAr, 0, [freq]);
}
// Quadratic noise.
function LFNoise2(freq) {
    return makeUgen('LFNoise2', 1, rateAr, 0, [freq]);
}
// Parabolic oscillator
function LFPar(freq, iphase) {
    return makeUgen('LFPar', 1, rateAr, 0, [freq, iphase]);
}
// pulse oscillator
function LFPulse(freq, iphase, width) {
    return makeUgen('LFPulse', 1, rateAr, 0, [freq, iphase, width]);
}
// Sawtooth oscillator
function LFSaw(freq, iphase) {
    return makeUgen('LFSaw', 1, rateAr, 0, [freq, iphase]);
}
// Triangle oscillator
function LFTri(freq, iphase) {
    return makeUgen('LFTri', 1, rateAr, 0, [freq, iphase]);
}
// 2nd order Butterworth lowpass filter
function LPF(input, freq) {
    return makeUgen('LPF', 1, [0], 0, [input, freq]);
}
// Exponential lag
function Lag(input, lagTime) {
    return makeUgen('Lag', 1, [0], 0, [input, lagTime]);
}
// Exponential lag
function LagUD(input, lagTimeU, lagTimeD) {
    return makeUgen('LagUD', 1, [0], 0, [input, lagTimeU, lagTimeD]);
}
// Exponential lag
function Lag2(input, lagTime) {
    return makeUgen('Lag2', 1, [0], 0, [input, lagTime]);
}
// Exponential lag
function Lag3(input, lagTime) {
    return makeUgen('Lag3', 1, [0], 0, [input, lagTime]);
}
// Exponential lag
function Lag3UD(input, lagTimeU, lagTimeD) {
    return makeUgen('Lag3UD', 1, [0], 0, [input, lagTimeU, lagTimeD]);
}
// Sample and hold
function Latch(input, trig) {
    return makeUgen('Latch', 1, [0], 0, [input, trig]);
}
// Latoocarfian chaotic generator
function LatoocarfianC(freq, a, b, c, d, xi, yi) {
    return makeUgen('LatoocarfianC', 1, rateAr, 0, [freq, a, b, c, d, xi, yi]);
}
// Remove DC
function LeakDC(input, coef) {
    return makeUgen('LeakDC', 1, [0], 0, [input, coef]);
}
// Peak limiter
function Limiter(input, level, dur) {
    return makeUgen('Limiter', 1, [0], 0, [input, level, dur]);
}
// Linear congruential chaotic generator
function LinCongC(freq, a, c, m, xi) {
    return makeUgen('LinCongC', 1, rateAr, 0, [freq, a, c, m, xi]);
}
// Line generator.
function Line(start, end, dur, doneAction) {
    return makeUgen('Line', 1, rateAr, 0, [start, end, dur, doneAction]);
}
// Simple linear envelope generator.
function Linen(gate, attackTime, susLevel, releaseTime, doneAction) {
    return makeUgen('Linen', 1, rateKr, 0, [gate, attackTime, susLevel, releaseTime, doneAction]);
}
// Map a linear range to an exponential range
function LinExp(input, srclo, srchi, dstlo, dsthi) {
    return makeUgen('LinExp', 1, [0], 0, [input, srclo, srchi, dstlo, dsthi]);
}
// Two channel linear pan.
function LinPan2(input, pos, level) {
    return makeUgen('LinPan2', 2, [0], 0, [input, pos, level]);
}
// Skewed random number generator.
function LinRand(lo, hi, minmax) {
    return makeUgen('LinRand', 1, rateIr, 0, [lo, hi, minmax]);
}
// Two channel linear crossfade.
function LinXFade2(inA, inB, pan) {
    return makeUgen('LinXFade2', 1, [0, 1], 0, [inA, inB, pan]);
}
// Allocate a buffer local to the synth
function LocalBuf(numChannels, numFrames) {
    return makeUgen('LocalBuf', 1, rateIr, 0, [numChannels, numFrames]);
}
// Define and read from buses local to a synth.
function LocalIn(numChan, defaultValue) {
    return makeUgen('LocalIn', numChan, rateAr, 0, arrayConcat([], (arrayAsArray(defaultValue))));
}
// Write to buses local to a synth.
function LocalOut(channelsArray) {
    return makeUgen('LocalOut', 0, [0], 0, arrayConcat([], (arrayAsArray(channelsArray))));
}
// Lorenz chaotic generator
function LorenzL(freq, s, r, b, h, xi, yi, zi) {
    return makeUgen('LorenzL', 1, rateAr, 0, [freq, s, r, b, h, xi, yi, zi]);
}
// Two point average filter
function LPZ1(input) {
    return makeUgen('LPZ1', 1, [0], 0, [input]);
}
// Two zero fixed lowpass
function LPZ2(input) {
    return makeUgen('LPZ2', 1, [0], 0, [input]);
}
// Reduce precision.
function MantissaMask(input, bits) {
    return makeUgen('MantissaMask', 1, [0], 0, [input, bits]);
}
// LocalBuf count
function MaxLocalBufs(count) {
    return makeUgen('MaxLocalBufs', 1, rateIr, 0, [count]);
}
// Median filter.
function Median(length, input) {
    return makeUgen('Median', 1, [1], 0, [length, input]);
}
// Minimum difference of two values in modulo arithmetics
function ModDif(x, y, mod) {
    return makeUgen('ModDif', 1, [0], 0, [x, y, mod]);
}
// Moog VCF implementation, designed by Federico Fontana
function MoogFF(input, freq, gain, reset) {
    return makeUgen('MoogFF', 1, [0], 0, [input, freq, gain, reset]);
}
// Mouse button UGen.
function MouseButton(minval, maxval, lag) {
    return makeUgen('MouseButton', 1, rateKr, 0, [minval, maxval, lag]);
}
// Cursor tracking UGen.
function MouseX(minval, maxval, warp, lag) {
    return makeUgen('MouseX', 1, rateKr, 0, [minval, maxval, warp, lag]);
}
// Cursor tracking UGen.
function MouseY(minval, maxval, warp, lag) {
    return makeUgen('MouseY', 1, rateKr, 0, [minval, maxval, warp, lag]);
}
// Multiply add
function MulAdd(input, mul, add) {
    return makeUgen('MulAdd', 1, [0, 1, 2], 0, [input, mul, add]);
}
// Flattens dynamics.
function Normalizer(input, level, dur) {
    return makeUgen('Normalizer', 1, [0], 0, [input, level, dur]);
}
// Sum of uniform distributions.
function NRand(lo, hi, n) {
    return makeUgen('NRand', 1, rateIr, 0, [lo, hi, n]);
}
// Number of output busses.
function NumOutputBuses() {
    return makeUgen('NumOutputBuses', 1, rateIr, 0, []);
}
// One pole filter.
function OnePole(input, coef) {
    return makeUgen('OnePole', 1, [0], 0, [input, coef]);
}
// One zero filter.
function OneZero(input, coef) {
    return makeUgen('OneZero', 1, [0], 0, [input, coef]);
}
// Interpolating wavetable oscillator.
function Osc(bufnum, freq, phase) {
    return makeUgen('Osc', 1, rateAr, 0, [bufnum, freq, phase]);
}
// Write a signal to a bus.
function Out(bus, channelsArray) {
    return makeUgen('Out', 0, [1], 0, arrayConcat([bus], (arrayAsArray(channelsArray))));
}
// Two channel equal power pan.
function Pan2(input, pos, level) {
    return makeUgen('Pan2', 2, [0], 0, [input, pos, level]);
}
// Azimuth panner
function PanAz(numChan, input, pos, level, width, orientation) {
    return makeUgen('PanAz', numChan, [0], 0, [input, pos, level, width, orientation]);
}
// Ambisonic B-format panner.
function PanB(input, azimuth, elevation, gain) {
    return makeUgen('PanB', 4, rateAr, 0, [input, azimuth, elevation, gain]);
}
// Track peak signal amplitude.
function PeakFollower(input, decay) {
    return makeUgen('PeakFollower', 1, [0], 0, [input, decay]);
}
// 3D Perlin Noise
function Perlin3(x, y, z) {
    return makeUgen('Perlin3', 1, rateAr, 0, [x, y, z]);
}
// A resettable linear ramp between two levels.
function Phasor(trig, rate, start, end, resetPos) {
    return makeUgen('Phasor', 1, rateAr, 0, [trig, rate, start, end, resetPos]);
}
// Pink Noise.
function PinkNoise() {
    return makeUgen('PinkNoise', 1, rateAr, 0, []);
}
// Autocorrelation pitch follower
function Pitch(input, initFreq, minFreq, maxFreq, execFreq, maxBinsPerOctave, median, ampThreshold, peakThreshold, downSample, clar) {
    return makeUgen('Pitch', 2, rateKr, 0, [input, initFreq, minFreq, maxFreq, execFreq, maxBinsPerOctave, median, ampThreshold, peakThreshold, downSample, clar]);
}
// Time domain pitch shifter.
function PitchShift(input, windowSize, pitchRatio, pitchDispersion, timeDispersion) {
    return makeUgen('PitchShift', 1, [0], 0, [input, windowSize, pitchRatio, pitchDispersion, timeDispersion]);
}
// Sample playback oscillator.
function PlayBuf(numChan, bufnum, rate, trigger, startPos, loop, doneAction) {
    return makeUgen('PlayBuf', numChan, rateAr, 0, [bufnum, rate, trigger, startPos, loop, doneAction]);
}
// A Karplus-Strong UGen
function Pluck(input, trig, maxdelaytime, delaytime, decaytime, coef) {
    return makeUgen('Pluck', 1, [0], 0, [input, trig, maxdelaytime, delaytime, decaytime, coef]);
}
// Band limited pulse wave.
function Pulse(freq, width) {
    return makeUgen('Pulse', 1, rateAr, 0, [freq, width]);
}
// Pulse counter.
function PulseCount(trig, reset) {
    return makeUgen('PulseCount', 1, [0], 0, [trig, reset]);
}
// Pulse divider.
function PulseDivider(trig, div, start) {
    return makeUgen('PulseDivider', 1, [0], 0, [trig, div, start]);
}
// Pass random bins.
function PV_RandComb(buffer, wipe, trig) {
    return makeUgen('PV_RandComb', 1, rateKr, 0, [buffer, wipe, trig]);
}
// General quadratic map chaotic generator
function QuadL(freq, a, b, c, xi) {
    return makeUgen('QuadL', 1, rateAr, 0, [freq, a, b, c, xi]);
}
// General quadratic map chaotic generator
function QuadC(freq, a, b, c, xi) {
    return makeUgen('QuadC', 1, rateAr, 0, [freq, a, b, c, xi]);
}
// A resonant high pass filter.
function RHPF(input, freq, rq) {
    return makeUgen('RHPF', 1, [0], 0, [input, freq, rq]);
}
// A resonant low pass filter.
function RLPF(input, freq, rq) {
    return makeUgen('RLPF', 1, [0], 0, [input, freq, rq]);
}
// Single random number generator.
function Rand(lo, hi) {
    return makeUgen('Rand', 1, rateIr, 0, [lo, hi]);
}
// Record or overdub into a Buffer.
function RecordBuf(bufnum, offset, recLevel, preLevel, run, loop, trigger, doneAction, inputArray) {
    return makeUgen('RecordBuf', 1, rateAr, 0, arrayConcat([bufnum, offset, recLevel, preLevel, run, loop, trigger, doneAction], (arrayAsArray(inputArray))));
}
// Send signal to a bus, overwriting previous contents.
function ReplaceOut(bus, channelsArray) {
    return makeUgen('ReplaceOut', 0, [1], 0, arrayConcat([bus], (arrayAsArray(channelsArray))));
}
// Resonant filter.
function Resonz(input, freq, bwr) {
    return makeUgen('Resonz', 1, [0], 0, [input, freq, bwr]);
}
// Ringing filter.
function Ringz(input, freq, decaytime) {
    return makeUgen('Ringz', 1, [0], 0, [input, freq, decaytime]);
}
// Track maximum level.
function RunningMax(input, trig) {
    return makeUgen('RunningMax', 1, [0], 0, [input, trig]);
}
// Running sum over n frames
function RunningSum(input, numsamp) {
    return makeUgen('RunningSum', 1, [0], 0, [input, numsamp]);
}
// Rotate a sound field.
function Rotate2(x, y, pos) {
    return makeUgen('Rotate2', 2, [0, 1], 0, [x, y, pos]);
}
// Duration of one sample.
function SampleDur() {
    return makeUgen('SampleDur', 1, rateIr, 0, []);
}
// Server sample rate.
function SampleRate() {
    return makeUgen('SampleRate', 1, rateIr, 0, []);
}
// Band limited sawtooth.
function Saw(freq) {
    return makeUgen('Saw', 1, rateAr, 0, [freq]);
}
// Schmidt trigger.
function Schmidt(input, lo, hi) {
    return makeUgen('Schmidt', 1, [0], 0, [input, lo, hi]);
}
// Select output from an array of inputs.
function Select(which, array) {
    return makeUgen('Select', 1, [0, 1], 0, arrayConcat([which], (arrayAsArray(array))));
}
// Set local buffer
function SetBuf(buf, offset, length, array) {
    return makeUgen('SetBuf', 1, rateIr, 0, arrayConcat([buf, offset, length], (arrayAsArray(array))));
}
// Set-reset flip flop.
function SetResetFF(trig, reset) {
    return makeUgen('SetResetFF', 1, [0, 1], 0, [trig, reset]);
}
// Interpolating sine wavetable oscillator.
function SinOsc(freq, phase) {
    return makeUgen('SinOsc', 1, rateAr, 0, [freq, phase]);
}
// Feedback FM oscillator
function SinOscFB(freq, feedback) {
    return makeUgen('SinOscFB', 1, rateAr, 0, [freq, feedback]);
}
// Slew rate limiter.
function Slew(input, up, dn) {
    return makeUgen('Slew', 1, [0], 0, [input, up, dn]);
}
// Slope of signal
function Slope(input) {
    return makeUgen('Slope', 1, [0], 0, [input]);
}
// Second order filter section (biquad).
function SOS(input, a0, a1, a2, b1, b2) {
    return makeUgen('SOS', 1, [0], 0, [input, a0, a1, a2, b1, b2]);
}
// Pulse counter.
function Stepper(trig, reset, min, max, step, resetval) {
    return makeUgen('Stepper', 1, [0], 0, [trig, reset, min, max, step, resetval]);
}
// Triggered linear ramp
function Sweep(trig, rate) {
    return makeUgen('Sweep', 1, [0], 0, [trig, rate]);
}
// Hard sync sawtooth wave.
function SyncSaw(syncFreq, sawFreq) {
    return makeUgen('SyncSaw', 1, rateAr, 0, [syncFreq, sawFreq]);
}
// Demand results as trigger from demand rate UGens.
function TDuty(dur, reset, doneAction, level, gapFirst) {
    return makeUgen('TDuty', 1, rateAr, 0, [dur, reset, doneAction, level, gapFirst]);
}
// Triggered exponential random number generator.
function TExpRand(lo, hi, trig) {
    return makeUgen('TExpRand', 1, [2], 0, [lo, hi, trig]);
}
// Buffer granulator.
function TGrains(numChan, trigger, bufnum, rate, centerPos, dur, pan, amp, interp) {
    return makeUgen('TGrains', numChan, rateAr, 0, [trigger, bufnum, rate, centerPos, dur, pan, amp, interp]);
}
// Returns time since last triggered.
function Timer(trig) {
    return makeUgen('Timer', 1, [0], 0, [trig]);
}
// Triggered integer random number generator.
function TIRand(lo, hi, trig) {
    return makeUgen('TIRand', 1, [2], 0, [lo, hi, trig]);
}
// Toggle flip flop.
function ToggleFF(trig) {
    return makeUgen('ToggleFF', 1, [0], 0, [trig]);
}
// Triggered random number generator.
function TRand(lo, hi, trig) {
    return makeUgen('TRand', 1, [2], 0, [lo, hi, trig]);
}
// Timed trigger.
function Trig(input, dur) {
    return makeUgen('Trig', 1, [0], 0, [input, dur]);
}
// Timed trigger.
function Trig1(input, dur) {
    return makeUgen('Trig1', 1, [0], 0, [input, dur]);
}
// Two pole filter.
function TwoPole(input, freq, radius) {
    return makeUgen('TwoPole', 1, [0], 0, [input, freq, radius]);
}
// Two zero filter.
function TwoZero(input, freq, radius) {
    return makeUgen('TwoZero', 1, [0], 0, [input, freq, radius]);
}
// Variable duty saw
function VarSaw(freq, iphase, width) {
    return makeUgen('VarSaw', 1, rateAr, 0, [freq, iphase, width]);
}
// artifical reverberator
function VBJonVerb(input, decay, damping, inputbw, erfl, tail) {
    return makeUgen('VBJonVerb', 2, [0], 0, [input, decay, damping, inputbw, erfl, tail]);
}
// The Vibrato oscillator models a slow frequency modulation.
function Vibrato(freq, rate, depth, delay, onset, rateVariation, depthVariation, iphase, trig) {
    return makeUgen('Vibrato', 1, rateAr, 0, [freq, rate, depth, delay, onset, rateVariation, depthVariation, iphase, trig]);
}
// Lose bits of your waves
function WaveLoss(input, drop, outof, mode) {
    return makeUgen('WaveLoss', 1, rateAr, 0, [input, drop, outof, mode]);
}
// White noise.
function WhiteNoise() {
    return makeUgen('WhiteNoise', 1, rateAr, 0, []);
}
// Wrap a signal outside given thresholds.
function Wrap(input, lo, hi) {
    return makeUgen('Wrap', 1, [0], 0, [input, lo, hi]);
}
// Index into a table with a signal.
function WrapIndex(bufnum, input) {
    return makeUgen('WrapIndex', 1, [1], 0, [bufnum, input]);
}
// Equal power two channel cross fade.
function XFade2(inA, inB, pan, level) {
    return makeUgen('XFade2', 1, [0, 1], 0, [inA, inB, pan, level]);
}
// Exponential line generator.
function XLine(start, end, dur, doneAction) {
    return makeUgen('XLine', 1, rateAr, 0, [start, end, dur, doneAction]);
}
// Zero crossing frequency follower
function ZeroCrossing(input) {
    return makeUgen('ZeroCrossing', 1, [0], 0, [input]);
}
// Moog Filter Emulation
function MoogLadder(input, ffreq, res) {
    return makeUgen('MoogLadder', 1, [0], 0, [input, ffreq, res]);
}
// algorithmic delay
function GreyholeRaw(in1, in2, damping, delaytime, diffusion, feedback, moddepth, modfreq, size) {
    return makeUgen('GreyholeRaw', 2, [0, 1], 0, [in1, in2, damping, delaytime, diffusion, feedback, moddepth, modfreq, size]);
}
// class B/AB power amp distortion simulation
function CrossoverDistortion(input, amp, smooth) {
    return makeUgen('CrossoverDistortion', 1, [0], 0, [input, amp, smooth]);
}
// A physical model of a system with dry-friction. A chaotic filter.
function Friction(input, friction, spring, damp, mass, beltmass) {
    return makeUgen('Friction', 1, rateAr, 0, [input, friction, spring, damp, mass, beltmass]);
}
// Waveguide mesh physical models of drum membranes
function MembraneCircle(excitation, tension, loss) {
    return makeUgen('MembraneCircle', 1, rateAr, 0, [excitation, tension, loss]);
}
// vosim pulse generator
function VOSIM(trig, freq, nCycles, decay) {
    return makeUgen('VOSIM', 1, rateAr, 0, [trig, freq, nCycles, decay]);
}
// a resonator
function MiRings(input, trig, pit, struct, bright, damp, pos, model, poly, intern_exciter, easteregg, bypass) {
    return makeUgen('MiRings', 2, rateAr, 0, [input, trig, pit, struct, bright, damp, pos, model, poly, intern_exciter, easteregg, bypass]);
}
// (Undocumented class)
function AnalogFoldOsc(freq, amp) {
    return makeUgen('AnalogFoldOsc', 1, rateAr, 0, [freq, amp]);
}
// rotating clock divider
function RCD(clock, rotate, reset, div, spread, auto, len, down, gates) {
    return makeUgen('RCD', 8, [0], 0, [clock, rotate, reset, div, spread, auto, len, down, gates]);
}
// shuffling clock multiplier
function SCM(clock, bpm, rotate, slip, shuffle, skip, pw) {
    return makeUgen('SCM', 8, rateAr, 0, [clock, bpm, rotate, slip, shuffle, skip, pw]);
}
// (Undocumented class)
function DustRange(iotMin, iotMax) {
    return makeUgen('DustRange', 1, rateAr, 0, [iotMin, iotMax]);
}
// (Undocumented class)
function ExpRandN(numChan, lo, hi) {
    return makeUgen('ExpRandN', numChan, rateIr, 0, [lo, hi]);
}
// (Undocumented class)
function LinRandN(numChan, lo, hi, minmax) {
    return makeUgen('LinRandN', numChan, rateIr, 0, [lo, hi, minmax]);
}
// (Undocumented class)
function RandN(numChan, lo, hi) {
    return makeUgen('RandN', numChan, rateIr, 0, [lo, hi]);
}
// (Undocumented class)
function TScramble(trigger, inputs) {
    return makeUgen('TScramble', arrayLength(arrayAsArray(inputs)), [0], 0, arrayConcat([trigger], (arrayAsArray(inputs))));
}
// (Undocumented class)
function DX7(bufnum, on, off, data, vc, mnn, vel, pw, mw, bc, fc) {
    return makeUgen('DX7', 1, rateAr, 0, [bufnum, on, off, data, vc, mnn, vel, pw, mw, bc, fc]);
}
// (Undocumented class)
function RDX7Env(gate, data, r1, r2, r3, r4, l1, l2, l3, l4, ol) {
    return makeUgen('RDX7Env', 1, rateAr, 0, [gate, data, r1, r2, r3, r4, l1, l2, l3, l4, ol]);
}
// (Undocumented class)
function ObxdFilter(input, cutoff, resonance, multimode, bandpass, fourpole) {
    return makeUgen('ObxdFilter', 1, [0], 0, [input, cutoff, resonance, multimode, bandpass, fourpole]);
}
// (Undocumented class)
function SvfBp(input, freq, q) {
    return makeUgen('SvfBp', 1, rateAr, 0, [input, freq, q]);
}
// (Undocumented class)
function SvfHp(input, freq, q) {
    return makeUgen('SvfHp', 1, [0], 0, [input, freq, q]);
}
// (Undocumented class)
function SvfLp(input, freq, q) {
    return makeUgen('SvfLp', 1, rateAr, 0, [input, freq, q]);
}
// (Undocumented class)
function Bezier(haltAfter, dx, freq, phase, param) {
    return makeUgen('Bezier', 1, rateAr, 0, arrayConcat([haltAfter, dx, freq, phase], (arrayAsArray(param))));
}
// (Undocumented class)
function Freezer(bufnum, left, right, gain, increment, incrementOffset, incrementRandom, rightRandom, syncPhaseTrigger, randomizePhaseTrigger, numberOfLoops) {
    return makeUgen('Freezer', 1, rateAr, 0, [bufnum, left, right, gain, increment, incrementOffset, incrementRandom, rightRandom, syncPhaseTrigger, randomizePhaseTrigger, numberOfLoops]);
}
// (Undocumented class)
function ShufflerB(bufnum, readLocationMinima, readLocationMaxima, readIncrementMinima, readIncrementMaxima, durationMinima, durationMaxima, envelopeAmplitudeMinima, envelopeAmplitudeMaxima, envelopeShapeMinima, envelopeShapeMaxima, envelopeSkewMinima, envelopeSkewMaxima, stereoLocationMinima, stereoLocationMaxima, interOffsetTimeMinima, interOffsetTimeMaxima, ftableReadLocationIncrement, readIncrementQuanta, interOffsetTimeQuanta) {
    return makeUgen('ShufflerB', 2, rateAr, 0, [bufnum, readLocationMinima, readLocationMaxima, readIncrementMinima, readIncrementMaxima, durationMinima, durationMaxima, envelopeAmplitudeMinima, envelopeAmplitudeMaxima, envelopeShapeMinima, envelopeShapeMaxima, envelopeSkewMinima, envelopeSkewMaxima, stereoLocationMinima, stereoLocationMaxima, interOffsetTimeMinima, interOffsetTimeMaxima, ftableReadLocationIncrement, readIncrementQuanta, interOffsetTimeQuanta]);
}
function add(a, b) { return BinaryOp(0, a, b); }
function sub(a, b) { return BinaryOp(1, a, b); }
function mul(a, b) { return BinaryOp(2, a, b); }
function idiv(a, b) { return BinaryOp(3, a, b); }
function fdiv(a, b) { return BinaryOp(4, a, b); }
function mod(a, b) { return BinaryOp(5, a, b); }
function eq(a, b) { return BinaryOp(6, a, b); }
function ne(a, b) { return BinaryOp(7, a, b); }
function lt(a, b) { return BinaryOp(8, a, b); }
function gt(a, b) { return BinaryOp(9, a, b); }
function le(a, b) { return BinaryOp(10, a, b); }
function ge(a, b) { return BinaryOp(11, a, b); }
function min(a, b) { return BinaryOp(12, a, b); }
function max(a, b) { return BinaryOp(13, a, b); }
function bitAnd(a, b) { return BinaryOp(14, a, b); }
function bitOr(a, b) { return BinaryOp(15, a, b); }
function bitXor(a, b) { return BinaryOp(16, a, b); }
function lcm(a, b) { return BinaryOp(17, a, b); }
function gcd(a, b) { return BinaryOp(18, a, b); }
function round(a, b) { return BinaryOp(19, a, b); }
function roundUp(a, b) { return BinaryOp(20, a, b); }
function trunc(a, b) { return BinaryOp(21, a, b); }
function atan2(a, b) { return BinaryOp(22, a, b); }
function hypot(a, b) { return BinaryOp(23, a, b); }
function hypotx(a, b) { return BinaryOp(24, a, b); }
function pow(a, b) { return BinaryOp(25, a, b); }
function shiftLeft(a, b) { return BinaryOp(26, a, b); }
function shiftRight(a, b) { return BinaryOp(27, a, b); }
function unsignedShift(a, b) { return BinaryOp(28, a, b); }
function fill(a, b) { return BinaryOp(29, a, b); }
function ring1(a, b) { return BinaryOp(30, a, b); }
function ring2(a, b) { return BinaryOp(31, a, b); }
function ring3(a, b) { return BinaryOp(32, a, b); }
function ring4(a, b) { return BinaryOp(33, a, b); }
function difSqr(a, b) { return BinaryOp(34, a, b); }
function sumSqr(a, b) { return BinaryOp(35, a, b); }
function sqrSum(a, b) { return BinaryOp(36, a, b); }
function sqrDif(a, b) { return BinaryOp(37, a, b); }
function absDif(a, b) { return BinaryOp(38, a, b); }
function thresh(a, b) { return BinaryOp(39, a, b); }
function amClip(a, b) { return BinaryOp(40, a, b); }
function scaleNeg(a, b) { return BinaryOp(41, a, b); }
function clip2(a, b) { return BinaryOp(42, a, b); }
function excess(a, b) { return BinaryOp(43, a, b); }
function fold2(a, b) { return BinaryOp(44, a, b); }
function wrap2(a, b) { return BinaryOp(45, a, b); }
function firstArg(a, b) { return BinaryOp(46, a, b); }
function randRange(a, b) { return BinaryOp(47, a, b); }
function expRandRange(a, b) { return BinaryOp(48, a, b); }
function neg(a) { return UnaryOp(0, a); }
function not(a) { return UnaryOp(1, a); }
function isNil(a) { return UnaryOp(2, a); }
function notNil(a) { return UnaryOp(3, a); }
function bitNot(a) { return UnaryOp(4, a); }
function abs(a) { return UnaryOp(5, a); }
function asFloat(a) { return UnaryOp(6, a); }
function asInt(a) { return UnaryOp(7, a); }
function ceil(a) { return UnaryOp(8, a); }
function floor(a) { return UnaryOp(9, a); }
function frac(a) { return UnaryOp(10, a); }
function sign(a) { return UnaryOp(11, a); }
function squared(a) { return UnaryOp(12, a); }
function cubed(a) { return UnaryOp(13, a); }
function sqrt(a) { return UnaryOp(14, a); }
function exp(a) { return UnaryOp(15, a); }
function recip(a) { return UnaryOp(16, a); }
function midiCps(a) { return UnaryOp(17, a); }
function cpsMidi(a) { return UnaryOp(18, a); }
function midiRatio(a) { return UnaryOp(19, a); }
function ratioMidi(a) { return UnaryOp(20, a); }
function dbAmp(a) { return UnaryOp(21, a); }
function ampDb(a) { return UnaryOp(22, a); }
function octCps(a) { return UnaryOp(23, a); }
function cpsOct(a) { return UnaryOp(24, a); }
function log(a) { return UnaryOp(25, a); }
function log2(a) { return UnaryOp(26, a); }
function log10(a) { return UnaryOp(27, a); }
function sin(a) { return UnaryOp(28, a); }
function cos(a) { return UnaryOp(29, a); }
function tan(a) { return UnaryOp(30, a); }
function arcSin(a) { return UnaryOp(31, a); }
function arcCos(a) { return UnaryOp(32, a); }
function arcTan(a) { return UnaryOp(33, a); }
function sinh(a) { return UnaryOp(34, a); }
function cosh(a) { return UnaryOp(35, a); }
function tanh(a) { return UnaryOp(36, a); }
function rand_(a) { return UnaryOp(37, a); }
function rand2_(a) { return UnaryOp(38, a); }
function linRand_(a) { return UnaryOp(39, a); }
function biLinRand(a) { return UnaryOp(40, a); }
function sum3Rand(a) { return UnaryOp(41, a); }
function distort(a) { return UnaryOp(42, a); }
function softClip(a) { return UnaryOp(43, a); }
function coin(a) { return UnaryOp(44, a); }
function digitValue(a) { return UnaryOp(45, a); }
function silence(a) { return UnaryOp(46, a); }
function thru(a) { return UnaryOp(47, a); }
function rectWindow(a) { return UnaryOp(48, a); }
function hanWindow(a) { return UnaryOp(49, a); }
function welchWindow(a) { return UnaryOp(50, a); }
function triWindow(a) { return UnaryOp(51, a); }
function ramp_(a) { return UnaryOp(52, a); }
function scurve(a) { return UnaryOp(53, a); }
function audiobuffer_to_scsynth_buffer(audioBuffer, bufferNumber, numberOfChannels, bufferData) {
    var numberOfFrames = audioBuffer.length;
    var sampleRate = audioBuffer.sampleRate;
    var oscMessage = b_alloc_then_memcpy(bufferNumber, numberOfFrames, numberOfChannels, sampleRate, encodeFloat32Array(bufferData));
    console.log('audiobuffer_to_scsynth_buffer', oscMessage);
    sendOsc(oscMessage);
}
// Fetch sound file data, and then allocate a buffer and memcpy all interleaved channel data.
function fetch_soundfile_to_scsynth_buffer(soundFileUrl, numberOfChannels, bufferNumber) {
    fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, function (audioBuffer) {
        if (audioBuffer.numberOfChannels === numberOfChannels) {
            audiobuffer_to_scsynth_buffer(audioBuffer, bufferNumber, numberOfChannels, audiobuffer_interleaved_channel_data(audioBuffer));
        }
        else {
            console.error('fetch_soundfile_to_scsynth_buffer: numberOfChannels mismatch');
        }
    });
}
// Fetch single channels of sound file data to mono ssynth buffers.  The channel numbers are one-indexed.
function fetch_soundfile_channels_to_scsynth_buffers(soundFileUrl, bufferNumbers, channelIndices) {
    fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, function (audioBuffer) {
        for (var i = 0; i < bufferNumbers.length; i++) {
            var bufferNumber = bufferNumbers[i];
            var channelIndex = channelIndices[i];
            if (channelIndex >= 1 && channelIndex <= audioBuffer.numberOfChannels) {
                audiobuffer_to_scsynth_buffer(audioBuffer, bufferNumber, 1, audioBuffer.getChannelData(channelIndex - 1));
            }
            else {
                console.error('fetch_soundfile_channels_to_scsynth_buffers: channelIndex out of bounds', channelIndex, audioBuffer.numberOfChannels);
            }
        }
    });
}
var sc3_buffer_dict = {
    'crotale-d6': 'https://rohandrape.net/pub/jssc3/flac/crotale-d6.flac',
    'harp-a4': 'https://rohandrape.net/pub/jssc3/flac/harp-a4.flac',
    'piano-c5': 'https://rohandrape.net/pub/jssc3/flac/piano-c5.flac',
    'floating_1': 'https://rohandrape.net/pub/jssc3/flac/floating_1.flac',
    'then': 'https://rohandrape.net/pub/jssc3/flac/then.flac'
};
var sc3_buffer_cache = {};
var sc3_buffer_next = 100;
// Fetch buffer index from cache, allocate and load if required.  Resolve soundFileId against dictionary.
function SfAcquire(urlOrKey, numberOfChannels, channelSelector) {
    var channelIndices = arrayAsArray(channelSelector);
    var soundFileUrl = sc3_buffer_dict[urlOrKey] || urlOrKey;
    var cacheValue = sc3_buffer_cache[soundFileUrl];
    if (!cacheValue) {
        var bufferNumberArray = arrayFromTo(sc3_buffer_next, sc3_buffer_next + numberOfChannels - 1);
        fetch_soundfile_channels_to_scsynth_buffers(soundFileUrl, bufferNumberArray, channelIndices);
        sc3_buffer_cache[soundFileUrl] = bufferNumberArray;
        sc3_buffer_next += numberOfChannels;
        cacheValue = bufferNumberArray;
    }
    if (Array.isArray(channelIndices)) {
        return channelIndices.map(item => arrayAtWrap(cacheValue, item - 1));
    }
    else {
        return [arrayAtWrap(cacheValue, channelIndices - 1)];
    }
}
var envCurveDictionary = {
    step: 0,
    lin: 1, linear: 1,
    exp: 2, exponential: 2,
    sin: 3, sine: 3,
    wel: 4, welch: 4,
    sqr: 6, squared: 6,
    cub: 7, cubed: 7,
    hold: 8
};
// envCoord(Env([0, 1, 0], [0.1, 0.9], 'lin', null, null, 0)) // => [0, 2, -99, -99, 1, 0.1, 1, 0, 0, 0.9, 1, 0]
function Env(levels, times, curves, releaseNode, loopNode, offset) {
    return {
        levels: levels,
        times: times,
        curves: Array.isArray(curves) ? curves : [curves],
        releaseNode: releaseNode,
        loopNode: loopNode,
        offset: offset
    };
}
function envCoord(env) {
    var segmentCount = arrayLength(env.levels) - 1;
    var answerQueue = queueNew();
    var store = function (aValue) { queuePush(answerQueue, aValue); };
    store(env.levels[0]);
    store(segmentCount);
    store(env.releaseNode || -99);
    store(env.loopNode || -99);
    for (var i = 0; i < segmentCount; i++) {
        var c = arrayAtWrap(env.curves, i);
        store(env.levels[i + 1]);
        store(arrayAtWrap(env.times, i));
        store(isString(c) ? envCurveDictionary[c] : 5);
        store(isString(c) ? 0 : c);
    }
    return queueAsArray(answerQueue);
}
function EnvADSR(attackTime, decayTime, sustainLevel, releaseTime, peakLevel, curve) {
    return Env([0, peakLevel, mul(peakLevel, sustainLevel), 0], [attackTime, decayTime, releaseTime], curve, 2, null, 0);
}
function EnvASR(attackTime, sustainLevel, releaseTime, curve) {
    return Env([0, sustainLevel, 0], [attackTime, releaseTime], curve, 1, null, 0);
}
function EnvCutoff(sustainTime, releaseTime, curve) {
    return Env([1, 1, 0], [sustainTime, releaseTime], curve, null, null, 0);
}
function EventParam(v, u) {
    return {
        v: v,
        w: u[0],
        x: u[1],
        y: u[2],
        z: u[3],
        o: u[4],
        rx: u[5],
        ry: u[6],
        p: u[7],
        px: u[8]
    };
}
function eventV(e) { return e.v; }
function eventW(e) { return e.w; }
function eventX(e) { return e.x; }
function eventY(e) { return e.y; }
function eventZ(e) { return e.z; }
function eventO(e) { return e.o; }
function eventRx(e) { return e.rx; }
function eventRy(e) { return e.ry; }
function eventP(e) { return e.p; }
// Control bus address of voiceNumber (indexed from one).
function voiceAddr(voiceNumber) {
    var eventAddr = 13000;
    var eventIncr = 10;
    var eventZero = 0;
    var voiceAddr = eventAddr + ((voiceNumber - 1 + eventZero) * eventIncr);
    return voiceAddr;
}
function Voicer(numVoices, voiceFunc) {
    var voiceOffset = 0;
    return arrayFromTo(1, numVoices).map(function (c) {
        var controlArray = ControlIn(9, voiceAddr(c + voiceOffset));
        return voiceFunc(EventParam(c + voiceOffset, controlArray));
    });
}
function eventParamSetMessage(e) {
    return c_setn1(voiceAddr(e.v), [e.w, e.x, e.y, e.z, e.o, e.rx, e.ry, e.p, e.px]);
}
function voiceEndMessage(voiceNumber) {
    return c_set1(voiceAddr(voiceNumber), 0);
}
// Kyma keyboard names, all values are 0-1
function KeyDown(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 0); }
function KeyTimbre(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 2); }
function KeyPressure(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 3); }
function KeyVelocity(voiceNumber) { return Latch(KeyPressure(voiceNumber), KeyDown(voiceNumber)); }
function KeyPitch(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 7); }
// Kyma pen names, all values are 0-1
function PenDown(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 0); }
function PenX(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 1); }
function PenY(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 2); }
function PenZ(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 3); }
function PenAngle(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 4); }
function PenRadius(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 5); }
// sc3-graph.ts
// traverse graph from p adding leaf nodes to the set c
// w protects from loops in mrg (when recurring in traversing mrg elements w is set to c).
function ugenTraverseCollecting(p, c, w) {
    if (Array.isArray(p)) {
        consoleDebug('ugenTraverseCollecting: array', p);
        arrayForEach(p, item => ugenTraverseCollecting(item, c, w));
    }
    else if (isUgenOutput(p)) {
        var pUgenOutput = p;
        var mrgArray = queueAsArray(pUgenOutput.ugen.mrg);
        consoleDebug('ugenTraverseCollecting: port', pUgenOutput);
        if (!setIncludes(w, pUgenOutput.ugen)) {
            setPut(c, pUgenOutput.ugen);
            arrayForEach(pUgenOutput.ugen.inputValues, item => isNumber(item) ? setPut(c, item) : ugenTraverseCollecting(item, c, w));
            arrayForEach(mrgArray, item => isNumber(item) ? setPut(c, item) : ugenTraverseCollecting(item, c, c));
        }
    }
    else {
        console.error('ugenTraverseCollecting', p, c, w);
    }
}
// all leaf nodes of p
function ugenGraphLeafNodes(p) {
    var c = setNew();
    ugenTraverseCollecting(p, c, setNew());
    return setAsArray(c);
}
function ugenCompare(i, j) {
    return i.ugenId - j.ugenId;
}
// This should check that signal is not a tree of numbers...
function signalToUgenGraph(signal) {
    return signal;
}
// ugens are sorted by id, which is in applicative order. a maxlocalbufs ugen is always present.
function makeGraph(name, signal) {
    var graph = signalToUgenGraph(signal);
    var leafNodes = ugenGraphLeafNodes(graph);
    var ugens = arraySort(arrayFilter(leafNodes, isUgenPrimitive), ugenCompare);
    var constants = arrayFilter(leafNodes, isNumber);
    var numLocalBufs = arrayLength(arrayFilter(ugens, item => item.ugenName === 'LocalBuf'));
    var MaxLocalBufs = function (count) {
        return makeUgenPrimitive('MaxLocalBufs', 1, rateIr, 0, [count]);
    };
    return {
        graphName: name,
        ugenSeq: arrayAppend([MaxLocalBufs(numLocalBufs)], ugens),
        constantSeq: arraySort(arrayNub(arrayAppend([numLocalBufs], constants)), (i, j) => i - j)
    };
}
function graphConstantIndex(graph, constantValue) {
    return arrayIndexOf(graph.constantSeq, constantValue);
}
// lookup ugen index at graph given ugenId
function graphUgenIndex(graph, ugenId) {
    return arrayFindIndex(graph.ugenSeq, ugen => ugen.ugenId === ugenId);
}
function graphUgenInputSpec(graph, input) {
    if (isUgenOutput(input)) {
        var port = input;
        return [graphUgenIndex(graph, port.ugen.ugenId), port.index];
    }
    else {
        return [-1, graphConstantIndex(graph, input)];
    }
}
var SCgf = Number(1396926310);
function graphEncodeUgenSpec(graph, ugen) {
    return [
        encodePascalString(ugen.ugenName),
        encodeInt8(ugen.ugenRate),
        encodeInt32(arrayLength(ugen.inputValues)),
        encodeInt32(ugen.numChan),
        encodeInt16(ugen.specialIndex),
        arrayMap(ugen.inputValues, input => arrayMap(graphUgenInputSpec(graph, input), index => encodeInt32(index))),
        arrayReplicate(ugen.numChan, encodeInt8(ugen.ugenRate))
    ];
}
function graphEncodeSyndef(graph) {
    return flattenByteEncoding([
        encodeInt32(SCgf),
        encodeInt32(2),
        encodeInt16(1),
        encodePascalString(graph.graphName),
        encodeInt32(arrayLength(graph.constantSeq)),
        arrayMap(graph.constantSeq, item => encodeFloat32(item)),
        encodeInt32(0),
        encodeInt32(0),
        encodeInt32(arrayLength(graph.ugenSeq)),
        arrayMap(graph.ugenSeq, item => graphEncodeUgenSpec(graph, item)),
        encodeInt16(0) // # variants
    ]);
}
// sc3-graph-print.ts
function graphPrintUgenSpec(graph, ugen) {
    consoleLog(ugen.ugenName, ugen.ugenRate, arrayLength(ugen.inputValues), ugen.numChan, ugen.specialIndex, arrayMap(ugen.inputValues, input => graphUgenInputSpec(graph, input)), arrayReplicate(ugen.numChan, ugen.ugenRate));
}
function graphPrintSyndef(graph) {
    console.log(SCgf, 2, 1, graph.graphName, arrayLength(graph.constantSeq), graph.constantSeq, 0, [], 0, [], arrayLength(graph.ugenSeq));
    arrayForEach(graph.ugenSeq, item => graphPrintUgenSpec(graph, item));
    console.log(0, []);
}
function printSyndefOf(ugen) {
    var graph = makeGraph('sc3.js', wrapOut(0, ugen));
    graphPrintSyndef(graph);
}
function graphInputDisplayName(graph, input) {
    if (isUgenOutput(input)) {
        var id = String(graphUgenIndex(graph, input.ugen.ugenId));
        var nm = ugenDisplayName(input.ugen);
        var ix = input.ugen.numChan > 1 ? ('[' + String(input.index) + ']') : '';
        return id + '_' + nm + ix;
    }
    else if (isNumber(input)) {
        return String(input);
    }
    else {
        console.error('graphInputDisplayName', input);
        return '?';
    }
}
function graphPrettyPrintUgen(graph, ugen) {
    console.log(graphUgenIndex(graph, ugen.ugenId) + '_' + ugenDisplayName(ugen), rateSelector(ugen.ugenRate), '[' + String(arrayMap(ugen.inputValues, input => graphInputDisplayName(graph, input))) + ']');
}
function graphPrettyPrintSyndef(graph) {
    arrayForEach(graph.ugenSeq, item => graphPrettyPrintUgen(graph, item));
}
function prettyPrintSyndefOf(ugen) {
    var graph = makeGraph('sc3.js', wrapOut(0, ugen));
    graphPrettyPrintSyndef(graph);
}
// column_index_to_letter(6) === 'g'
function column_index_to_letter(column_index) {
    if (isNumber(column_index)) {
        var column_letter = String.fromCharCode(column_index + 97); // 0 -> a
        return column_letter;
    }
    else {
        console.error('column_index_to_letter: not a number?', column_index);
        return '?';
    }
}
// column_letter_to_index('g') === 6
function column_letter_to_index(column_letter) {
    if (isString(column_letter)) {
        var column_index = column_letter.charCodeAt(0) - 97;
        return column_index;
    }
    else {
        console.error('sc3_supercalc_column_letter_to_index: not a string?', column_letter);
        return -1;
    }
}
// cellref_to_bus(10, 'a', 4)
function cellref_to_linear_index(number_of_columns, column_letter, row_number) {
    var column_index = column_letter_to_index(column_letter);
    return ((row_number - 1) * number_of_columns) + column_index;
}
// apply proc (column_letter, row_number) for each cell in evaluation order (right to left in each row descending)
function all_cellref_do(number_of_columns, number_of_rows, proc) {
    for (var row_number = 1; row_number <= number_of_rows; row_number++) {
        for (var column_index = 0; column_index < number_of_columns; column_index++) {
            var column_letter = column_index_to_letter(column_index);
            proc(column_letter, row_number);
        }
    }
}
var sc3_plaintext;
function sc3_plaintext_init_in(parentId) {
    var parentElement = document.getElementById(parentId);
    if (parentElement) {
        sc3_plaintext = document.createElement('textarea');
        sc3_plaintext.setAttribute("id", "jsProgram");
        parentElement.appendChild(sc3_plaintext);
    }
    else {
        console.error('sc3_plaintext_init_in');
    }
}
function sc3_plaintext_get_complete_text() {
    return sc3_plaintext ? sc3_plaintext.value : '';
}
function sc3_plaintext_get_selected_text() {
    var currentText = textarea_get_selection_or_contents(sc3_plaintext).trim();
    if (currentText.length === 0) {
        console.warn('sc3_plaintext_get_selected_text: empty text');
    }
    return currentText;
}
function sc3_plaintext_set_text(programText) {
    sc3_plaintext.value = programText;
}
function editor_get_js_notation_and_then(proc) {
    translate_if_required_and_then(sc3_plaintext_get_selected_text(), proc);
}
// sc3-pointer.ts
function PointerW(n) {
    return ControlIn(1, 15001 + (n * 10));
}
function PointerX(n) {
    return ControlIn(1, 15002 + (n * 10));
}
function PointerY(n) {
    return ControlIn(1, 15003 + (n * 10));
}
/*
Web Assembly scsynth does not include the Mouse unit generators.
*/
function pointerMouseX(minval, maxval, warp, lag) {
    switch (warp) {
        case 0: return LinLin(Lag(PointerX(0), lag), 0, 1, minval, maxval);
        case 1: return LinExp(Lag(PointerX(0), lag), 0, 1, minval, maxval);
        default:
            console.error('MouseX: unknown warp', warp);
            return 0;
    }
}
function pointerMouseY(minval, maxval, warp, lag) {
    switch (warp) {
        case 0: return LinLin(Lag(PointerY(0), lag), 0, 1, minval, maxval);
        case 1: return LinExp(Lag(PointerY(0), lag), 0, 1, minval, maxval);
        default:
            console.error('MouseY: unknown warp', warp);
            return 0;
    }
}
function pointerMouseButton(minval, maxval, lag) {
    return LinLin(Lag(PointerW(0), lag), 0, 1, minval, maxval);
}
// sc3-pseudo.ts ; requries:  sc3-envelope sc3-ugen
// wrapOut(0, mul(SinOsc(440, 0), 0.1))
function wrapOut(bus, ugen) {
    return isOutUgen(ugen) ? ugen : Out(bus, ugen);
}
function ADSR(gate, attackTime, decayTime, sustainLevel, releaseTime, curve) {
    var env = EnvADSR(attackTime, decayTime, sustainLevel, releaseTime, 1, curve);
    return EnvGen(gate, 1, 0, 1, 0, envCoord(env));
}
function ASR(gate, attackTime, releaseTime, curve) {
    var env = EnvASR(attackTime, 1, releaseTime, curve);
    return EnvGen(gate, 1, 0, 1, 0, envCoord(env));
}
function Cutoff(sustainTime, releaseTime, curve) {
    var env = EnvCutoff(sustainTime, releaseTime, curve);
    return EnvGen(1, 1, 0, 1, 0, envCoord(env));
}
function signalLength(aSignal) {
    if (Array.isArray(aSignal)) {
        return (aSignal).length;
    }
    else {
        return 1;
    }
}
function Splay(inArray, spread, level, center, levelComp) {
    var n = Math.max(2, signalLength(inArray));
    var pos = arrayFromTo(0, n - 1).map(item => add(mul(sub(mul(item, fdiv(2, sub(n, 1))), 1), spread), center));
    var lvl = mul(level, levelComp ? sqrt(1 / n) : 1);
    consoleDebug('Splay', n, pos, lvl);
    return arrayReduce(Pan2(inArray, pos, lvl), add);
}
function Splay2(inArray) {
    var n = Math.max(2, signalLength(inArray));
    var pos = arrayFromTo(0, n - 1).map(item => item * (2 / (n - 1)) - 1);
    var lvl = Math.sqrt(1 / n);
    consoleDebug('Splay2', n, pos, lvl);
    return arrayReduce(Pan2(inArray, pos, lvl), add);
}
function LinLin(input, srclo, srchi, dstlo, dsthi) {
    var scale = fdiv(sub(dsthi, dstlo), sub(srchi, srclo));
    var offset = sub(dstlo, mul(scale, srclo));
    return add(mul(input, scale), offset);
}
function InFb(numChannels, bus) {
    return InFeedback(numChannels, bus);
}
function Select2(predicate, ifTrue, ifFalse) {
    return add(mul(predicate, sub(ifTrue, ifFalse)), ifFalse);
}
function TChoose(trig, array) {
    return Select(TIRand(0, signalLength(array) - 1, trig), array);
}
function PMOsc(carfreq, modfreq, pmindex, modphase) {
    return SinOsc(carfreq, mul(SinOsc(modfreq, modphase), pmindex));
}
function XLn(start, end, dur) {
    return XLine(start, end, dur, 0);
}
function DmdFor(dur, reset, level) {
    return Duty(dur, reset, 0, level);
}
function TDmdFor(dur, reset, level) {
    return TDuty(dur, reset, 0, level, 0);
}
function DmdOn(trig, reset, demandUGens) {
    return Demand(trig, reset, demandUGens);
}
var Seq = Dseq;
var Ser = Dseries;
var Shuf = Dshuf;
var Choose = Drand;
function Ln(start, end, dur) {
    return Line(start, end, dur, 0);
}
function TLine(start, end, dur, trig) {
    var env = Env([start, start, end], [0, dur], 'lin', null, null, 0);
    return EnvGen(trig, 1, 0, 1, 0, envCoord(env));
}
function TXLine(start, end, dur, trig) {
    var env = Env([start, start, end], [0, dur], 'exp', null, null, 0);
    return EnvGen(trig, 1, 0, 1, 0, envCoord(env));
}
function bitShiftRight(a, b) {
    return shiftRight(a, b);
}
function AudioIn(channels) {
    return In(1, sub(add(NumOutputBuses(), channels), 1));
}
function AudioOut(channelsArray) {
    return Out(0, channelsArray);
}
/*
note that mrg places q in p, and here q has a reference to p, so the traversal of the mrg node must not recurse

b = asLocalBuf([0, 2, 4, 5, 7, 9, 11]);
ugenTraverseCollecting(b, ...)
*/
function asLocalBuf(array) {
    var k = signalLength(array);
    var p = LocalBuf(1, k);
    var q = SetBuf(p, 0, k, array);
    return mrg(p, q);
}
function clearBuf(buf) {
    return mrg(buf, ClearBuf(buf));
}
function BufRec(bufnum, reset, inputArray) {
    return RecordBuf(bufnum, 0, 1, 0, 1, 1, reset, 0, inputArray);
}
var BufAlloc = LocalBuf;
// Reshape input arrays, and allow amp and time to be null (defaulting to 1)
function asKlankSpec(freq, amp, time) {
    var n = signalLength(freq);
    var a = [freq, amp || arrayReplicate(n, 1), time || arrayReplicate(n, 1)];
    consoleDebug('asKlankSpec', a);
    return arrayConcatenation(arrayTranspose(arrayExtendToBeOfEqualSize(a)));
}
function RingzBank(input, freq, amp, time) {
    return Klank(input, 1, 0, 1, asKlankSpec(freq, amp, time));
}
function SinOscBank(freq, amp, time) {
    return Klang(1, 0, asKlankSpec(freq, amp, time));
}
function LinSeg(gate, coordArray) {
    var coord = arrayTranspose(arrayClump(coordArray, 2));
    var levels = arrayFirst(coord);
    var times = arraySecond(coord);
    var env = Env(levels, times.slice(0, times.length - 1), 'lin', null, null, 0);
    return EnvGen(gate, 1, 0, 1, 0, envCoord(env));
}
function SelectX(which, array) {
    return XFade2(Select(round(which, 2), array), Select(add(trunc(which, 2), 1), array), fold2(sub(mul(which, 2), 1), 1), 1);
}
function unitCps(a) {
    return midiCps(mul(a, 127));
}
// Read a signal from a control bus.
function ControlIn(numChan, bus) {
    return kr(In(numChan, bus));
}
function SfFrames(sfBufferArray) {
    return BufFrames(arrayFirst(arrayAsArray(sfBufferArray)));
}
function SfDur(sfBufferArray) {
    return BufDur(arrayFirst(arrayAsArray(sfBufferArray)));
}
function SfSampleRate(sfBufferArray) {
    return BufSampleRate(arrayFirst(arrayAsArray(sfBufferArray)));
}
function SfRateScale(sfBufferArray) {
    return BufRateScale(arrayFirst(arrayAsArray(sfBufferArray)));
}
function SfRead(sfBufferArray, phase, loop, interpolation) {
    return BufRd(1, sfBufferArray, phase, loop, interpolation);
}
function SfPlay(sfBufferArray, rate, trigger, startPos, loop) {
    return PlayBuf(1, sfBufferArray, rate, trigger, startPos, loop, 0);
}
function DelayWrite(bufnum, input) {
    return RecordBuf(bufnum, 0, 1, 0, 1, 1, 1, 0, [input]);
}
function DelayTap(bufnum, delayTime) {
    return PlayBuf(1, bufnum, 1, 1, mul(sub(BufDur(bufnum), delayTime), SampleRate()), 1, 0);
}
function PingPongDelay(left, right, maxDelayTime, delayTime, feedback) {
    var delaySize = mul(maxDelayTime, SampleRate());
    var phase = Phasor(0, 1, 0, delaySize, 0);
    var leftBuffer = clearBuf(BufAlloc(1, delaySize)); // allocate a buffer for the left delay line
    var rightBuffer = clearBuf(BufAlloc(1, delaySize)); // allocate a buffer for the right delay line
    var leftDelayedSignal = BufRd(1, leftBuffer, Wrap(sub(phase, mul(delayTime, SampleRate())), 0, delaySize), 1, 2); // tap the left delay line
    var rightDelayedSignal = BufRd(1, rightBuffer, Wrap(sub(phase, mul(delayTime, SampleRate())), 0, delaySize), 1, 2); // tap the left delay line
    var output = [add(leftDelayedSignal, left), add(rightDelayedSignal, right)]; // mix the delayed signal with the input
    var writer = DelayWrite([rightBuffer, leftBuffer], mul(output, 0.8)); // feedback to buffers in reverse order
    return mrg(output, writer); // output the mixed signal and force the DelayWr into the call graph
}
function MultiTapDelay(timesArray, levelsArray, input) {
    var delayFrames = mul(arrayMaxItem(timesArray), SampleRate());
    var buf = clearBuf(BufAlloc(1, delayFrames));
    var writer = DelayWrite(buf, input);
    var numReaders = timesArray.length;
    var readers = arrayFromTo(0, numReaders - 1).map(item => mul(DelayTap(buf, timesArray[item]), levelsArray[item]));
    return mrg(arrayReduce(readers, add), writer);
}
function Osc1(buf, dur) {
    var numChan = 1;
    var phase = Ln(0, sub(BufFrames(buf), 1), dur);
    var loop = 0;
    var interpolation = 2;
    return BufRd(numChan, buf, phase, loop, interpolation);
}
// k = constant
var kAddToHead = 0;
var kAddToTail = 1;
// b = buffer
function b_alloc_then(bufferNumber, numberOfFrames, numberOfChannels, onCompletion) {
    return {
        address: '/b_alloc',
        args: [oscInt32(bufferNumber), oscInt32(numberOfFrames), oscInt32(numberOfChannels), oscBlob(onCompletion)]
    };
}
// b_gen memcpy is in sc3-rdu
function b_memcpy(bufferNumber, numFrames, numChannels, sampleRate, bufferData) {
    return {
        address: '/b_gen',
        args: [
            oscInt32(bufferNumber),
            oscString('memcpy'),
            oscInt32(numFrames),
            oscInt32(numChannels),
            oscFloat(sampleRate),
            oscBlob(bufferData)
        ]
    };
}
function b_alloc_then_memcpy(bufferNumber, numberOfFrames, numberOfChannels, sampleRate, bufferData) {
    var allocBytes = numberOfFrames * numberOfChannels * 4;
    if (allocBytes != bufferData.length) {
        console.error('b_alloc_then_memcpy: array size error', allocBytes, bufferData.length);
    }
    return b_alloc_then(bufferNumber, numberOfFrames, numberOfChannels, osc.writePacket(b_memcpy(bufferNumber, numberOfFrames, numberOfChannels, sampleRate, bufferData)));
}
function b_getn1(bufferNumber, startIndex, count) {
    return {
        address: '/b_getn',
        args: [oscInt32(bufferNumber), oscInt32(startIndex), oscInt32(count)]
    };
}
function b_query1(bufferNumber) {
    return {
        address: '/b_query',
        args: [oscInt32(bufferNumber)]
    };
}
// c = control
function c_set1(busIndex, controlValue) {
    return {
        address: '/c_set',
        args: [oscInt32(busIndex), oscFloat(controlValue)]
    };
}
function c_setn1(busIndex, controlArray) {
    return {
        address: '/c_setn',
        args: [oscInt32(busIndex), oscInt32(controlArray.length)].concat(controlArray.map(oscFloat))
    };
}
// d = (synth) definition
function d_recv(syndefArray) {
    return {
        address: '/d_recv',
        args: [oscBlob(syndefArray)]
    };
}
function d_recv_then(syndefArray, onCompletion) {
    return {
        address: '/d_recv',
        args: [oscBlob(syndefArray), oscBlob(onCompletion)]
    };
}
// g = group
function g_new1(groupId, addAction, nodeId) {
    return {
        address: '/g_new',
        args: [oscInt32(groupId), oscInt32(addAction), oscInt32(nodeId)]
    };
}
function g_freeAll1(groupId) {
    return {
        address: '/g_freeAll',
        args: [oscInt32(groupId)]
    };
}
// m = meta
var m_status = { address: '/status', args: [] };
function m_dumpOsc(code) {
    return {
        address: '/dumpOSC',
        args: [oscInt32(code)]
    };
}
function m_notify(status, clientId) {
    return {
        address: '/notify',
        args: [oscInt32(status), oscInt32(clientId)]
    };
}
// s = synth
function s_new0(name, nodeId, addAction, target) {
    return {
        address: '/s_new',
        args: [oscString(name), oscInt32(nodeId), oscInt32(addAction), oscInt32(target)]
    };
}
// sc3-smalltalk.ts
function append(lhs, rhs) { return lhs.concat(rhs); }
function choose(anArray) { return anArray[randomInteger(0, anArray.length)]; }
function clump(anArray, n) { return arrayClump(anArray, n); }
function collect(anArray, proc) { return anArray.map(proc); }
function concatenation(anArray) { return arrayConcatenation(anArray); }
function first(anArray) { return anArray[0]; }
function nth(anArray, index) { return anArray[index - 1]; }
function reverse(anArray) { return anArray.reverse(); }
function second(anArray) { return anArray[1]; }
function size(anArray) { return anArray.length; }
function third(anArray) { return anArray[2]; }
function transpose(anArray) { return arrayTranspose(anArray); }
function mean(anArray) { return fdiv(sum(anArray), anArray.length); }
function product(anArray) { return anArray.reduce(mul); }
function sum(anArray) { return anArray.reduce(add); }
function negated(aNumber) { return neg(aNumber); }
function reciprocal(a) { return recip(a); }
function roundTo(a, b) { return round(a, b); }
function rounded(a) { return round(a, 1); }
function truncateTo(a, b) { return trunc(a, b); }
function rand(min, max) { return randomFloat(min, max); }
function rand2(n) { return randomFloat(0 - n, n); }
function timesRepeat(count, proc) { return numberTimesRepeat(count, proc); }
;
function to(from, to) { return arrayFromTo(from, to); }
function dup(proc, count) {
    return arrayFill(nullFix('dup: count?', count, 2), proc);
}
function value(proc, maybeArg1, maybeArg2) {
    return maybeArg2 ? proc(maybeArg1, maybeArg2) : (maybeArg1 ? proc(maybeArg1) : proc());
}
function coord(anEnvelope) { return envCoord(anEnvelope); }
// sc3-soundfile.ts
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
// sc3-stc.ts
function stc_is_binary_selector(text) {
    var allowed = Array.from('!%&*+/<=>?@\\~|-');
    var answer = Array.from(text).every(item => allowed.includes(item));
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
// sc3-texture.ts
function OverlapTexture(graphFunc, sustainTime, transitionTime, overlap) {
    var voiceFunction = function (i) {
        var trg = kr(Impulse(1 / (sustainTime + (transitionTime * 2)), i / overlap));
        var snd = graphFunc(trg);
        var env = Env([0, 1, 1, 0], [transitionTime, sustainTime, transitionTime], 'sin', null, null, 0);
        var sig = mul(snd, EnvGen(trg, 1, 0, 1, 0, envCoord(env)));
        return sig;
    };
    return arrayReduce(arrayMap(arrayFromTo(0, overlap - 1), voiceFunction), add);
}
// sc3-u8.ts
function isUint8Array(x) {
    return (x instanceof Uint8Array);
}
function uint8ArrayIntoQueue(u8Array, numberQueue) {
    u8Array.forEach(aNumber => queuePush(numberQueue, aNumber));
}
// Flatten a tree of Uint8Array to an queue of U8
function flattenByteEncodingIntoQueue(aTree, numberQueue) {
    treeVisit(aTree, item => uint8ArrayIntoQueue(item, numberQueue));
}
function flattenByteEncoding(aTree) {
    var numberQueue = queueNew();
    flattenByteEncodingIntoQueue(aTree, numberQueue);
    return new Uint8Array(queueAsArray(numberQueue));
}
// sc3-ugen.ts
var ugenCounter = counterNew();
function makeUgenPrimitive(name, numChan, rate, specialIndex, inputs) {
    return {
        ugenName: name,
        numChan: numChan,
        ugenRate: rate,
        specialIndex: specialIndex,
        ugenId: ugenCounter(),
        inputValues: inputs,
        mrg: queueNew()
    };
}
function isUgenPrimitive(obj) {
    return obj && obj.ugenName !== undefined;
}
// Ugens with no outputs, such as Out, set index to -1.
function UgenOutput(ugen, index) {
    return {
        ugen: ugen,
        index: index
    };
}
function isUgenOutput(obj) {
    return obj && dictionaryHasKey(obj, 'ugen') && dictionaryHasKey(obj, 'index');
}
function isUgenInput(aValue) {
    return isNumber(aValue) || isUgenOutput(aValue);
}
function inputBranch(input, onUgenOutput, onNumber, onError) {
    if (isUgenOutput(input)) {
        return onUgenOutput(input);
    }
    else if (isNumber(input)) {
        return onNumber(input);
    }
    else {
        consoleError('inputBranch: unknown input type?', input);
        return onError();
    }
}
function inputRate(input) {
    consoleDebug('inputRate', input);
    return inputBranch(input, port => port.ugen.ugenRate, unusedNumber => rateIr, () => -1);
}
// If scalar it is the operating rate, if an array it is indices into the inputs telling how to derive the rate.
function deriveRate(rateOrFilterUgenInputs, inputsArray) {
    consoleDebug('deriveRate', rateOrFilterUgenInputs, inputsArray);
    if (isNumber(rateOrFilterUgenInputs)) {
        return rateOrFilterUgenInputs;
    }
    else {
        return arrayMaxItem(arrayMap(arrayAtIndices(inputsArray, rateOrFilterUgenInputs), inputRate));
    }
}
function requiresMce(inputs) {
    return arrayContainsArray(inputs);
}
function mceInputTransform(aSignal) {
    return arrayTranspose(arrayExtendToBeOfEqualSize(aSignal));
}
function makeUgen(name, numChan, rateSpec, specialIndex, inputs) {
    consoleDebug('makeUgen', name, numChan, rateSpec, specialIndex, inputs);
    if (requiresMce(inputs)) {
        return arrayMap(mceInputTransform(inputs), item => makeUgen(name, numChan, rateSpec, specialIndex, item));
    }
    else {
        var inputArray = inputs;
        var ugenPrimitive = makeUgenPrimitive(name, numChan, deriveRate(rateSpec, inputArray), specialIndex, inputArray);
        switch (numChan) {
            case 0: return (UgenOutput(ugenPrimitive, -1));
            case 1: return (UgenOutput(ugenPrimitive, 0));
            default: return arrayFillWithIndex(numChan, item => UgenOutput(ugenPrimitive, item));
        }
    }
}
function ugenDisplayName(ugen) {
    switch (ugen.ugenName) {
        case 'UnaryOpUGen': return unaryOperatorName(ugen.specialIndex);
        case 'BinaryOpUGen': return binaryOperatorName(ugen.specialIndex);
        default: return ugen.ugenName;
    }
}
// Mrg
// inputFirstUgen([0, SinOsc([440, 441], 0), SinOsc(442, 0)])
function inputFirstUgen(input) {
    if (Array.isArray(input)) {
        consoleDebug('inputFirstUgen: array', input);
        return arrayFind(arrayMap(input, inputFirstUgen), isUgenPrimitive) || null;
    }
    else if (isUgenOutput(input)) {
        consoleDebug('inputFirstUgen: port', input);
        return input.ugen;
    }
    else {
        consoleDebug('inputFirstUgen: number?', input);
        return null;
    }
}
function mrg(lhs, rhs) {
    var ugen = inputFirstUgen(lhs);
    consoleDebug('mrg', lhs, rhs, ugen);
    if (ugen && ugen.mrg) {
        if (Array.isArray(rhs)) {
            var mrgQueue = (ugen.mrg);
            arrayForEach(rhs, item => queuePush(mrgQueue, item));
        }
        else {
            queuePush(ugen.mrg, rhs);
        }
    }
    else {
        consoleError("mrg: no ugen or ugen.mrg is null?");
    }
    return lhs;
}
// Kr
function krMutateInPlace(input) {
    if (isUgenOutput(input)) {
        var inputPort = input;
        consoleDebug('kr: port', inputPort);
        krMutateInPlace(inputPort.ugen);
    }
    else if (isUgenPrimitive(input)) {
        var inputUgen = input;
        consoleDebug('kr: ugen', inputUgen);
        inputUgen.ugenRate = inputUgen.ugenRate === 2 ? 1 : inputUgen.ugenRate;
        arrayForEach(inputUgen.inputValues, item => krMutateInPlace(item));
    }
    else if (Array.isArray(input)) {
        consoleDebug('kr: array', input);
        arrayForEach(input, item => krMutateInPlace(item));
    }
    else {
        if (!isNumber(input)) {
            consoleError('krMutateInPlace', input);
        }
    }
}
function kr(input) {
    krMutateInPlace(input);
    return input;
}
// Operators
function UnaryOpWithConstantOptimiser(specialIndex, input) {
    if (isNumber(input)) {
        var aNumber = input;
        switch (specialIndex) {
            case 0: return 0 - aNumber;
            case 5: return Math.abs(aNumber);
            case 8: return Math.ceil(aNumber);
            case 9: return Math.floor(aNumber);
            case 12: return aNumber * aNumber;
            case 13: return aNumber * aNumber * aNumber;
            case 14: return Math.sqrt(aNumber);
            case 16: return 1 / aNumber;
            case 28: return Math.sin(aNumber);
            case 29: return Math.cos(aNumber);
            case 30: return Math.tan(aNumber);
        }
    }
    return makeUgen('UnaryOpUGen', 1, [0], specialIndex, [input]);
}
// [1, [], [1], [1, 2], [1, null], SinOsc(440, 0), [SinOsc(440, 0)]].map(isArrayConstant)
function isArrayConstant(aValue) {
    return Array.isArray(aValue) && arrayEvery(aValue, isNumber);
}
function UnaryOp(specialIndex, input) {
    if (Array.isArray(input) && arrayEvery(input, isNumber)) {
        return arrayMap(input, item => UnaryOpWithConstantOptimiser(specialIndex, item));
    }
    else {
        return UnaryOpWithConstantOptimiser(specialIndex, input);
    }
}
function BinaryOpWithConstantOptimiser(specialIndex, lhs, rhs) {
    if (isNumber(lhs) && isNumber(rhs)) {
        var lhsNumber = lhs;
        var rhsNumber = rhs;
        switch (specialIndex) {
            case 0: return lhsNumber + rhsNumber;
            case 1: return lhsNumber - rhsNumber;
            case 2: return lhsNumber * rhsNumber;
            case 4: return lhsNumber / rhsNumber;
        }
    }
    return makeUgen('BinaryOpUGen', 1, [0, 1], specialIndex, [lhs, rhs]);
}
function BinaryOp(specialIndex, lhs, rhs) {
    if (Array.isArray(lhs) || Array.isArray(rhs)) {
        var expanded = mceInputTransform([arrayAsArray(lhs), arrayAsArray(rhs)]);
        consoleDebug('BinaryOp: array constant', expanded);
        return arrayMap(expanded, item => BinaryOpWithConstantOptimiser(specialIndex, item[0], item[1]));
    }
    else {
        return BinaryOpWithConstantOptimiser(specialIndex, lhs, rhs);
    }
}
// isOutUgen(Out(0, mul(SinOsc(440, 0), 0.1)))
function isOutUgen(aValue) {
    return isUgenOutput(aValue) && aValue.ugen.ugenName == 'Out';
}
// isControlRateUgen(MouseX(0, 1, 0, 0.2))
function isControlRateUgen(aValue) {
    return isUgenInput(aValue) && (inputRate(aValue) == 1);
}
function action_set_hardware_buffer_size() {
    prompt_for_int_and_then('Set hardware buffer size', scsynth_options.hardwareBufferSize, function (aNumber) { scsynth_options.hardwareBufferSize = aNumber; });
}
function action_set_block_size() {
    prompt_for_int_and_then('Set block size', scsynth_options.blockSize, function (aNumber) { scsynth_options.blockSize = aNumber; });
}
function action_set_num_inputs() {
    prompt_for_int_and_then('Set number of inputs', scsynth_options.numInputs, function (aNumber) { scsynth_options.numInputs = aNumber; });
}
// Copy user programs as .json to clipboard
function action_user_backup() {
    navigator.clipboard.writeText(JSON.stringify(user_programs));
}
// Click (invisible) file select input.
function action_user_restore() {
    var inputElement = document.getElementById('userProgramArchiveFile');
    inputElement.click();
}
function actions_menu_do(editor_get_selected, editor_set, menuElement, entryName) {
    console.log('actions_menu_do', entryName);
    switch (entryName) {
        case 'setBlockSize':
            action_set_block_size();
            break;
        case 'setHardwareBufferSize':
            action_set_hardware_buffer_size();
            break;
        case 'setNumInputs':
            action_set_num_inputs();
            break;
        case 'userBackup':
            action_user_backup();
            break;
        case 'userRestore':
            action_user_restore();
            break;
        case 'userPurge':
            user_program_clear();
            break;
        case 'documentVisit':
            load_utf8_and_then(editor_get_selected(), editor_set);
            break;
        // case 'midiMpeStart': sc3_midi_mpe_init(); break;
        default: console.error('actions_menu_do: unknown action', entryName);
    }
    menuElement.selectedIndex = 0;
}
function actions_menu_init(editor_get_selected, editor_set) {
    select_on_change('actionsMenu', (menuElement, entryName) => actions_menu_do(editor_get_selected, editor_set, menuElement, entryName));
}
var notation_format;
function resolve_file_type(fileType) {
    return fileType ? fileType : notation_format;
}
function set_notation_format() {
    get_select_element_and_then('notationFormat', selectElement => notation_format = selectElement.value);
}
function translate_if_required_and_then(userText, proc) {
    switch (notation_format) {
        case '.js':
            proc(userText);
            break;
        case '.stc':
            stc_to_js_and_then(userText, proc);
            break;
        default: console.error('translate_if_required_and_then: unknown format', notation_format);
    }
}
var scsynth_options;
function scsynthOptionsPrint(options) {
    console.log('-i', options.numInputs, '-o', options.numOutputs, '-Z', options.hardwareBufferSize, '-z', options.blockSize);
}
var user_programs;
var user_storage_key;
function user_program_menu_init(editor_set_program) {
    var stored = localStorage.getItem(user_storage_key);
    user_programs = stored ? JSON.parse(stored) : {};
    select_on_change('userMenu', (menuElement, programName) => editor_set_program(user_programs[programName]));
    select_add_keys_as_options('userMenu', Object.keys(user_programs));
}
function user_program_save_to(program_text) {
    var timeStamp = (new Date()).toISOString();
    var programName = window.prompt('Set program name', timeStamp);
    if (programName) {
        user_programs[programName] = program_text;
        localStorage.setItem(user_storage_key, JSON.stringify(user_programs));
        select_add_option_at_id('userMenu', programName, programName);
    }
}
function user_program_clear() {
    if (window.confirm("Clear user program storage?")) {
        select_clear_from('userMenu', 1);
        localStorage.removeItem(user_storage_key);
    }
}
function user_storage_sync() {
    localStorage.setItem(user_storage_key, JSON.stringify(user_programs));
    select_clear_from('userMenu', 1);
    select_add_keys_as_options('userMenu', Object.keys(user_programs));
}
// Read selected .json user program archive file.
function user_program_read_archive() {
    var fileInput = document.getElementById('userProgramArchiveFile');
    var fileList = fileInput.files;
    var jsonFile = fileList[0];
    if (fileInput && fileList && jsonFile) {
        consoleDebug('user_program_read_archive', jsonFile);
        read_json_file_and_then(jsonFile, function (obj) {
            consoleDebug('user_program_read_archive', obj);
            Object.assign(user_programs, obj);
            user_storage_sync();
        });
    }
    else {
        console.error('user_program_read_archive');
    }
}
// Encode and send OpenSoundControl message to sc3_websocket.
function sc3_websocket_send_osc(msg) {
    sc3_websocket_send(osc.writePacket(msg));
}
// Encode and play Ugen.
function playUgen(ugen) {
    var graph = makeGraph('sc3.js', wrapOut(0, ugen));
    var syndef = graphEncodeSyndef(graph);
    console.log('play: scsyndef #', syndef.length);
    sc3_websocket_send_osc(d_recv_then(syndef, osc.writePacket(s_new0('sc3.js', -1, kAddToTail, 1))));
}
// Free all.
function reset() {
    sc3_websocket_send_osc(g_freeAll1(1));
}
function graph_load(graphDir, graphName, fileType) {
    var graphFileName = 'help/' + graphDir + '/' + graphName + resolve_file_type(fileType);
    var graphUrl = url_append_timestamp(graphFileName);
    consoleLogMessageFrom('load_graph', graphName);
    fetch_url_and_then(graphUrl, 'text', programText => editor_set_data(programText));
}

function graph_menu_init(menuId, graphDir, fileType, loadProc) {
    var menu = document.getElementById(menuId);
    if(menu) {
        menu.addEventListener('change', e => e.target.value ? loadProc(graphDir, e.target.value, resolve_file_type(fileType)) : null);
    } else {
        consoleWarn('graph_menu_init: no element', menuId);
    }
}

// subDir should be empty or should end with a '/'
function sc3_ui_init(subDir, hasProgramMenu, hasHelpMenu, hasGuideMenu, hasEssayMenu, fileExt, storageKey, loadProc, initMouse, hardwareBufferSize, blockSize) {
    if(hasProgramMenu) {
        graph_menu_init('programMenu', subDir + 'graph', fileExt, loadProc);
        load_utf8_and_then('html/' + subDir + 'program-menu.html', setter_for_inner_html_of('programMenu'));
    }
    if(hasHelpMenu) {
        graph_menu_init('helpMenu', subDir + 'ugen', fileExt, loadProc);
        load_utf8_and_then('html/' + subDir + 'help-menu.html', setter_for_inner_html_of('helpMenu'));
    }
    if(hasGuideMenu) {
        graph_menu_init('guideMenu', subDir + 'guide', fileExt, loadProc);
        load_utf8_and_then('html/' + subDir + 'guide-menu.html', setter_for_inner_html_of('guideMenu'));
    }
    if(hasEssayMenu) {
        graph_menu_init('essayMenu', subDir + 'essay', fileExt, loadProc);
        load_utf8_and_then('html/' + subDir + 'essay-menu.html', setter_for_inner_html_of('essayMenu'));
    }
    user_storage_key = storageKey;
    notation_format = '.stc';
    user_program_menu_init(editor_set_data);
    actions_menu_init(editor_get_selected_text, editor_set_data);
    if(initMouse) {
        sc3_mouse_init();
    }
    scsynth_options = {
        hardwareBufferSize: hardwareBufferSize,
        blockSize: blockSize,
        numInputs: 0,
        numOutputs: 2
    };
}

function setStatusDisplay(text) {
    var status = document.getElementById('statusText');
    if(status) {
        statusText.innerHTML = text;
    } else {
        console.log(text);
    }
}

function prettyPrintSyndef() {
    editor_get_js_notation_and_then(function(programText) {
        prettyPrintSyndefOf(eval(programText));
    });
}

function evalJsProgram() {
    editor_get_js_notation_and_then(function(programText) {
        var result = eval(programText);
        console.log(result);
    });
}

function playJsProgram() {
    editor_get_js_notation_and_then(function(programText) {
        var result = eval(programText);
        playUgen(result);
    });
}

// Sets the 's' url parameter of the window to the encoded form of the selected text.
function set_url_to_encode_selection() {
    window_url_set_param('s', editor_get_selected_text());
}

function ui_boot_scsynth() {
    bootScsynth(scsynth_options);
}

function ui_save_program() {
    user_program_save_to(editor_get_data());
}
// sc3-ui-mouse.js ; requires sc3-wasm

// w is button state, x and y are unit scaled co-ordinates within window where y points up.
var sc3_mouse = { w: 0, x: 0, y: 0 };

// Event handler for mouse event.
function recv_document_mouse_event(e) {
    sc3_mouse.x = event.pageX / window.innerWidth;
    sc3_mouse.y = 1 - (e.pageY / window.innerHeight);
    sc3_mouse.w = e.buttons === 1 ? 1 : 0;
    setPointerControls(0, sc3_mouse.w, sc3_mouse.x, sc3_mouse.y); // sc3-wasm
}

// Install mouse event handler.
function sc3_mouse_init() {
    document.onmousedown = recv_document_mouse_event;
    document.onmousemove = recv_document_mouse_event;
    document.onmouseup = recv_document_mouse_event;
}
// sc3-obj.js

class Obj {
    constructor (aValue) {
    }
    isArray() {
        return new Bool(false);
    }
    isBlock() {
        return new Bool(false);
    }
    isBoolean() {
        return new Bool(false);
    }
    isEmpty() {
        return this.size().isZero();
    }
    isFloat() {
        return new Bool(false);
    }
    isInt() {
        return new Bool(false);
    }
    isNumber() {
        return new Bool(false);
    }
    isString() {
        return new Bool(false);
    }
    isSymbol() {
        return new Bool(false);
    }
    adaptToCollectionAndSend(aValue, aSelector) {
        console.log('Obj>>adaptToCollectionAndSend', this, aValue, aSelector);
        return aValue.collect(item => this.performWith(aSelector, item));
    }
    add(aValue) {
        return this.performWith('add', aValue);
    }
    div(aValue) {
        return this.performWith('div', aValue);
    }
    mul(aValue) {
        return this.performWith('mul', aValue);
    }
    pow(aValue) {
        return this.performWith('pow', aValue);
    }
    sub(aValue) {
        return this.performWith('sub', aValue);
    }
    value() {
        return this;
    }
}
// sc3-block.js

class Block extends Obj {
    constructor(aFunction) {
        super(aFunction);
        this.function = aFunction;
    }
    isBlock() {
        return new Bool(true);
    }
    value(p1, p2) {
        if(p1 && p2) {
            return this.function(p1, p2);
        } else if(p1) {
            return this.function(p1);
        } else {
            return this.function();
        }
    }
}

function block(aFunction) {
    return new Block(aFunction);
}
// sc3-bool.js

class Bool extends Obj {
    constructor(aBoolean) {
        super(aBoolean);
        this.boolean = aBoolean;
    }
    isBoolean() {
        return new Bool(true);
    }
    and(aBool) {
        return new Bool(this.boolean && aBool.boolean);
    }
    asString() {
        return new Str(String(this.aBoolean));
    }
    static false() {
            return new Bool(false);
    }
    equalTo(aValue) {
        return new Bool(aValue.isBoolean().boolean ? this.boolean === aValue.boolean : false);
    }
    not() {
        return new Bool(!this.boolean);
    }
    or(aBool) {
        return new Bool(this.boolean || aBool.boolean);
    }
    rand() {
        return Bool(Math.random()  > 0.5);
    }
    static true() {
            return new Bool(true);
    }
}

function bool(aBoolean) {
    return new Bool(aBoolean);
}
// sc3-int.js

class Int extends Obj {
    constructor(aNumber) {
        super(aNumber);
        this.number = aNumber;
    }
    isInt() {
        return new Bool(true);
    }
    isNumber() {
        return new Bool(true);
    }
    adaptToIntAndSend(aValue, aSelector) {
        return aValue.performWithInt(aSelector, this);
    }
    adaptToFloatAndSend(aValue, aSelector) {
        console.log('Int>>adaptToFloatAndSend', this, aValue, aSelector);
        return aValue.performWithFloat(aSelector, this.asFloat());
    }
    asFloat() {
        return new Float(this.number);
    }
    asInt() {
        return this;
    }
    asString() {
        return new Str(String(this.number));
    }
    equalTo(aValue) {
        return aValue.isNumber().boolean ? this.performWith('equalTo', aValue) : new Bool(false);
    }
    isZero() {
        return new Bool(this.number === 0);
    }
    performWith(aSelector, aValue) {
        return aValue.isInt().boolean ? this.performWithInt(aSelector, aValue) : aValue.adaptToIntAndSend(this, aSelector);
    }
    performWithInt(aSelector, anInt) {
        console.log('Int>>performWithInt', this, aSelector, anInt);
        switch(aSelector) {
        case 'add': return new Int(this.number + anInt.number);
        case 'div': return new Float(this.number / anInt.number);
        case 'equalTo': return new Bool(this.number === anInt.number);
        case 'mul': return new Int(this.number * anInt.number);
        case 'pow': return new Int(this.number ** anInt.number);
        case 'sub': return new Int(this.number - anInt.number);
        default: console.error('Int>>performWithInt', this, aSelector, anInt); return null;
        }
    }
    negated() {
        return new Int(0 - this.number);
    }
    timesRepeat(aBlock) {
        for(var i = 0; i < this.number; i++) {
            aBlock.value();
        }
    }
    to(anInt) {
        var answer = [];
        for(var i = this.number; i <= anInt.number; i += 1) {
            answer.push(new Int(i));
        }
        return new Vector(answer);
    }
}

function int(aNumber) {
    return new Int(aNumber);
}
// sc3-float.js

class Float extends Obj {
    constructor(aNumber) {
        super(aNumber);
        this.number = aNumber;
    }
    isFloat() {
        return new Bool(true);
    }
    isNumber() {
        return new Bool(true);
    }
    adaptToIntAndSend(aValue, aSelector) {
        console.log('Float>>adaptToIntAndSend', this, aValue, aSelector);
        return aValue.asFloat().performWithFloat(aSelector, this);
    }
    adaptToFloatAndSend(aValue, aSelector) {
        console.log('Float>>adaptToFloatAndSend', this, aValue, aSelector);
        return aValue.performWithFloat(aSelector, this);
    }
    asFloat() {
        return this;
    }
    asInt() {
        return new Int(Math.trunc(this.number));
    }
    asString() {
        return new Str(String(this.number));
    }
    coin() {
        return new Bool(Math.random() > this.number);
    }
    equalTo(aValue) {
        return aValue.isNumber().boolean ? this.performWith('equalTo', aValue) : new Bool(false);
    }
    static inf() {
            return new Float(Infinity);
    }
    isZero() {
        return new Bool(this.number === 0);
    }
    negated() {
        return new Float(0 - this.number);
    }
    performWith(aSelector, aValue) {
        return aValue.isFloat().boolean ? this.performWithFloat(aSelector, aValue) : aValue.adaptToFloatAndSend(this, aSelector);
    }
    performWithFloat(aSelector, aFloat) {
        switch(aSelector) {
        case 'add': return new Float(this.number + aFloat.number);
        case 'div': return new Float(this.number / aFloat.number);
        case 'equalTo': return new Bool(this.number === aFloat.number);
        case 'mul': return new Float(this.number * aFloat.number);
        case 'pow': return new Float(this.number ** aFloat.number);
        case 'sub': return new Float(this.number - aFloat.number);
        default: console.error('Float>>performWithFloat', this, aSelector, aFloat); return null;
        }
    }
    static pi() {
        return new Float(Math.PI);
    }
    rand(aFloat) {
        if(aFloat) {
            return new Float(Math.random() * (aFloat.number - this.number) + this.number);
        } else {
            return new Float(Math.random() * this.number);
        }
    }
    rand2() {
        return this.negated().rand(this);
    }
    sin() {
        return new Float(Math.sin(this.number));
    }
}

function float(aNumber) {
    return new Float(aNumber);
}
// sc3-str.js

class Str extends Obj {
    constructor(aString) {
        super(aString);
        this.string = aString;
    }
    isString() {
        return new Bool(true);
    }
    asString() {
        return this;
    }
    asSymbol() {
        return new Sym(this.string);
    }
    equalTo(aValue) {
        return new Bool(aValue.isString().boolean ? this.string === aValue.string : false);
    }
    size() {
        return new Int(this.string.length);
    }
}

function str(aString) {
    return new Str(aString);
}
// sc3-sym.js

class Sym extends Obj {
    constructor(aString) {
        super(aString);
        this.string = aString;
    }
    isSymbol() {
        return new Bool(true);
    }
    asString() {
        return new Str(this.string);
    }
    asSymbol() {
        return this;
    }
    equalTo(aValue) {
        return new Bool(aValue.isSymbol().boolean ? this.string === aValue.string : false);
    }
    size() {
        return new Int(this.string.length);
    }
}

function sym(aString) {
    return new Sym(aString);
}
// sc3-vector.js ; one-indexed

class Vector extends Obj {
    constructor(anArray) {
        super(anArray);
        this.array = anArray;
    }
    isArray() {
        return new Bool(true);
    }
    adaptToIntAndSend(aValue, aSelector) {
        console.log('Vector>>adaptToIntAndSend', this, aValue, aSelector);
        return this.collect(block(item => aValue.performWith(aSelector, item)));
    }
    adaptToFloatAndSend(aValue, aSelector) {
        console.log('Vector>>adaptToFloatAndSend', this, aValue, aSelector);
        return this.collect(block(item => aValue.performWith(aSelector, item)));
    }
    append(aVector) {
        return new Vector(this.array.concat(aVector.array));
    }
    at(anIndex) {
        return this.array[anIndex.number - 1];
    }
    atWrap(anIndex) {
        return this.array[(anIndex.number - 1)  % this.array.length];
    }
    collect(aBlock) {
        return new Vector(this.array.map(aBlock.function));
    }
    copy() {
        return new Vector(this.array.slice(0, this.array.length));
    }
    negated() {
        return new Vector(this.array.map(item => item.negated()));
    }
    performWith(aSelector, aValue) {
        return aValue.isArray().boolean ? this.withCollect(aValue, block((p, q) => p.performWith(aSelector, q))) : aValue.adaptToCollectionAndSend(this, aSelector);
    }
    put(anIndex, aValue) {
        this.array[anIndex.number - 1] = aValue;
    }
    reversed() {
        var answer = this.copy()
        answer.reverseInPlace();
        return answer;
    }
    reverseInPlace() {
        this.array.reverse();
    }
    sin() {
        return new Vector(this.array.map(item => item.sin()));
    }
    size() {
        return new Int(this.array.length);
    }
    withCollect(aVector, aBlock) {
        console.log('Vector>>withCollect', this, aVector, aBlock);
        return new Vector(this.array.map((item, index) => aBlock.function(item, aVector.array[index])));
    }
}

function vector(anArray) {
    return new Vector(anArray);
}
