'use strict';

var sc3_websocket;

// Initialise WebSocket.  To send .stc to sclang as /eval message see 'blksc3 stc-to-osc'
function sc3_websocket_init(host, port) {
    if(sc3_websocket) {
        sc3_websocket.close();
    }
    try {
        var ws_address = 'ws://' + host + ':' + Number(port).toString();
        sc3_websocket = new WebSocket(ws_address);
    } catch(err) {
        console.error('sc3_websocket_init: ' + err);
    }
}

// Prompt for WebSocket address (host and port) and initialise WebSocket.
function sc3_websocket_dialog() {
    var reply = window.prompt('Set WebSocket address as Host:Port', 'localhost:9160');
    if(reply) {
        var [host, port] = reply.split(':');
        sc3_websocket_init(host, Number(port));
    }
}

// If websocket is connected, send text.
function sc3_websocket_send(string) {
    if(sc3_websocket && sc3_websocket.readyState == 1) {
        sc3_websocket.send(string);
    } else {
        console.error('sc3_websocket_send: websocket nil or not ready?');
    }
}
