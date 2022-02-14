'use strict';

// Return a function to set the inner Html of elemId
function setter_for_inner_html_of(elemId) {
    var elem = document.getElementById(elemId);
    return function(innerHtml) {
        elem.innerHTML = innerHtml;
    };
}

// Set onchange handler of selectId, guards against absence of selection (proc is only called if value is set).
function select_on_change(selectId, proc) {
    var select = document.getElementById(selectId);
    select.addEventListener('change', e => e.target.value ? proc(e.target.value) : null);
}

// Create option element and add to select element.
function select_add_option_to(select, value, text) {
    var option = document.createElement('option');
    option.value = value;
    option.text = text;
    select.add(option, null);
}

// Add option to selectId
function select_add_option_at_id(selectId, value, text) {
    var select = document.getElementById(selectId);
    select_add_option_to(select, value, text)
}

// Delete all options at selectId from startIndex
function select_clear_from(selectId, startIndex) {
    var select = document.getElementById(selectId);
    var k = select.length;
    for(var i = startIndex; i < k; i++) {
        select.remove(startIndex);
    }
}

// Add all keys as entries, both value and text, at selectId
function select_add_keys_as_options(selectId, keyArray) {
    var select = document.getElementById(selectId);
    keyArray.forEach(function(key) {
        var option = document.createElement('option');
        option.value = key;
        option.text = key;
        select.add(option, null);
        console.debug('select_add_keys_as_options', key);
    });
}

// Add a listener to buttonId that passes click events to inputId.
function connect_button_to_input(buttonId, inputId) {
    var button = document.getElementById(buttonId);
    var input = document.getElementById(inputId);
    button.addEventListener('click', e => input.click(), false);
}

// If some text is selected, get only the selected text, else get the entire text.
function textarea_get_selection_or_contents(textarea) {
    if(textarea.selectionStart == textarea.selectionEnd) {
        return textarea.value;
    } else {
        return textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    }
}
