// sc3-supercalc.js ; requires jspreadsheet

'use strict';

var sc3_supercalc_num_col;
var sc3_supercalc_num_row;
var sc3_supercalc_bus_offset;
var sc3_supercalc_group_offset;
var sc3_supercalc_data;
var sc3_supercalc_sheet;

/*
col_letter = a - h
col_index = 0 - 7
row_number = 1 - 8
row_index = 0 - 7
*/

// sc3_supercalc_cellref_to_bus('g', 4)
function sc3_supercalc_cellref_to_bus(col_letter, row_number) {
	return sc3_supercalc_bus_offset + sc.cellref_to_linear_index(sc3_supercalc_num_col, col_letter, row_number);
}

// sc3_supercalc_cellref_to_group('g', 4)
function sc3_supercalc_cellref_to_group(col_letter, row_number) {
	return sc3_supercalc_group_offset + sc.cellref_to_linear_index(sc3_supercalc_num_col, col_letter, row_number);
}

function sc3_supercalc_set_cell_colour(col_letter, row_number, colour_string) {
	var cell_ref = col_letter.toUpperCase() + String(row_number);
	sc3_supercalc_sheet.setStyle(cell_ref, 'background-color', colour_string);
}

function sc3_supercalc_set_cell_status_and_return(col_letter, row_number, success, result) {
	sc.consoleDebug('sc3_supercalc_set_cell_status_and_return', col_letter, row_number, success, result);
	sc3_supercalc_set_cell_colour(col_letter, row_number, success ? '#ffffe8' : '#c1e7f8');
	return result;
}

// sc3_supercalc_eval_or_zero('a', 1, true, 'referenceToUndefinedName')
function sc3_supercalc_eval_or_zero(col_letter, row_number, translator_status, text) {
	sc.consoleDebug('sc3_supercalc_eval_or_zero', col_letter, row_number, translator_status, '"' + text + '"');
	if(text === '' || text.substring(0, 2) === '//') {
		sc.consoleDebug('sc3_supercalc_eval_or_zero: empty cell or comment cell');
		return sc3_supercalc_set_cell_status_and_return(col_letter, row_number, translator_status, 0);
	} else {
		try {
		    var result = eval(text);
		    sc.consoleDebug('sc3_supercalc_eval_or_zero: success!');
		    return sc3_supercalc_set_cell_status_and_return(col_letter, row_number, translator_status, result);
		} catch (e) {
		    sc.consoleDebug('sc3_supercalc_eval_or_zero: error!');
		    return sc3_supercalc_set_cell_status_and_return(col_letter, row_number, false, 0);
		}
	}
}

function sc3_supercalc_eval_cell(col_letter, row_number, cell_text) {
	var program_text = cell_text.trim();
	sc.stc_to_js_and_then(program_text, function (js_text) {
		var translator_status =  program_text === '' || js_text !== '';
		var cell_value = sc3_supercalc_eval_or_zero(col_letter, row_number, translator_status, js_text);
		var cell_ugen = sc.isNumber(cell_value) ? sc.DC(cell_value) : (sc.isControlRateUgen(cell_value) ? sc.K2A(cell_value) : cell_value);
		var cell_packet = sc3_supercalc_cell_ugen_to_osc_packet(col_letter, row_number, cell_ugen);
		sc.sendOsc(sc.globalScsynth, cell_packet);
	});
}

function sc3_supercalc_get_cell_text(col_letter, row_number) {
	var col_index = sc.column_letter_to_index(col_letter);
	return sc3_supercalc_sheet.getCellFromCoords(col_index, row_number - 1).textContent;
}

function sc3_supercalc_all_cellref_do(proc) {
	sc.all_cellref_do(sc3_supercalc_num_col, sc3_supercalc_num_row, proc);
}

function sc3_supercalc_eval_sheet() {
	sc3_supercalc_all_cellref_do(function(col_letter, row_number) {
		var cell_text = sc3_supercalc_get_cell_text(col_letter, row_number);
		sc3_supercalc_eval_cell(col_letter, row_number, cell_text);
	});
}

function sc3_supercalc_on_change (instance, cell, col_index, row_index, cell_text) {
	var col_letter = column_index_to_letter(Number(col_index));
	var row_number = Number(row_index) + 1;
	sc.consoleDebug('sc3_supercalc_on_change', col_letter, row_number, cell_text);
	sc3_supercalc_eval_cell(col_letter, row_number, cell_text.trim());
}

