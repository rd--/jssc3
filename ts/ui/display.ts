export function setStatusDisplay(text: string) {
	var statusText = document.getElementById('statusText');
	if(statusText) {
		statusText.innerHTML = text;
	} else {
		console.log(text);
	}
}
