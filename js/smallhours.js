import * as sc from '../dist/jssc3.js'
import * as sl from '../lib/spl/dist/sl.js'

export function evalRegion() {
	const answer = eval(sl.rewriteString(sc.getSelectedTextOrContentsOf('programText')));
	console.log(answer);
	return answer;
}

export function playRegion() {
	eval(sl.rewriteString(`{ ${sc.getSelectedTextOrContentsOf('programText')} }.play`));
}

export const state = { autoPlay: false, oracleFiles: null };

function clear() {
	_removeAll_1(_clock_1(_system));
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
		globalScSynth.reset();
		playRegion();
	}
}

export function insertTextFor(label) {
	return function(text) {
		insertText(label, text);
	}
}

export function loadInputFile() {
	const inputFile = sc.getFileInputFile('programInputFile', 0);
	if (inputFile) {
		inputFile.text().then(insertTextFor(`?load=${inputFile.name}`));
	} else {
		console.log('loadInputFile: no file name');
	}
}

export function loadHelpFor(area, name) {
	if(name.length > 0) {
		const isGuide = name.includes(' ');
		const kind = isGuide ? 'Guide' : 'Reference';
		const rewrittenName = isGuide ? name : (sl.isOperatorName(name) ? sl.operatorMethodName(name) : name);
		const url = `lib/spl/help/${area}/${kind}/${rewrittenName}.help.sl`;
		const address = `?${kind}=${rewrittenName}`;
		sc.fetchUtf8(url, { cache: 'no-cache' })
			.then(insertTextFor(address));
	}
}

export function loadHelp(area) {
	loadHelpFor(area, sc.getSelectedText());
}

export function keyBindings(event) {
	// console.log('keyBindings', event.ctrlKey, event.shiftKey, event.key);
	if(event.ctrlKey) {
		if(event.key === 'Enter') {
			event.preventDefault();
			event.shiftKey ? evalRegion() : playRegion();
		} else if(event.key === '.') {
			globalScSynth.reset();
			clear();
		} else if(event.shiftKey && event.key === '>') {
			clear();
		} else if(event.shiftKey && event.key === 'L') {
			document.getElementById('programInputFileSelect').click();
		} else if(event.shiftKey && event.key === 'H') {
			loadHelp('SuperCollider');
		} else if(event.key === 'm') {
			loadHelp('Language');
		} else if(event.shiftKey && event.key === '?') {
			loadHelp('SuperCollider');
			loadHelp('Language');
		}
	}
}

export function loadUrlParam() {
	const fileName = sc.urlGetParam('e')
	if(fileName) {
		console.log(`loadUrlParam: ${fileName}`);
		sc.fetchUtf8(fileName, { cache: 'no-cache' })
			.then(text => insertText(null, text));
	}
}

export function loadInstructions() {
	loadHelpFor('SuperCollider', 'Small Hours');
}

export function initProgramMenu() {
	sc.fetchUtf8('text/smallhours-programs.text', { cache: 'no-cache' })
		.then(text => sc.selectAddKeysAsOptions('programMenu', sc.stringNonEmptyLines(text)));
	sc.menuOnChangeWithOptionValue('programMenu', function(optionValue) {
		sc.fetchUtf8(`./lib/stsc3/help/${optionValue}`, { cache: 'no-cache' })
			.then(text => insertText(null, text));
	});
}

export function initOracle() {
	sc.fetchUtf8('text/smallhours-oracle.text', { cache: 'no-cache' })
		.then(text => state.oracleFiles = sc.stringNonEmptyLines(text));
}

export function loadOracle() {
	var fileName = sc.arrayChoose(state.oracleFiles);
	sc.fetchUtf8(`./lib/stsc3/help/${fileName}`, { cache: 'no-cache' })
		.then(text => insertText(null, text));
}

export function initStatusListener() {
	sc
	let f = sc.setterForInnerHtmlOf('statusText');
	setInterval(function() {
			if(globalScSynth.isAlive) {
				f(globalScSynth.status.ugenCount);
			} else {
				f('---');
			}
	});
}
