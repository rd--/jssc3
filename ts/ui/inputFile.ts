export function getFileInputFile(
	inputId: string,
	fileIndex: number
): File | null {
	const inputElement = <HTMLInputElement>document.getElementById(inputId);
	if(inputElement.files) {
		const inputFile = <File>inputElement.files[fileIndex];
		if (!inputFile) {
			console.warn('getFileInputFile: no input file at index?');
		}
		return inputFile;
	} else {
		console.warn('getFileInputFile: no files at input element?');
		return null;
	}
}

export function readTextFileFromFileInputAndSetElementText(
	inputId: string,
	fileIndex: number,
	textId: string
): void {
	const element = document.getElementById(textId);
	if(element) {
		const inputFile = getFileInputFile(inputId, fileIndex);
		if(inputFile) {
			inputFile.text().then(text => element.textContent = text);
		}
	}
}
