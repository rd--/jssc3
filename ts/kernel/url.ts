// Append timestamp to Url to defeat cache.
export function url_append_timestamp(url: string): string {
	const ms = (new Date()).getTime();
	const jn = (/\?/).test(url) ? '&': '?';
	const ext = jn + ms;
	return url + ext;
}
