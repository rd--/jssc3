import * as sc from '../dist/jssc3.js'

var mostRecentUgenGraph = null;

function playUgen(ugenGraph) {
	mostRecentUgenGraph = ugenGraph;
	sc.scSynthEnsure(globalScSynth, function() {
		sc.playUgen(globalScSynth, ugenGraph, 1);
	});
}

function jsPlay() {
	playUgen(eval(sc.get_selected_text()));
}

function stcPlay() {
	var stcText = sc.get_selected_text();
	console.log(`stcPlay: ${stcText}`);
	sc.stc_to_js_and_then(stcText, function(jsText) {
		playUgen(eval(jsText));
	});
}

function insertMarkdown(text) {
	var reader = new commonmark.Parser();
	var writer = new commonmark.HtmlRenderer();
	document.getElementById('documentText').innerHTML = writer.render(reader.parse(text));
}

export function loadMd() {
	sc.read_text_file_from_file_input_and_then('programInputFile', 0, insertMarkdown);
}

function ugenHelp() {
	const name = sc.get_selected_text();
	if(name.length > 0) {
		const helpPrefix = './lib/stsc3/help/sc';
		const url = `${helpPrefix}/${name}.help.sl`;
		sc.load_utf8_and_then(url, insertMarkdown);
	}
}

export function onKeyPress(event) {
	if(event.ctrlKey&& event.key === 'Enter') {
		stcPlay();
	} else if(event.ctrlKey&& event.key === ',') {
		jsPlay();
	} else if(event.ctrlKey&& event.key === '.') {
		sc.resetScSynth(globalScSynth);
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
	sc.load_utf8_and_then('help/essay/superscript.md', insertMarkdown);
}
