// Id: statusText
export function setStatusDisplay(text: string) {
	const statusText = document.getElementById('statusText');
	if(statusText) {
		statusText.innerHTML = text;
	} else {
		console.log(text);
	}
}
