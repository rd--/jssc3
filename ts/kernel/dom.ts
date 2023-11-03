// document.getSelection.toString()
export function get_selected_text(): string {
	const selection = document.getSelection();
	return selection ? selection.toString() : '';
}

export function get_selected_text_or_contents_of(elemId: string): string {
	var selectedText = get_selected_text().trim();
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
export function setter_for_inner_html_of(elemId: string): (innerHtml: string) => void {
	const elem = document.getElementById(elemId);
	return function(innerHtml) {
		if(elem) {
			elem.innerHTML = innerHtml;
		} else {
			console.warn(`setter_for_inner_html_of: ${elemId}: elem was nil`);
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

export function get_select_element_and_then(
	selectId: string,
	selectProcedure: (selectElement: HTMLSelectElement) => void
): void {
	withElement(selectId, <(element: HTMLElement) => void>selectProcedure);
}

/* Set onchange handler of selectId,
guards against absence of selection (proc is only called if value is set). */
export function select_on_change(
	selectId: string,
	proc: (anElement: HTMLSelectElement, aString: string) => void
): void {
	const guardedProc = function(anEvent: Event) {
		const target = <HTMLSelectElement>anEvent.target;
		if(target && target.value) {
			proc(target, target.value);
		}
	};
	get_select_element_and_then(selectId, selectElement => selectElement.addEventListener('change', guardedProc));
}

// Create option element and add to select element.
export function select_add_option_to(
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
export function select_add_option_at_id(
	selectId: string,
	optionValue: string,
	optionText: string
): void {
	get_select_element_and_then(
		selectId,
		selectElement => select_add_option_to(selectElement, optionValue, optionText)
	);
}

// Delete all options at selectId from startIndex
export function select_clear_from(selectId: string, startIndex: number): void {
	get_select_element_and_then(selectId, function(selectElement) {
		const endIndex = selectElement.length;
		for(let i = startIndex; i < endIndex; i++) {
			selectElement.remove(startIndex);
		}
	});
}

// Add all keys as entries, both value and text, at selectId
export function select_add_keys_as_options(selectId: string, keyArray: string[]): void {
	get_select_element_and_then(selectId, function(selectElement) {
		keyArray.forEach(function(key) {
			const option = document.createElement('option');
			option.value = key;
			option.text = key;
			selectElement.add(option, null);
		});
	});
}

// Add a listener to buttonId that passes click events to inputId.
export function connect_button_to_input(buttonId: string, inputId: string): void {
	const button = <HTMLButtonElement>document.getElementById(buttonId);
	const input = <HTMLInputElement>document.getElementById(inputId);
	if (!button || !input) {
		console.warn('connect_button_to_input: element not located?');
	} else {
		button.addEventListener('click', _unusedEvent => input.click(), false);
	}
}

export function click_input(inputId: string): void {
	withElement(inputId, inputElement => inputElement.click());
}

// If some text is selected, get only the selected text, else get the entire text.
export function textarea_get_selection_or_contents(textareaElement: HTMLTextAreaElement): string {
	if(textareaElement.selectionStart === textareaElement.selectionEnd) {
		return textareaElement.value;
	} else {
		return textareaElement.value.substring(textareaElement.selectionStart, textareaElement.selectionEnd);
	}
}

// Lookup key in parameters of Url of current document.  (C.f. window.location)
export function url_get_param(key: string): null | string {
	const params = new URLSearchParams(document.location.search);
	return params.get(key);
}

// Set key to value in window location url.
export function window_url_set_param(key: string, value: string): void {
	const windowUrl = new URL(window.location.href);
	windowUrl.searchParams.set(key, value);
	window.history.pushState({}, '', windowUrl);
}

export function parse_int_or_alert(integerText: string, errorText: string, defaultAnswer: number): number {
	const answer = Number.parseInt(integerText, 10);
	if(isNaN(answer)) {
		window.alert(errorText);
		return defaultAnswer;
	} else {
		return answer;
	}
}

export function parse_int_or_alert_and_then(
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

export function prompt_for_int_and_then(
	promptText: string,
	defaultValue: number,
	proc: (aNumber: number) => void
): void {
	const integerText = window.prompt(promptText, String(defaultValue));
	if(integerText) {
		parse_int_or_alert_and_then(integerText, 'Not an integer?', proc);
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

export function menu_on_change_with_option_value(
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
				console.warn(`menu_on_change_with_target_value: no target or no target.value: ${menuId}`);
			}
		});
	} else {
		console.warn(`menu_on_change_with_target_value: no element: ${menuId}`);
	}
}
