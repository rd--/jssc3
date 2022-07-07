// osc.js ; node.js

function defaultSc3Udp() {
	return new osc.UDPPort({
		localAddress: '127.0.0.1',
		localPort: null,
		remoteAddress: '127.0.0.1',
		remotePort: 57110,
		metadata: true
	});
}

function sc3UdpOpen() {
	var udpPort = defaultSc3Udp();
	udpPort.open();
	return udpPort;
}
