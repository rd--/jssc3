// document.getSelection.toString()
export function getSelectedText(): string {
	const selection = document.getSelection();
	return selection ? selection.toString() : '';
}

export function getSelectedTextOrContentsOf(elemId: string): string {
	var selectedText = getSelectedText().trim();
	if(selectedText.length > 0) {
		return selectedText;
	} else {
		var element = document.getElementById(elemId);
		return element ? element.innerText.trim() : '';
	}
}

export function setInnerHtml(elementId: string, innerHtml: string, setFocus: boolean): void {
	const element = document.getElementById(elementId);
	if(element) {
		element.innerHTML = innerHtml;
		if(setFocus) {
			element.focus();
		}
	} else {
		console.warn(`setInnerHtml: ${elementId}: element not located`);
	}
}

export function setTextContent(elementId: string, textContent: string, setFocus: boolean): void {
	const element = document.getElementById(elementId);
	if(element) {
		element.textContent = textContent;
		if(setFocus) {
			element.focus();
		}
	} else {
		console.warn(`setTextContent: ${elementId}: element not located`);
	}
}

// Return a function to set the inner Html of elemId
export function setterForInnerHtmlOf(elemId: string): (innerHtml: string) => void {
	const elem = document.getElementById(elemId);
	return function(innerHtml) {
		if(elem) {
			elem.innerHTML = innerHtml;
		} else {
			console.warn(`setterForInnerHtmlOf: ${elemId}: elem was nil`);
		}
	};
}

export function withElement(
	elementId: string,
	elementProcedure: (element: HTMLElement) => void
): void {
	const element = document.getElementById(elementId);
	if(!element) {
		console.error('withElement: not found: ', elementId);
	} else {
		elementProcedure(element);
	}
}

export function getSelectElementAndThen(
	selectId: string,
	selectProcedure: (selectElement: HTMLSelectElement) => void
): void {
	withElement(selectId, <(element: HTMLElement) => void>selectProcedure);
}

/* Set onchange handler of selectId,
guards against absence of selection (proc is only called if value is set). */
export function selectOnChange(
	selectId: string,
	proc: (anElement: HTMLSelectElement, aString: string) => void
): void {
	const guardedProc = function(anEvent: Event) {
		const target = <HTMLSelectElement>anEvent.target;
		if(target && target.value) {
			proc(target, target.value);
		}
	};
	getSelectElementAndThen(selectId, selectElement => selectElement.addEventListener('change', guardedProc));
}

// Create option element and add to select element.
export function selectAddOptionTo(
	selectElement: HTMLSelectElement,
	optionValue: string,
	optionText: string
): void {
	const optionElement = document.createElement('option');
	optionElement.value = optionValue;
	optionElement.text = optionText;
	selectElement.add(optionElement, null);
}

// Add option to selectId
export function selectAddOptionAtId(
	selectId: string,
	optionValue: string,
	optionText: string
): void {
	getSelectElementAndThen(
		selectId,
		selectElement => selectAddOptionTo(selectElement, optionValue, optionText)
	);
}

// Delete all options at selectId from startIndex
export function selectClearFrom(selectId: string, startIndex: number): void {
	getSelectElementAndThen(selectId, function(selectElement) {
		const endIndex = selectElement.length;
		for(let i = startIndex; i < endIndex; i++) {
			selectElement.remove(startIndex);
		}
	});
}

// Add all keys as entries, both value and text, at selectId
export function selectAddKeysAsOptions(selectId: string, keyArray: string[]): void {
	getSelectElementAndThen(selectId, function(selectElement) {
		keyArray.forEach(function(key) {
			const option = document.createElement('option');
			option.value = key;
			option.text = key;
			selectElement.add(option, null);
		});
	});
}

// Add a listener to buttonId that passes click events to inputId.
export function connectButtonToInput(buttonId: string, inputId: string): void {
	const button = <HTMLButtonElement>document.getElementById(buttonId);
	const input = <HTMLInputElement>document.getElementById(inputId);
	if (!button || !input) {
		console.warn('connectButtonToInput: element not located?');
	} else {
		button.addEventListener('click', UnusedEvent => input.click(), false);
	}
}

export function clickInput(inputId: string): void {
	withElement(inputId, inputElement => inputElement.click());
}

// If some text is selected, get only the selected text, else get the entire text.
export function textareaGetSelectionOrContents(textareaElement: HTMLTextAreaElement): string {
	if(textareaElement.selectionStart === textareaElement.selectionEnd) {
		return textareaElement.value;
	} else {
		return textareaElement.value.substring(textareaElement.selectionStart, textareaElement.selectionEnd);
	}
}

// Lookup key in parameters of Url of current document.  (C.f. window.location)
export function urlGetParam(key: string): null | string {
	const params = new URLSearchParams(document.location.search);
	return params.get(key);
}

// Set key to value in window location url.
export function windowUrlSetParam(key: string, value: string): void {
	const windowUrl = new URL(window.location.href);
	windowUrl.searchParams.set(key, value);
	window.history.pushState({}, '', windowUrl);
}

export function parseIntOrAlert(integerText: string, errorText: string, defaultAnswer: number): number {
	const answer = Number.parseInt(integerText, 10);
	if(isNaN(answer)) {
		window.alert(errorText);
		return defaultAnswer;
	} else {
		return answer;
	}
}

export function parseIntOrAlertAndThen(
	integerText: string,
	errorText: string,
	proc: (aNumber: number) => void
): void {
	const answer = Number.parseInt(integerText, 10);
	if(isNaN(answer)) {
		window.alert(errorText);
	} else {
		proc(answer);
	}
}

// Request fullscreen for element, or exit fullscreen it exists.
function fullscreenFor(element: HTMLElement): void {
	const fullscreenOptions: FullscreenOptions = { navigationUI: "hide" };
	if (!document.fullscreenElement) {
		element.requestFullscreen(fullscreenOptions);
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}
}

export function fullscreen() {
	fullscreenFor(document.documentElement);
}

export function menuOnChangeWithOptionValue(
	menuId: string,
	changeProc: (aString: string) => void
): void {
	const menu = document.getElementById(menuId);
	if(menu) {
		menu.addEventListener('change', function(anEvent) {
			const target = anEvent.target;
			if(target) {
				const optionElement = <HTMLOptionElement>target;
				changeProc(optionElement.value);
			} else {
				console.warn(`menuOnChangeWithTargetValue: no target or no target.value: ${menuId}`);
			}
		});
	} else {
		console.warn(`menuOnChangeWithTargetValue: no element: ${menuId}`);
	}
}
