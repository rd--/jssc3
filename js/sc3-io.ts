// sc3-io.ts

// Append timestamp to URL to defeat cache
export function url_append_timestamp(url: string): string {
    var ext = ((/\?/).test(url) ? '&': '?') + (new Date()).getTime();
    return url + ext;
}

// Fetch url with indicated responseType and run proc on result.
export function fetch_url_and_then(url: string, responseType: XMLHttpRequestResponseType, proc: (x: any) => void): void {
    var request = new XMLHttpRequest();
    request.addEventListener('load', () => proc(request.response));
    request.open('GET', url);
    request.responseType = responseType;
    request.send();
}

// Throw error if response status is not .ok
export function handle_fetch_error(response: Response): Response {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// Log error and return default value
export function log_error_and_return(fromWhere: string, reason: string, defaultValue: any): any {
    console.debug(fromWhere, ': ', reason);
    return defaultValue;
}

type ExtractPromise = (x: Response) => Promise<any>;

export function load_and_extract_and_then(fileName: string, typeString: string, extractFunc: ExtractPromise, processFunc: (x: any) => void): void {
    fetch(fileName, { cache: 'no-cache' })
        .then(response => handle_fetch_error(response))
        .then(response => extractFunc(response))
        .then(text => processFunc(text))
        .catch(reason => processFunc(log_error_and_return('load' + typeString, reason, '')));
}

// Fetch fileName and apply processFunc to the text read (stored as UTF-8).
export function load_utf8_and_then(fileName: string, processFunc: (x: string) => void): void {
    load_and_extract_and_then(fileName, 'text/utf8', r => r.text(), processFunc);
}

// Fetch fileName and apply processFunc to the object read (stored as JSON).
export function load_json_and_then(fileName: string, processFunc: (x: object | []) => void): void {
    load_and_extract_and_then(fileName, 'text/json', r => r.json(), processFunc);
}

// Fetch fileName and apply processFunc to the ArrayBuffer object read
export function load_arraybuffer_and_then(fileName: string, processFunc: (x: ArrayBuffer) => void): void {
    load_and_extract_and_then(fileName, 'bytes/arraybuffer', r => r.arrayBuffer(), processFunc);
}

// Read text file and run proc on result.
export function read_text_file_and_then(textFile: File, proc: (x: string) => void): void {
    var reader = new FileReader();
    reader.addEventListener('load', () => proc(<string>reader.result), false);
    reader.readAsText(textFile);
}

// Read file from input/file at indicated inputId and fileIndex and run proc.
export function read_text_file_from_file_input_and_then(inputId: string, fileIndex: number, proc: (x: string) => void): void {
    var inputElement = <HTMLInputElement>document.getElementById(inputId);
    if(inputElement.files) {
        var inputFile = <File>inputElement.files[fileIndex];
        if (inputFile) {
            read_text_file_and_then(inputFile, proc);
        } else {
            console.warn('read_text_file_from_file_input_and_then: no input file at index?');
        }
    } else {
        console.warn('read_text_file_from_file_input_and_then: no files at input element?');
    }
}

// Read json file and run proc on parsed result.
export function read_json_file_and_then(jsonFile: File , proc: (aValue: object | []) => void): void {
    read_text_file_and_then(jsonFile, jsonText => proc(JSON.parse(jsonText)));
}
