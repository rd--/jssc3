// Append timestamp to Url to defeat cache
export function url_append_timestamp(url: string): string {
	const ext = ((/\?/).test(url) ? '&': '?') + (new Date()).getTime();
	return url + ext;
}

type ResponseToPromise<T> = (reponse: Response) => Promise<T>;

export function fetch_extract_then_else<T>(
	url: string,
	extractFunc: ResponseToPromise<T>,
	processFunc: (result: T) => void,
	errorFunc: (reason: string) => void
): void {
	fetch(url, { cache: 'no-cache' })
		.then(handle_fetch_error)
		.then(extractFunc)
		.then(processFunc)
		.catch(errorFunc);
}

export function load_and_extract_and_then<T>(
	fileName: string,
	typeString: string,
	extractFunc: ResponseToPromise<T>,
	processFunc: (x: T) => void
): void {
	fetch_extract_then_else(
		fileName,
		extractFunc,
		processFunc,
		reason => console.error(`load_and_extract_and_then: ${typeString}: ${reason}`)
	);
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

export function get_file_input_file(inputId: string, fileIndex: number): File | null {
	const inputElement = <HTMLInputElement>document.getElementById(inputId);
	if(inputElement.files) {
		const inputFile = <File>inputElement.files[fileIndex];
		if (!inputFile) {
			console.warn('get_file_input_file: no input file at index?');
		}
		return inputFile;
	} else {
		console.warn('get_file_input_file: no files at input element?');
		return null;
	}
}

// Read file from input/file at indicated inputId and fileIndex and run proc.
export function read_text_file_from_file_input_and_then(inputId: string, fileIndex: number, proc: (x: string) => void): void {
	const inputFile = get_file_input_file(inputId, fileIndex);
	if (inputFile) {
		read_text_file_and_then(inputFile, proc);
	} else {
		console.warn('read_text_file_from_file_input_and_then: no input file at index?');
	}
}

export function read_text_file_from_file_input_and_set_element_text(inputId: string, fileIndex: number, textId: string): void {
	const element = document.getElementById(textId);
	if(element) {
		read_text_file_from_file_input_and_then(inputId, fileIndex, text => element.textContent = text);
	}
}

// Read json file and run proc on parsed result.
export function read_json_file_and_then(jsonFile: File , proc: (aValue: Record<string, unknown> | []) => void): void {
	read_text_file_and_then(jsonFile, jsonText => proc(JSON.parse(jsonText)));
}

export function load_utf8(url: string): Promise<string> {
	return fetch(url, { cache: 'no-cache' })
		.then(handle_fetch_error)
		.then(response => response.text())
		.catch(reason => `load_utf8: ${url}: ${reason}`);
}


// Throw error if response status is not .ok
export function handle_fetch_error(response: Response): Response {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}
