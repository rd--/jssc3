import { consoleDebug } from '../kernel/error.ts'
import { fetch_url_and_then } from '../kernel/io.ts'

export function stc_is_binary_selector(text: string): boolean {
	const allowed = Array.from('!%&*+/<=>?@\\~|-');
	const answer = Array.from(text).every(item => allowed.includes(item));
	return answer;
}

export function stc_binary_selector_from_operator(text: string): string {
	switch(text) {
		case '+': return 'Add';
		case '-': return 'Sub';
		case '*': return 'Mul';
		case '/': return 'Fdiv';
		case '%': return 'Mod';
		case '==': return 'Eq';
		case '!=': return 'Neq';
		case '<': return 'Lt';
		case '>': return 'Gt';
		case '<=': return 'Le';
		case '>=': return 'Ge';
		case '&': return 'BitAnd';
		case '|': return 'BitOr';
		case '<<': return 'ShiftLeft';
		case '>>': return 'ShiftRight';
		case '**': return 'Pow';
		case 'midiCps': return 'MidiCps';
		default: consoleDebug(`stc_binary_selector_from_operator: ${text}`); return text;
	}
}

// Request .stc to .js translation from server, result text is sent to proc (async).
export function stc_to_js_and_then(stcText: string, proc: (x: string) => void): void {
	if(stcText.trim() === '') {
		proc('');
	} else {
		const urlPrefix = 'cgi-bin/stsc3-cgi.py?cmd=stc-to-js&stc=';
		const encodedStcText = encodeURIComponent(stcText);
		fetch_url_and_then(urlPrefix + encodedStcText, 'text', proc);
	}
}
