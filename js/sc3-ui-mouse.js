'use strict';

var sc3_mouse = { w: 0, x: 0, y: 0 };

function recv_document_mouse_event(e) {
    sc3_mouse.x = event.pageX / window.innerWidth;
    sc3_mouse.y = 1 - (e.pageY / window.innerHeight);
    sc3_mouse.w = e.buttons === 1 ? 1 : 0;
    // console.log('recv_document_mouse_event', sc3_mouse);
    setPointerControls(0, sc3_mouse.w, sc3_mouse.x, sc3_mouse.y);
}

function sc3_mouse_init() {
    document.onmousedown = recv_document_mouse_event;
    document.onmousemove = recv_document_mouse_event;
    document.onmouseup = recv_document_mouse_event;
}
