var osc = require('osc'); // https://github.com/colinbdclark/osc.js/ ; npm i osc

function defaultSc3Udp() {
    return new osc.UDPPort({
        localAddress: '127.0.0.1',
        localPort: null,
        remoteAddress: '127.0.0.1',
        remotePort: 57110,
        metadata: true
    });
}

var sc3 = defaultSc3Udp();

sc3.open();
