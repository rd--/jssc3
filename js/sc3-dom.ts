'use strict';

// Return a function to set the inner Html of elemId
function setter_for_inner_html_of(elemId : string) : (x : string) => void {
    var elem = document.getElementById(elemId);
    return function(innerHtml) {
        if(elem) {
            elem.innerHTML = innerHtml;
        } else {
            console.warn('setter_for_inner_html_of: elem was nil?');
        }
    };
}

// Set onchange handler of selectId, guards against absence of selection (proc is only called if value is set).
function select_on_change(selectId : string, proc : (x : string) => void) : void {
    var select = <HTMLSelectElement>document.getElementById(selectId);
    var guardedProc = function(event : Event) {
        var target = <HTMLSelectElement>event.target;
        if(target && target.value) {
            proc(target.value);
        }
    };
    select.addEventListener('change', guardedProc);
}

// Create option element and add to select element.
function select_add_option_to(select : HTMLSelectElement, value : string, text : string) : void {
    var option = document.createElement('option');
    option.value = value;
    option.text = text;
    select.add(option, null);
}

// Add option to selectId
function select_add_option_at_id(selectId : string, value : string, text : string) : void {
    var select = <HTMLSelectElement>document.getElementById(selectId);
    select_add_option_to(select, value, text);
}

// Delete all options at selectId from startIndex
function select_clear_from(selectId : string, startIndex : number) : void {
    var select = <HTMLSelectElement>document.getElementById(selectId);
    var k = select.length;
    for(var i = startIndex; i < k; i++) {
        select.remove(startIndex);
    }
}

// Add all keys as entries, both value and text, at selectId
function select_add_keys_as_options(selectId : string, keyArray : string[]) : void {
    var select = <HTMLSelectElement>document.getElementById(selectId);
    keyArray.forEach(function(key) {
        var option = document.createElement('option');
        option.value = key;
        option.text = key;
        select.add(option, null);
        console.debug('select_add_keys_as_options', key);
    });
}

// Add a listener to buttonId that passes click events to inputId.
function connect_button_to_input(buttonId : string, inputId : string) : void {
    var button = <HTMLButtonElement>document.getElementById(buttonId);
    var input = <HTMLInputElement>document.getElementById(inputId);
    if (!button || !input) {
        console.warn('connect_button_to_input: element not located?');
    } else {
        button.addEventListener('click', e => input.click(), false);
    }
}

// If some text is selected, get only the selected text, else get the entire text.
function textarea_get_selection_or_contents(textarea : HTMLTextAreaElement) : string {
    if(textarea.selectionStart === textarea.selectionEnd) {
        return textarea.value;
    } else {
        return textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    }
}

// Lookup key in parameters of Url of current document.  (C.f. window.location)
function url_get_param(key : string) : null | string {
    var params = new URLSearchParams(document.location.search);
    return params.get(key);
}

// Set key to value in window location url.
function window_url_set_param(key : string, value : string) : void {
    var windowUrl = new URL(window.location.href);
    windowUrl.searchParams.set(key, value);
    window.history.pushState({}, '', windowUrl);
}
