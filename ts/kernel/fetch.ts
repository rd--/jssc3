export function fetchArrayBuffer(
	resource: RequestInfo | URL,
	options: RequestInit,
): Promise<ArrayBuffer> {
	return fetch(resource, options)
		.then((response) => response.arrayBuffer());
}

export function fetchUtf8(
	resource: RequestInfo | URL,
	options: RequestInit,
): Promise<string> {
	return fetch(resource, options)
		.then((response) => response.text());
}

export function fetchJson(
	resource: RequestInfo | URL,
	options: RequestInit,
): Promise<unknown> {
	return fetch(resource, options)
		.then((response) => response.json());
}