function sc3_supercalc_get_csv() {
	return sc3_supercalc_sheet.copy(false, ',', true, false, true);
}

function sc3_supercalc_get_data_array() {
	return sc3_supercalc_sheet.getData(false, true);
}

function sc3_supercalc_get_json() {
	return JSON.stringify(sc3_supercalc_get_data_array());
}

function sc3_supercalc_set_data_array(dataArray) {
	sc3_supercalc_sheet.setData(dataArray);
}

function sc3_supercalc_set_json(jsonText) {
	var dataArray = JSON.parse(jsonText);
	sc3_supercalc_set_data_array(dataArray);
	sc3_supercalc_eval_sheet();
}

function sc3_supercalc_init (editor, numCol, numRow) {
	sc3_supercalc_data = sc.arrayFill(numCol, () => sc.arrayFill(numRow, () => ''));
	sc3_supercalc_num_col = numCol;
	sc3_supercalc_num_row = numRow;
	sc3_supercalc_bus_offset = 24;
	sc3_supercalc_group_offset = 12;
	sc3_supercalc_sheet = jspreadsheet(document.getElementById('sc3_supercalc'), {
		data: sc3_supercalc_data,
		columns: sc.arrayFillWithIndex(numCol, function(col_index) {
		        return { type: 'text', title: sc.column_index_to_letter(col_index), width: 200 };
		}),
		onchange: sc3_supercalc_on_change,
		allowInsertRow: false,
		allowInsertColumn: false,
		defaultColAlign:'left'
	});
	editor.get_selected_text = function() { return ''; };
	editor.get_data = sc3_supercalc_get_json;
	editor.set_data = sc3_supercalc_set_json;
}

// sc3_supercalc_gen_cell_reader_bus_declaration('a', 1)
function sc3_supercalc_gen_cell_reader_bus_declaration(col_letter, row_number) {
	var bus_index = sc3_supercalc_cellref_to_bus(col_letter, row_number);
	var var_name = col_letter + String(row_number);
	return ('var ' + var_name + ' = sc.InFb(1, ' + String(bus_index) + ');');
}

// sc3_supercalc_define_cell_variables()
function sc3_supercalc_define_cell_variables() {
	sc3_supercalc_all_cellref_do(function(col_letter, row_number) {
		var code_text = sc3_supercalc_gen_cell_reader_bus_declaration(col_letter, row_number);
		var global_eval = eval; // https://262.ecma-international.org/5.1/#sec-10.4.2
		sc.consoleDebug(code_text);
		global_eval(code_text);
	});
}

function sc3_supercalc_cell_ugen_to_osc_packet(col_letter, row_number, ugen) {
	var cell_name = col_letter + String(row_number);
	var bus_index = sc3_supercalc_cellref_to_bus(col_letter, row_number);
	var graph = sc.makeGraph(cell_name, sc.wrapOut(bus_index, ugen));
	var syndef = sc.graphEncodeSyndef(graph);
	var group_id = sc3_supercalc_cellref_to_group(col_letter, row_number);
	var g_free_msg = sc.g_freeAll1(group_id);
	var s_new_msg = sc.s_new0(cell_name, -1, sc.kAddToHead, group_id);
	var d_recv_msg = sc.d_recv_then(syndef, osc.writePacket(s_new_msg));
	var bundle = {
		timeTag: 1,
		packets: [g_free_msg, d_recv_msg]
	};
	sc.consoleDebug('sc3_supercalc_cell_ugen_to_osc_message', col_letter, row_number, cell_name, bus_index, group_id, bundle);
	return bundle;
}

// sc3_supercalc_create_and_init_cell_groups()
function sc3_supercalc_create_and_init_cell_groups() {
	sc3_supercalc_all_cellref_do(function(col_letter, row_number) {
		var group_id = sc3_supercalc_cellref_to_group(col_letter, row_number);
		var g_new_msg = sc.g_new1(group_id, sc.kAddToTail, 0);
		sc.sendOsc(sc.globalScsynth, g_new_msg);
		sc.sendOsc(sc.globalScsynth, sc3_supercalc_cell_ugen_to_osc_packet(col_letter, row_number, sc.DC(0)));
	});
}

function sc3_supercalc_server_setup() {
	sc.consoleDebug('sc3_supercalc_server_setup');
	sc3_supercalc_define_cell_variables(sc3_supercalc_num_col, sc3_supercalc_num_row);
	sc3_supercalc_create_and_init_cell_groups(sc3_supercalc_num_col, sc3_supercalc_num_row);
}
