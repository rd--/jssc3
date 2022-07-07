// sc3-ui-mouse.js ; requires sc3-wasm

// w is button state, x and y are unit scaled co-ordinates within window where y points up.
var sc3_mouse = { w: 0, x: 0, y: 0 };

// Event handler for mouse event.
function recv_document_mouse_event(e) {
	sc3_mouse.x = event.pageX / window.innerWidth;
	sc3_mouse.y = 1 - (e.pageY / window.innerHeight);
	sc3_mouse.w = e.buttons === 1 ? 1 : 0;
	setPointerControls(0, sc3_mouse.w, sc3_mouse.x, sc3_mouse.y); // sc3-wasm
}

// Install mouse event handler.
function sc3_mouse_init() {
	document.onmousedown = recv_document_mouse_event;
	document.onmousemove = recv_document_mouse_event;
	document.onmouseup = recv_document_mouse_event;
}
