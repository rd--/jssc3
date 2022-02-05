'use strict';

// string -> bool
function stc_is_binary_selector(text) {
    var allowed = Array.from('!%&*+/<=>?@\\~|-');
    var answer = Array.from(text).every(item => allowed.includes(item));
    // console.log('stc_is_binary_selector', text, answer);
    return answer;
}

// string -> string
function stc_binary_selector_from_operator(text) {
    switch(text) {
        case '+': return 'add';
        case '-': return 'sub';
        case '*': return 'mul';
        case '/': return 'fdiv';
        case '%': return 'mod';
        case '==': return 'eq';
        case '!=': return 'neq';
        case '<': return 'lt';
        case '>': return 'gt';
        case '<=': return 'le';
        case '>=': return 'ge';
        case '&': return 'bitAnd';
        case '|': return 'bitOr';
        case '<<': return 'bitShiftLeft';
        case '>>': return 'bitShiftRight';
        case '**': return 'pow';
        default: return text;
    }
}

// Request .stc to .js translation from server, result text is sent to proc (async).
function stc_to_js_and_then(stcText, proc) {
    var urlPrefix = 'https://rohandrape.net/pub/stsc3/cgi-bin/stc-to-js-cgi.py?stc=';
    var encodedStcText = encodeURIComponent(stcText);
    fetch_url_and_then(urlPrefix + encodedStcText, 'text', proc);
}
