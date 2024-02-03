import * as sc from '../dist/jssc3.js'

var mostRecentUgenGraph = null;

function playUgen(ugenGraph) {
	mostRecentUgenGraph = ugenGraph;
	globalScSynth.playUgenAt(ugenGraph, 0, -1, 1, [], null);
}

function jsPlay() {
	playUgen(eval(sc.getSelectedText()));
}

function stcPlay() {
	var stcText = sc.getSelectedText();
	console.log(`stcPlay: ${stcText}`);
	sc.stcToJs(stcText)
		.then(jsText => playUgen(eval(jsText)));
}

function insertMarkdown(text) {
	var reader = new commonmark.Parser();
	var writer = new commonmark.HtmlRenderer();
	document.getElementById('documentText').innerHTML = writer.render(reader.parse(text));
}

export function loadMd() {
	const inputFile = sc.getFileInputFile('programInputFile', 0);
	inputFile.text().then(insertMarkdown);
}

function ugenHelp() {
	const name = sc.getSelectedText();
	if(name.length > 0) {
		const helpPrefix = './lib/spl/help/Reference';
		const url = `${helpPrefix}/${name}.help.sl`;
		sc.fetchUtf8(url, { cache: 'no-cache' })
			.then(insertMarkdown);
	}
}

export function onKeyPress(event) {
	if(event.ctrlKey&& event.key === 'Enter') {
		stcPlay();
	} else if(event.ctrlKey&& event.key === ',') {
		jsPlay();
	} else if(event.ctrlKey&& event.key === '.') {
		globalScSynth.reset();
	} else if(event.ctrlKey&& event.key === ':') {
		if(mostRecentUgenGraph !== null) {
			sc.prettyPrintSyndefOf(mostRecentUgenGraph);
		}
	} else if(event.ctrlKey&& event.shiftKey && event.key === 'L') {
		document.getElementById('programInputFileSelect').click();
	} else if(event.ctrlKey&& event.shiftKey && event.key === 'H') {
		ugenHelp();
	}
}

export function loadHelp() {
	sc.fetchUtf8('help/Essay/SuperScript.md', { cache: 'no-cache' }).
		then(insertMarkdown);
}
