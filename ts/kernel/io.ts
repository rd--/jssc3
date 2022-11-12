import { consoleDebug } from './error.ts'

// Append timestamp to URL to defeat cache
export function url_append_timestamp(url: string): string {
	const ext = ((/\?/).test(url) ? '&': '?') + (new Date()).getTime();
	return url + ext;
}

export function fetch_url<T>(url: string, responseType: XMLHttpRequestResponseType): Promise<T> {
	consoleDebug(`fetch_url: ${url}`);
    return new Promise(function (resolve, reject) {
		const request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = function() {
            if (request.status >= 200 && request.status < 300) {
                resolve(request.response);
            } else {
                reject(request.statusText);
            }
        };
        request.onerror = function() {
			reject(request.statusText);
		};
		request.responseType = responseType;
        request.send();
    });
}

// Fetch url with indicated responseType and run proc asynchronously on result.
export function fetch_url_and_then<T>(url: string, responseType: XMLHttpRequestResponseType, proc: (reply: T) => void): void {
	fetch_url(url, responseType)
		.then(answer => proc(<T>answer))
		.catch(reason => console.error(`fetch_url_and_then: ${url}: ${reason}`));
}

// Throw error if response status is not .ok
export function handle_fetch_error(response: Response): Response {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

type ExtractPromise<T> = (x: Response) => Promise<T>;

export function load_and_extract_and_then<T>(fileName: string, typeString: string, extractFunc: ExtractPromise<T>, processFunc: (x: T) => void): void {
	fetch(fileName, { cache: 'no-cache' })
		.then(response => handle_fetch_error(response))
		.then(response => extractFunc(response))
		.then(text => processFunc(text))
		.catch(reason => console.error(`load_and_extract_and_then: ${typeString}: ${reason}`));
}

// Fetch fileName and apply processFunc to the text read (stored as UTF-8).
export function load_utf8_and_then(fileName: string, processFunc: (x: string) => void): void {
	load_and_extract_and_then(fileName, 'text/utf8', r => r.text(), processFunc);
}

// Fetch fileName and apply processFunc to the object read (stored as JSON).
export function load_json_and_then(fileName: string, processFunc: (x: Record<string, unknown>) => void): void {
	load_and_extract_and_then(fileName, 'text/json', r => r.json(), processFunc);
}

// Fetch fileName and apply processFunc to the ArrayBuffer object read
export function load_arraybuffer_and_then(fileName: string, processFunc: (x: ArrayBuffer) => void): void {
	load_and_extract_and_then(fileName, 'bytes/arraybuffer', r => r.arrayBuffer(), processFunc);
}

// Read text file and run proc on result.
export function read_text_file_and_then(textFile: File, proc: (x: string) => void): void {
	const reader = new FileReader();
	reader.addEventListener('load', () => proc(<string>reader.result), false);
	reader.readAsText(textFile);
}

// Read file from input/file at indicated inputId and fileIndex and run proc.
export function read_text_file_from_file_input_and_then(inputId: string, fileIndex: number, proc: (x: string) => void): void {
	const inputElement = <HTMLInputElement>document.getElementById(inputId);
	if(inputElement.files) {
		const inputFile = <File>inputElement.files[fileIndex];
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
export function read_json_file_and_then(jsonFile: File , proc: (aValue: Record<string, unknown> | []) => void): void {
	read_text_file_and_then(jsonFile, jsonText => proc(JSON.parse(jsonText)));
}

export function load_utf8(url: string): Promise<string> {
	return fetch(url, { cache: 'no-cache' })
		.then(response => handle_fetch_error(response))
		.then(response => response.text())
		.catch(reason => `load_utf8: ${url}: ${reason}`);
}