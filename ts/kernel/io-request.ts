// Obsolete implementation of fetch using XMLHttpRequest, see https://developer.mozilla.org/en-US/docs/Web/API/fetch

export function fetch_url<T>(url: string, responseType: XMLHttpRequestResponseType): Promise<T> {
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
