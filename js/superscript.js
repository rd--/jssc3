import * as sc from '../dist/jssc3.js'

var mostRecentUgenGraph = null;

function playUgen(ugenGraph) {
	mostRecentUgenGraph = ugenGraph;
	globalScSynth.playUgenAt(ugenGraph, -1, 1, [], null);
}

function jsPlay() {
	playUgen(eval(sc.get_selected_text()));
}

function stcPlay() {
	var stcText = sc.get_selected_text();
	console.log(`stcPlay: ${stcText}`);
	sc.stc_to_js(stcText)
		.then(jsText => playUgen(eval(jsText)));
}

function insertMarkdown(text) {
	var reader = new commonmark.Parser();
	var writer = new commonmark.HtmlRenderer();
	document.getElementById('documentText').innerHTML = writer.render(reader.parse(text));
}

export function loadMd() {
	const inputFile = sc.get_file_input_file('programInputFile', 0);
	inputFile.text().then(insertMarkdown);
}

function ugenHelp() {
	const name = sc.get_selected_text();
	if(name.length > 0) {
		const helpPrefix = './lib/spl/help/SuperCollider/Reference';
		const url = `${helpPrefix}/${name}.help.sl`;
		sc.fetch_utf8(url, { cache: 'no-cache' })
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
	sc.fetch_utf8('help/essay/superscript.md', { cache: 'no-cache' }).
		then(insertMarkdown);
}
