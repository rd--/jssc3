/*

requires jspreadsheet

colLetter = a - h
colIndex = 0 - 7
rowNumber = 1 - 8
rowIndex = 0 - 7

*/

const calc = {};

function cellRefToBus(colLetter, rowNumber) {
	return calc.busOffset + sc.cellRefToLinearIndex(calc.numCol, colLetter, rowNumber);
}

function cellRefToGroup(colLetter, rowNumber) {
	return calc.groupOffset + sc.cellRefToLinearIndex(calc.numCol, colLetter, rowNumber);
}

function setCellColour(colLetter, rowNumber, colourString) {
	const cellRef = colLetter.toUpperCase() + String(rowNumber);
	calc.sheet.setStyle(cellRef, 'background-color', colourString);
}

function setCellStatusAndReturn(colLetter, rowNumber, success, result) {
	// console.debug('setCellStatusAndReturn', colLetter, rowNumber, success, result);
	setCellColour(colLetter, rowNumber, success ? '#ffffe8' : '#c1e7f8');
	return result;
}

function evalCellOrZero(colLetter, rowNumber, translatorStatus, text) {
	// console.debug('evalCellOrZero', colLetter, rowNumber, translatorStatus, '"' + text + '"');
	if(text === '' || text.substring(0, 2) === '//') {
		// console.debug('evalCellOrZero: empty cell or comment cell');
		return setCellStatusAndReturn(colLetter, rowNumber, translatorStatus, 0);
	} else {
		try {
		    const result = eval(text);
		    // console.debug('evalCellOrZero: success!');
		    return setCellStatusAndReturn(colLetter, rowNumber, translatorStatus, result);
		} catch (Err) {
		    // console.debug('evalCellOrZero: error!');
		    return setCellStatusAndReturn(colLetter, rowNumber, false, 0);
		}
	}
}

function evalCell(colLetter, rowNumber, cellText) {
	const programText = cellText.trim();
	console.debug(`evalCell: .sl = ${programText}`);
	const jsText = sl.rewriteString(programText);
	console.debug(`evalCell: .js = ${jsText}`);
	const translatorStatus =  programText === '' || jsText !== '';
	const cellValue = evalCellOrZero(colLetter, rowNumber, translatorStatus, jsText);
	const cellUgen = sc.isNumber(cellValue) ? sc.Dc(cellValue) : (sc.isControlRateUgen(cellValue) ? sc.K2A(cellValue) : cellValue);
	const cellPacket = cellUgenToOscPacket(colLetter, rowNumber, cellUgen);
	globalScSynth.sendOsc(cellPacket);
}

function getCellText(colLetter, rowNumber) {
	const colIndex = sc.columnLetterToIndex(colLetter);
	return calc.sheet.getCellFromCoords(colIndex, rowNumber - 1).textContent;
}

function allCellRefDo(proc) {
	sc.allCellRefDo(calc.numCol, calc.numRow, proc);
}

function evalSheet() {
	allCellRefDo(function(colLetter, rowNumber) {
		const cellText = getCellText(colLetter, rowNumber);
		evalCell(colLetter, rowNumber, cellText);
	});
}

function onChange (Instance, Cell, colIndex, rowIndex, cellText) {
	const colLetter = sc.columnIndexToLetter(Number(colIndex));
	const rowNumber = Number(rowIndex) + 1;
	// console.debug('onChange', colLetter, rowNumber, cellText);
	evalCell(colLetter, rowNumber, cellText.trim());
}

export function getCsv() {
	return calc.sheet.copy(false, ',', true, false, true);
}

function getDataArray() {
	return calc.sheet.getData(false, true);
}

export function getJson() {
	return JSON.stringify(getDataArray());
}

function setDataArray(dataArray) {
	calc.sheet.setData(dataArray);
}

export function setJson(jsonText) {
	const dataArray = JSON.parse(jsonText);
	setDataArray(dataArray);
	evalSheet();
}

export function initSheet(numCol, numRow) {
	calc.data = sc.arrayFill(numCol, () => sc.arrayFill(numRow, () => ''));
	calc.numCol = numCol;
	calc.numRow = numRow;
	calc.busOffset = 24;
	calc.groupOffset = 12;
	calc.sheet = jspreadsheet(document.getElementById('supercalcContainer'), {
		data: calc.data,
		columns: sc.arrayFillWithIndex(numCol, function(colIndex) {
		        return { type: 'text', title: sc.columnIndexToLetter(colIndex), width: 200 };
		}),
		onchange: onChange,
		allowInsertRow: false,
		allowInsertColumn: false,
		defaultColAlign:'left'
	});

}

function genCellReaderBusDeclaration(colLetter, rowNumber) {
	const busIndex = cellRefToBus(colLetter, rowNumber);
	const varName = colLetter + String(rowNumber);
	return ('var _' + varName + ' = sc.InFb(1, ' + String(busIndex) + ');');
}

function defineCellVariables() {
	allCellRefDo(function(colLetter, rowNumber) {
		const codeText = genCellReaderBusDeclaration(colLetter, rowNumber);
		const globalEval = eval; // https://262.ecma-international.org/5.1/#sec-10.4.2
		// console.debug(codeText);
		globalEval(codeText);
	});
}

function cellUgenToOscPacket(colLetter, rowNumber, ugen) {
	const cellName = colLetter + String(rowNumber);
	const busIndex = cellRefToBus(colLetter, rowNumber);
	const graph = sc.makeUgenGraph(cellName, sc.wrapOut(busIndex, ugen));
	const syndef = sc.graphEncodeSyndef(graph);
	const groupId = cellRefToGroup(colLetter, rowNumber);
	const gFreeMsg = sc.g_freeAll1(groupId);
	const sNewMsg = sc.s_new0(cellName, -1, sc.kAddToHead, groupId);
	const dRecvMsg = sc.d_recv(syndef, osc.writePacket(sNewMsg));
	const bundle = {
		timeTag: 1,
		packets: [gFreeMsg, dRecvMsg]
	};
	// console.debug('cellUgenToOscMessage', colLetter, rowNumber, cellName, busIndex, groupId, bundle);
	return bundle;
}

function createAndInitCellGroups() {
	allCellRefDo(function(colLetter, rowNumber) {
		const groupId = cellRefToGroup(colLetter, rowNumber);
		const gNewMsg = sc.g_new1(groupId, sc.kAddToTail, 0);
		globalScSynth.sendOsc(gNewMsg);
		globalScSynth.sendOsc(cellUgenToOscPacket(colLetter, rowNumber, sc.Dc(0)));
	});
}

export function serverSetup() {
	// console.debug('serverSetup');
	defineCellVariables();
	createAndInitCellGroups();
}

export function initProgramMenu() {
	sc.fetchUtf8('text/supercalc-programs.text', { cache: 'no-cache' })
		.then(text => sc.selectAddKeysAsOptions('programMenu', sc.stringNonEmptyLines(text)));
	sc.menuOnChangeWithOptionValue('programMenu', function(optionValue) {
		sc.fetchUtf8(`./help/supercalc/${optionValue}`, { cache: 'no-cache' })
			.then(text => setJson(text));
	});
}

/*
cellRefToBus('g', 4)
cellRefToGroup('g', 4)
evalOrZero('a', 1, true, 'referenceToUndefinedName')
genCellReaderBusDeclaration('a', 1)
*/
