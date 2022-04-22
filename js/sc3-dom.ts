// sc3-dom.ts

// Return a function to set the inner Html of elemId
export function setter_for_inner_html_of(elemId: string): (innerHtml: string) => void {
    var elem = document.getElementById(elemId);
    return function(innerHtml) {
        if(elem) {
            elem.innerHTML = innerHtml;
        } else {
            console.warn('setter_for_inner_html_of: elem was nil?');
        }
    };
}

export function get_select_element_and_then(selectId: string, proc: (selectElement: HTMLSelectElement) => void): void {
    var selectElement = <HTMLSelectElement>document.getElementById(selectId);
    if(!selectElement) {
        console.error('get_select_element: not found: ', selectId);
    } else {
        proc(selectElement);
    }
}

// Set onchange handler of selectId, guards against absence of selection (proc is only called if value is set).
export function select_on_change(selectId: string, proc: (anElement: HTMLSelectElement, aString: string) => void): void {
    var guardedProc = function(anEvent: Event) {
        var target = <HTMLSelectElement>anEvent.target;
        if(target && target.value) {
            proc(target, target.value);
        }
    };
    get_select_element_and_then(selectId, selectElement => selectElement.addEventListener('change', guardedProc));
}

// Create option element and add to select element.
export function select_add_option_to(selectElement: HTMLSelectElement, optionValue: string, optionText: string): void {
    var optionElement = document.createElement('option');
    optionElement.value = optionValue;
    optionElement.text = optionText;
    selectElement.add(optionElement, null);
}

// Add option to selectId
export function select_add_option_at_id(selectId: string, optionValue: string, optionText: string): void {
    get_select_element_and_then(selectId, selectElement => select_add_option_to(selectElement, optionValue, optionText));
}

// Delete all options at selectId from startIndex
export function select_clear_from(selectId: string, startIndex: number): void {
    get_select_element_and_then(selectId, function(selectElement) {
        var endIndex = selectElement.length;
        for(var i = startIndex; i < endIndex; i++) {
            selectElement.remove(startIndex);
        }
    });
}

// Add all keys as entries, both value and text, at selectId
export function select_add_keys_as_options(selectId: string, keyArray: string[]): void {
    get_select_element_and_then(selectId, function(selectElement) {
        keyArray.forEach(function(key) {
            var option = document.createElement('option');
            option.value = key;
            option.text = key;
            selectElement.add(option, null);
        });
    });
}

// Add a listener to buttonId that passes click events to inputId.
export function connect_button_to_input(buttonId: string, inputId: string): void {
    var button = <HTMLButtonElement>document.getElementById(buttonId);
    var input = <HTMLInputElement>document.getElementById(inputId);
    if (!button || !input) {
        console.warn('connect_button_to_input: element not located?');
    } else {
        button.addEventListener('click', e => input.click(), false);
    }
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
    var params = new URLSearchParams(document.location.search);
    return params.get(key);
}

// Set key to value in window location url.
export function window_url_set_param(key: string, value: string): void {
    var windowUrl = new URL(window.location.href);
    windowUrl.searchParams.set(key, value);
    window.history.pushState({}, '', windowUrl);
}

export function parse_int_or_alert(integerText: string, errorText: string, defaultAnswer: number): number {
    var answer = Number.parseInt(integerText, 10);
    if(isNaN(answer)) {
        window.alert(errorText);
        return defaultAnswer;
    } else {
        return answer;
    }
}

export function parse_int_or_alert_and_then(integerText: string, errorText: string, proc: (aNumber: number) => void): void {
    var answer = Number.parseInt(integerText, 10);
    if(isNaN(answer)) {
        window.alert(errorText);
    } else {
        proc(answer);
    }
}

export function prompt_for_int_and_then(promptText: string, defaultValue: number, proc: (aNumber: number) => void): void {
    var integerText = window.prompt(promptText, String(defaultValue));
    if(integerText) {
        parse_int_or_alert_and_then(integerText, 'Not an integer?', proc);
    }
}
