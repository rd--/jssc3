// sc3-stc.ts ; requires: sc3-io.ts

function stc_is_binary_selector(text: string): boolean {
    var allowed = Array.from('!%&*+/<=>?@\\~|-');
    var answer = Array.from(text).every(item => allowed.includes(item));
    console.debug('stc_is_binary_selector', text, answer);
    return answer;
}

function stc_binary_selector_from_operator(text: string): string {
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
function stc_to_js_and_then(stcText: string, proc: (x: string) => void): void {
    if(stcText.trim() === '') {
        proc('');
    } else {
        var urlPrefix = 'cgi-bin/stsc3-cgi.py?cmd=stc-to-js&stc=';
        var encodedStcText = encodeURIComponent(stcText);
        fetch_url_and_then(urlPrefix + encodedStcText, 'text', proc);
    }
}
