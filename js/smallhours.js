/* import * as commonmark from './lib/commonmark.js/dist/commonmark.js' */

import * as sc from '../dist/jssc3.js'
import * as sl from '../lib/spl/dist/sl.js'

export function evalRegion() {
	const answer = eval(sl.rewriteString(sc.get_selected_text_or_contents_of('programText')));
	console.log(answer);
	return answer;
}

export function playRegion() {
	eval(sl.rewriteString(`{ ${sc.get_selected_text_or_contents_of('programText')} }.play`));
}

export const state = { autoPlay: false, oracleFiles: null };

function clear() {
	if(sl.slOptions.simpleArityModel) {
		_clear(_workspace.get('clock'));
	} else {
		_clear_1(_workspace.get('clock'));
	}
}

export function insertText(label, text) {
	if(label) {
		window.history.pushState({text: text}, '', label);
	}
	if(text[0] === '#') {
		var reader = new commonmark.Parser({smart: true});
		var writer = new commonmark.HtmlRenderer();
		sc.setInnerHtml('documentText', writer.render(reader.parse(text)), false);
	} else {
		sc.setTextContent('programText', text, false);
	}
	if(state.autoPlay) {
		clear();
		sc.resetScsynth(globalScsynth);
		playRegion();
	}
}

export function insertTextFor(label) {
	return function(text) {
		insertText(label, text);
	}
}

export function loadInputFile() {
	const inputFile = sc.get_file_input_file('programInputFile', 0);
	if (inputFile) {
		sc.read_text_file_and_then(inputFile, insertTextFor(`?load=${inputFile.name}`));
	} else {
		console.log('loadInputFile: no file name');
	}
}

export function loadHelp(kind, helpPrefix, docPrefix) {
	const name = sc.get_selected_text();
	if(name.length > 0) {
		const isDoc = name.includes(' ');
		const prefix = isDoc ? docPrefix : helpPrefix
		const rewrittenName = isDoc ? name : (sl.isOperatorName(name) ? sl.operatorMethodName(name) : name);
		const url = `${prefix}/${rewrittenName}.help.sl`;
		const address = `?${kind}=${rewrittenName}`;
		sc.load_utf8_and_then(url, insertTextFor(address));
	}
}

export function keyBindings(event) {
	// console.log('keyBindings', event.ctrlKey, event.shiftKey, event.key);
	if(event.ctrlKey && (event.key === 'Enter' || event.key === ',')) {
		event.shiftKey ? evalRegion() : playRegion();
	} else if(event.ctrlKey && event.key === '.') {
		sc.resetScsynth(globalScsynth);
		clear();
	} else if(event.ctrlKey && event.shiftKey && event.key === '>') {
		clear();
	} else if(event.ctrlKey && event.shiftKey && event.key === 'L') {
		document.getElementById('programInputFileSelect').click();
	} else if(event.ctrlKey && event.shiftKey && event.key === 'H') {
		loadHelp('help', './lib/stsc3/help/sc', './lib/stsc3/doc/sc');
	} else if(event.ctrlKey && event.key === 'm') {
		loadHelp('manual', './lib/spl/help', './lib/spl/doc');
	} else if(event.ctrlKey && event.shiftKey && event.key === '?') {
		loadHelp('manual', './lib/spl/help', './lib/spl/doc');
		loadHelp('help', './lib/stsc3/help/sc', './lib/stsc3/doc/sc');
	}
}

export function loadUrlParam() {
	const fileName = sc.url_get_param('e')
	if(fileName) {
		console.log(`loadUrlParam: ${fileName}`);
		sc.load_utf8_and_then(fileName, (text) => insertText(null, text));
	}
}

export function loadInstructions() {
	sc.load_utf8_and_then('lib/stsc3/doc/sc/Small Hours.help.sl', insertTextFor('?manual=Small Hours'));
}

export function initProgramMenu() {
	sc.load_utf8_and_then('text/smallhours-programs.text', text => sc.select_add_keys_as_options('programMenu', sc.stringNonEmptyLines(text)));
	sc.menu_on_change_with_option_value('programMenu', function(optionValue) {
		sc.load_utf8_and_then(`./lib/stsc3/help/${optionValue}`, (text) => insertText(null, text));
	});
}

export function initOracle() {
	sc.load_utf8_and_then('text/smallhours-oracle.text', text => state.oracleFiles = sc.stringNonEmptyLines(text));
}

export function loadOracle() {
	var fileName = sc.arrayChoose(state.oracleFiles);
	sc.load_utf8_and_then(`./lib/stsc3/help/${fileName}`, (text) => insertText(null, text));
}
