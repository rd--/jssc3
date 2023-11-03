// Append timestamp to Url to defeat cache.
export function url_append_timestamp(url: string): string {
	const ms = (new Date()).getTime();
	const jn = (/\?/).test(url) ? '&': '?';
	const ext = jn + ms;
	return url + ext;
}

type ResponseToPromise<T> = (reponse: Response) => Promise<T>;

export function get_file_input_file(
	inputId: string,
	fileIndex: number
): File | null {
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

export function read_text_file_from_file_input_and_set_element_text(
	inputId: string,
	fileIndex: number,
	textId: string
): void {
	const element = document.getElementById(textId);
	if(element) {
		const inputFile = get_file_input_file(inputId, fileIndex);
		if(inputFile) {
			inputFile.text().then(text => element.textContent = text);
		}
	}
}

export function fetch_arraybuffer(
	resource: RequestInfo | URL,
	options: RequestInit
): Promise<ArrayBuffer> {
	return fetch(resource, options)
		.then(response => response.arrayBuffer());
}

export function fetch_utf8(
	resource: RequestInfo | URL,
	options: RequestInit
): Promise<string> {
	return fetch(resource, options)
		.then(response => response.text());
}

export function fetch_json(
	resource: RequestInfo | URL,
	options: RequestInit
): Promise<unknown> {
	return fetch(resource, options)
		.then(response => response.json());
}
