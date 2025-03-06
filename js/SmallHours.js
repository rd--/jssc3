import * as sc from '../dist/jssc3.js';
import * as sl from '../lib/spl/dist/sl.js';

export function evalRegion() {
	const answer = eval(
		sl.rewriteSlToJs(_paragraphAtCaret_1(window)),
	);
	console.log(answer);
	return answer;
}

export function playRegion() {
	eval(
		sl.rewriteSlToJs(
			`{ ${_paragraphAtCaret_1(window)} }.value.play`,
		),
	);
}

export const state = { autoPlay: false, oracleFiles: null };

function clear() {
	_removeAll_1(_clock_1(_system));
}

export function insertText(label, text) {
	if (label) {
		globalThis.history.pushState({ text: text }, '', label);
	}
	if (text[0] === '#') {
		const reader = new commonmark.Parser({ smart: true });
		const writer = new commonmark.HtmlRenderer();
		sc.setInnerHtml('documentText', writer.render(reader.parse(text)), false);
	} else {
		sc.setTextContent('programText', text, false);
	}
	if (state.autoPlay) {
		clear();
		globalScSynth.reset();
		playRegion();
	}
}

export function insertTextFor(label) {
	return (text) => {
		insertText(label, text);
	};
}

export function loadInputFile() {
	const inputFile = sc.getFileInputFile('programInputFile', 0);
	if (inputFile) {
		inputFile.text().then(insertTextFor(`?load=${inputFile.name}`));
	} else {
		console.log('loadInputFile: no file name');
	}
}

export function loadHelpFor(name) {
	if (name.length > 0) {
		const isGuide = name.includes(' ');
		const kind = isGuide ? 'Guide' : 'Reference';
		const rewrittenName = isGuide
			? name
			: sl.resolveTokenName(name);
		const url = `lib/spl/Help/${kind}/${rewrittenName}.help.sl`;
		const address = `?${kind}=${rewrittenName}`;
		sc.fetchUtf8(url, { cache: 'no-cache' }).then(
			insertTextFor(address),
		);
	}
}

export function loadHelp() {
	loadHelpFor(sc.getSelectedText());
}

export function keyBindings(event) {
	// console.log('keyBindings', event.ctrlKey, event.shiftKey, event.key);
	if (event.ctrlKey) {
		if (event.key === 'Enter') {
			event.preventDefault();
			event.shiftKey ? evalRegion() : playRegion();
		} else if (event.key === '.') {
			globalScSynth.reset();
			clear();
		} else if (event.shiftKey && event.key === '>') {
			clear();
		} else if (event.shiftKey && event.key === 'L') {
			document.getElementById('programInputFileSelect').click();
		} else if (event.shiftKey && event.key === 'H') {
			loadHelp();
		} else if (event.shiftKey && event.key === '?') {
			loadHelp();
		}
	}
}

export function loadUrlParam() {
	const fileName = sc.urlGetParam('e');
	if (fileName) {
		console.log(`loadUrlParam: ${fileName}`);
		sc.fetchUtf8(fileName, { cache: 'no-cache' }).then(
			(text) => insertText(null, text),
		);
	}
}

export function loadInstructions() {
	loadHelpFor('Small Hours');
}

export function initProgramMenu() {
	sc.fetchUtf8('text/SmallHoursPrograms.text', { cache: 'no-cache' }).then(
		(text) =>
			sc.selectAddKeysAsOptions(
				'programMenu',
				sc.stringNonEmptyLines(text),
			),
	);
	sc.menuOnChangeWithOptionValue('programMenu', (optionValue) => {
		sc.fetchUtf8(`./lib/spl/Program/SuperCollider/${optionValue}`, {
			cache: 'no-cache',
		}).then(
			(text) => insertText(null, text),
		);
	});
}

export function initOracle() {
	sc.fetchUtf8('text/SmallHoursOracle.text', { cache: 'no-cache' }).then(
		(text) => state.oracleFiles = sc.stringNonEmptyLines(text),
	);
}

export function loadOracle() {
	const fileName = sc.arrayChoose(state.oracleFiles);
	sc.fetchUtf8(`./lib/spl/Program/SuperCollider/${fileName}`, {
		cache: 'no-cache',
	}).then(
		(text) => insertText(null, text),
	);
}

export function initStatusListener() {
	const f = sc.setterForInnerHtmlOf('statusText');
	setInterval(() => {
		if (globalScSynth.isAlive) {
			f(globalScSynth.status.ugenCount);
		} else {
			f('---');
		}
	});
}
