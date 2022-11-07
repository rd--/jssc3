'use strict';

function jssc3_superscript_init() {
	sc3_superscript_init();
	editor_get_selected_text = sc3_superscript_get_selected_text;
	editor_get_data = sc3_superscript_get_html;
	editor_set_data = sc3_superscript_set_html;
}

function jssc3_supercalc_init(numCol, numRow) {
	sc3_supercalc_init (numCol, numRow);
	editor_get_selected_text = function() { return ''; };
	editor_get_data = sc3_supercalc_get_json;
	editor_set_data = sc3_supercalc_set_json;
}
