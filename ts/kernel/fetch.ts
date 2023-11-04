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
