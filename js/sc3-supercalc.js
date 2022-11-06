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
	return sc3_supercalc_bus_offset + cellref_to_linear_index(sc3_supercalc_num_col, col_letter, row_number);
}

// sc3_supercalc_cellref_to_group('g', 4)
function sc3_supercalc_cellref_to_group(col_letter, row_number) {
	return sc3_supercalc_group_offset + cellref_to_linear_index(sc3_supercalc_num_col, col_letter, row_number);
}

function sc3_supercalc_set_cell_colour(col_letter, row_number, colour_string) {
	var cell_ref = col_letter.toUpperCase() + String(row_number);
	sc3_supercalc_sheet.setStyle(cell_ref, 'background-color', colour_string);
}

function sc3_supercalc_set_cell_status_and_return(col_letter, row_number, success, result) {
	consoleDebug('sc3_supercalc_set_cell_status_and_return', col_letter, row_number, success, result);
	sc3_supercalc_set_cell_colour(col_letter, row_number, success ? '#ffffe8' : '#c1e7f8');
	return result;
}

// sc3_supercalc_eval_or_zero('a', 1, true, 'referenceToUndefinedName')
function sc3_supercalc_eval_or_zero(col_letter, row_number, translator_status, text) {
	consoleDebug('sc3_supercalc_eval_or_zero', col_letter, row_number, translator_status, '"' + text + '"');
	if(text === '' || text.substring(0, 2) === '//') {
		consoleDebug('sc3_supercalc_eval_or_zero: empty cell or comment cell');
		return sc3_supercalc_set_cell_status_and_return(col_letter, row_number, translator_status, 0);
	} else {
		try {
		    var result = eval(text);
		    consoleDebug('sc3_supercalc_eval_or_zero: success!');
		    return sc3_supercalc_set_cell_status_and_return(col_letter, row_number, translator_status, result);
		} catch (e) {
		    consoleDebug('sc3_supercalc_eval_or_zero: error!');
		    return sc3_supercalc_set_cell_status_and_return(col_letter, row_number, false, 0);
		}
	}
}

function sc3_supercalc_eval_cell(col_letter, row_number, cell_text) {
	var program_text = cell_text.trim();
	stc_to_js_and_then(program_text, function (js_text) {
		var translator_status =  program_text === '' || js_text !== '';
		var cell_value = sc3_supercalc_eval_or_zero(col_letter, row_number, translator_status, js_text);
		var cell_ugen = isNumber(cell_value) ? DC(cell_value) : (isControlRateUgen(cell_value) ? K2A(cell_value) : cell_value);
		var cell_packet = sc3_supercalc_cell_ugen_to_osc_packet(col_letter, row_number, cell_ugen);
		sendOsc(globalScsynth, cell_packet);
	});
}

function sc3_supercalc_get_cell_text(col_letter, row_number) {
	var col_index = column_letter_to_index(col_letter);
	return sc3_supercalc_sheet.getCellFromCoords(col_index, row_number - 1).textContent;
}

function sc3_supercalc_all_cellref_do(proc) {
	all_cellref_do(sc3_supercalc_num_col, sc3_supercalc_num_row, proc);
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
	consoleDebug('sc3_supercalc_on_change', col_letter, row_number, cell_text);
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

function sc3_supercalc_init (numCol, numRow) {
	sc3_supercalc_data = arrayFill(numCol, () => arrayFill(numRow, () => ''));
	sc3_supercalc_num_col = numCol;
	sc3_supercalc_num_row = numRow;
	sc3_supercalc_bus_offset = 24;
	sc3_supercalc_group_offset = 12;
	sc3_supercalc_sheet = jspreadsheet(document.getElementById('sc3_supercalc'), {
		data: sc3_supercalc_data,
		columns: arrayFillWithIndex(numCol, function(col_index) {
		        return { type: 'text', title: column_index_to_letter(col_index), width: 200 };
		}),
		onchange: sc3_supercalc_on_change,
		allowInsertRow: false,
		allowInsertColumn: false,
		defaultColAlign:'left'
	});
}

// sc3_supercalc_gen_cell_reader_bus_declaration('a', 1)
function sc3_supercalc_gen_cell_reader_bus_declaration(col_letter, row_number) {
	var bus_index = sc3_supercalc_cellref_to_bus(col_letter, row_number);
	var var_name = col_letter + String(row_number);
	return ('var ' + var_name + ' = InFb(1, ' + String(bus_index) + ');');
}

// sc3_supercalc_define_cell_variables()
function sc3_supercalc_define_cell_variables() {
	sc3_supercalc_all_cellref_do(function(col_letter, row_number) {
		var code_text = sc3_supercalc_gen_cell_reader_bus_declaration(col_letter, row_number);
		var global_eval = eval; // https://262.ecma-international.org/5.1/#sec-10.4.2
		consoleDebug(code_text);
		global_eval(code_text);
	});
}

function sc3_supercalc_cell_ugen_to_osc_packet(col_letter, row_number, ugen) {
	var cell_name = col_letter + String(row_number);
	var bus_index = sc3_supercalc_cellref_to_bus(col_letter, row_number);
	var graph = makeGraph(cell_name, wrapOut(bus_index, ugen));
	var syndef = graphEncodeSyndef(graph);
	var group_id = sc3_supercalc_cellref_to_group(col_letter, row_number);
	var g_free_msg = g_freeAll1(group_id);
	var s_new_msg = s_new0(cell_name, -1, kAddToHead, group_id);
	var d_recv_msg = d_recv_then(syndef, osc.writePacket(s_new_msg));
	var bundle = {
		timeTag: 1,
		packets: [g_free_msg, d_recv_msg]
	};
	consoleDebug('sc3_supercalc_cell_ugen_to_osc_message', col_letter, row_number, cell_name, bus_index, group_id, bundle);
	return bundle;
}

// sc3_supercalc_create_and_init_cell_groups()
function sc3_supercalc_create_and_init_cell_groups() {
	sc3_supercalc_all_cellref_do(function(col_letter, row_number) {
		var group_id = sc3_supercalc_cellref_to_group(col_letter, row_number);
		var g_new_msg = g_new1(group_id, kAddToTail, 0);
		sendOsc(globalScsynth, g_new_msg);
		sendOsc(globalScsynth, sc3_supercalc_cell_ugen_to_osc_packet(col_letter, row_number, DC(0)));
	});
}

function sc3_supercalc_server_setup() {
	consoleDebug('sc3_supercalc_server_setup');
	sc3_supercalc_define_cell_variables(sc3_supercalc_num_col, sc3_supercalc_num_row);
	sc3_supercalc_create_and_init_cell_groups(sc3_supercalc_num_col, sc3_supercalc_num_row);
}
