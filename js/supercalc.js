/*

requires jspreadsheet

col_letter = a - h
col_index = 0 - 7
row_number = 1 - 8
row_index = 0 - 7

*/

const calc = {};

// cellref_to_bus('g', 4)
function cellref_to_bus(col_letter, row_number) {
	return calc.bus_offset + sc.cellref_to_linear_index(calc.num_col, col_letter, row_number);
}

// cellref_to_group('g', 4)
function cellref_to_group(col_letter, row_number) {
	return calc.group_offset + sc.cellref_to_linear_index(calc.num_col, col_letter, row_number);
}

function set_cell_colour(col_letter, row_number, colour_string) {
	const cell_ref = col_letter.toUpperCase() + String(row_number);
	calc.sheet.setStyle(cell_ref, 'background-color', colour_string);
}

function set_cell_status_and_return(col_letter, row_number, success, result) {
	sc.consoleDebug('set_cell_status_and_return', col_letter, row_number, success, result);
	set_cell_colour(col_letter, row_number, success ? '#ffffe8' : '#c1e7f8');
	return result;
}

// eval_or_zero('a', 1, true, 'referenceToUndefinedName')
function eval_cell_or_zero(col_letter, row_number, translator_status, text) {
	sc.consoleDebug('eval_cell_or_zero', col_letter, row_number, translator_status, '"' + text + '"');
	if(text === '' || text.substring(0, 2) === '//') {
		sc.consoleDebug('eval_cell_or_zero: empty cell or comment cell');
		return set_cell_status_and_return(col_letter, row_number, translator_status, 0);
	} else {
		try {
		    const result = eval(text);
		    sc.consoleDebug('eval_cell_or_zero: success!');
		    return set_cell_status_and_return(col_letter, row_number, translator_status, result);
		} catch (_err) {
		    sc.consoleDebug('eval_cell_or_zero: error!');
		    return set_cell_status_and_return(col_letter, row_number, false, 0);
		}
	}
}

function eval_cell(col_letter, row_number, cell_text) {
	const program_text = cell_text.trim();
	sc.consoleDebug(`eval_cell: .stc = ${program_text}`);
	sc.stc_to_js_and_then(program_text, function (js_text) {
		sc.consoleDebug(`eval_cell: .js = ${js_text}`);
		const translator_status =  program_text === '' || js_text !== '';
		const cell_value = eval_cell_or_zero(col_letter, row_number, translator_status, js_text);
		const cell_ugen = sc.isNumber(cell_value) ? sc.Dc(cell_value) : (sc.isControlRateUgen(cell_value) ? sc.K2A(cell_value) : cell_value);
		const cell_packet = cell_ugen_to_osc_packet(col_letter, row_number, cell_ugen);
		globalScsynth.sendOsc(cell_packet);
	});
}

function get_cell_text(col_letter, row_number) {
	const col_index = sc.column_letter_to_index(col_letter);
	return calc.sheet.getCellFromCoords(col_index, row_number - 1).textContent;
}

function all_cellref_do(proc) {
	sc.all_cellref_do(calc.num_col, calc.num_row, proc);
}

function eval_sheet() {
	all_cellref_do(function(col_letter, row_number) {
		const cell_text = get_cell_text(col_letter, row_number);
		eval_cell(col_letter, row_number, cell_text);
	});
}

function on_change (_instance, _cell, col_index, row_index, cell_text) {
	const col_letter = sc.column_index_to_letter(Number(col_index));
	const row_number = Number(row_index) + 1;
	sc.consoleDebug('on_change', col_letter, row_number, cell_text);
	eval_cell(col_letter, row_number, cell_text.trim());
}

export function get_csv() {
	return calc.sheet.copy(false, ',', true, false, true);
}

function get_data_array() {
	return calc.sheet.getData(false, true);
}

export function get_json() {
	return JSON.stringify(get_data_array());
}

function set_data_array(dataArray) {
	calc.sheet.setData(dataArray);
}

export function set_json(jsonText) {
	const dataArray = JSON.parse(jsonText);
	set_data_array(dataArray);
	eval_sheet();
}

export function initSheet(numCol, numRow) {
	calc.data = sc.arrayFill(numCol, () => sc.arrayFill(numRow, () => ''));
	calc.num_col = numCol;
	calc.num_row = numRow;
	calc.bus_offset = 24;
	calc.group_offset = 12;
	calc.sheet = jspreadsheet(document.getElementById('supercalcContainer'), {
		data: calc.data,
		columns: sc.arrayFillWithIndex(numCol, function(col_index) {
		        return { type: 'text', title: sc.column_index_to_letter(col_index), width: 200 };
		}),
		onchange: on_change,
		allowInsertRow: false,
		allowInsertColumn: false,
		defaultColAlign:'left'
	});

}

// gen_cell_reader_bus_declaration('a', 1)
function gen_cell_reader_bus_declaration(col_letter, row_number) {
	const bus_index = cellref_to_bus(col_letter, row_number);
	const var_name = col_letter + String(row_number);
	return ('var ' + var_name + ' = sc.InFb(1, ' + String(bus_index) + ');');
}

// define_cell_variables()
function define_cell_variables() {
	all_cellref_do(function(col_letter, row_number) {
		const code_text = gen_cell_reader_bus_declaration(col_letter, row_number);
		const global_eval = eval; // https://262.ecma-international.org/5.1/#sec-10.4.2
		sc.consoleDebug(code_text);
		global_eval(code_text);
	});
}

function cell_ugen_to_osc_packet(col_letter, row_number, ugen) {
	const cell_name = col_letter + String(row_number);
	const bus_index = cellref_to_bus(col_letter, row_number);
	const graph = sc.makeGraph(cell_name, sc.wrapOut(bus_index, ugen));
	const syndef = sc.graphEncodeSyndef(graph);
	const group_id = cellref_to_group(col_letter, row_number);
	const g_free_msg = sc.g_freeAll1(group_id);
	const s_new_msg = sc.s_new0(cell_name, -1, sc.kAddToHead, group_id);
	const d_recv_msg = sc.d_recv_then(syndef, osc.writePacket(s_new_msg));
	const bundle = {
		timeTag: 1,
		packets: [g_free_msg, d_recv_msg]
	};
	sc.consoleDebug('cell_ugen_to_osc_message', col_letter, row_number, cell_name, bus_index, group_id, bundle);
	return bundle;
}

// create_and_init_cell_groups()
function create_and_init_cell_groups() {
	all_cellref_do(function(col_letter, row_number) {
		const group_id = cellref_to_group(col_letter, row_number);
		const g_new_msg = sc.g_new1(group_id, sc.kAddToTail, 0);
		globalScsynth.sendOsc(g_new_msg);
		globalScsynth.sendOsc(cell_ugen_to_osc_packet(col_letter, row_number, sc.Dc(0)));
	});
}

export function server_setup() {
	sc.consoleDebug('server_setup');
	define_cell_variables();
	create_and_init_cell_groups();
}

export function initProgramMenu() {
	sc.load_utf8_and_then('text/supercalc-programs.text', text => sc.select_add_keys_as_options('programMenu', sc.stringNonEmptyLines(text)));
	sc.menu_on_change_with_option_value('programMenu', function(optionValue) {
		sc.load_utf8_and_then(`./help/supercalc/${optionValue}`, (text) => set_json(text));
	});
}
