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
		case '->': return 'Association';
		default: console.warn(`stc_binary_selector_from_operator: ${text}`); return text;
	}
}

// Request .stc to .js translation from server.
export function stc_to_js(stcText: string): Promise<string> {
	if(stcText.trim() === '') {
		return new Promise((resolve, reject) => resolve(''));
	} else {
		const urlPrefix = 'cgi-bin/stsc3-cgi.py?cmd=stc-to-js&stc=';
		const encodedStcText = encodeURIComponent(stcText);
		return fetch(urlPrefix + encodedStcText).then(response => response.text());
	}
}
