import * as sc from '../dist/jssc3.js';
import * as sl from '../lib/spl/dist/sl.js';

let mostRecentUgenGraph = null;

function playUgen(ugenGraph) {
	mostRecentUgenGraph = ugenGraph;
	globalScSynth.playUgenAt(ugenGraph, 0, -1, 1, [], null);
}

function jsPlay() {
	playUgen(eval(sc.getSelectedText()));
}

export function splPlay() {
	const splText = sc.getSelectedText();
	const jsText = sl.rewriteSlToJs(splText);
	console.log(`splPlay: ${jsText}`)
	playUgen(eval(jsText))
}

function insertMarkdown(text) {
	const reader = new commonmark.Parser();
	const writer = new commonmark.HtmlRenderer();
	document.getElementById('documentText').innerHTML = writer.render(
		reader.parse(text),
	);
}

export function loadMd() {
	const inputFile = sc.getFileInputFile('programInputFile', 0);
	inputFile.text().then(insertMarkdown);
}

function ugenHelp() {
	const name = sc.getSelectedText();
	if (name.length > 0) {
		const helpPrefix = './lib/spl/Help/Reference';
		const url = `${helpPrefix}/${name}.help.sl`;
		sc.fetchUtf8(url, { cache: 'no-cache' }).then(insertMarkdown);
	}
}

export function onKeyPress(event) {
	console.log(`onKeyPress: ${event.key}`);
	if (event.ctrlKey && event.key === 'Enter') {
		console.log(`onKeyPress: splPlay`);
		splPlay();
	} else if (event.ctrlKey && event.key === ',') {
		jsPlay();
	} else if (event.ctrlKey && event.key === '.') {
		globalScSynth.reset();
	} else if (event.ctrlKey && event.key === ':') {
		if (mostRecentUgenGraph !== null) {
			sc.prettyPrintSyndefOf(mostRecentUgenGraph);
		}
	} else if (event.ctrlKey && event.shiftKey && event.key === 'L') {
		document.getElementById('programInputFileSelect').click();
	} else if (event.ctrlKey && event.shiftKey && event.key === 'H') {
		ugenHelp();
	}
}

export function loadHelp() {
	sc.fetchUtf8('help/Essay/SuperScript.md', { cache: 'no-cache' }).then(
		insertMarkdown,
	);
}
