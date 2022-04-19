// sc3-servercommand.ts ; requires osc.js sc3-opensoundcontrol

declare namespace osc {
  function writePacket(message: ServerMessage): Uint8Array;
}

type ServerMessage = {
    address: string,
    args: OscData[]
};

// k = constant

var kAddToHead: number = 0;
var kAddToTail: number = 1;

// b = buffer

function b_alloc_then(bufferNumber: number, numberOfFrames: number, numberOfChannels: number, onCompletion: Uint8Array): ServerMessage {
    return {
        address: '/b_alloc',
        args: [oscInt32(bufferNumber), oscInt32(numberOfFrames), oscInt32(numberOfChannels), oscBlob(onCompletion)]
    };
}

// b_gen memcpy is in sc3-rdu
function b_memcpy(bufferNumber: number, numFrames: number, numChannels: number, sampleRate: number, bufferData: Uint8Array): ServerMessage {
    return {
        address: '/b_gen',
        args: [
            oscInt32(bufferNumber),
            oscString('memcpy'),
            oscInt32(numFrames),
            oscInt32(numChannels),
            oscFloat(sampleRate),
            oscBlob(bufferData)]
    };
}

function b_alloc_then_memcpy(bufferNumber: number, numberOfFrames: number, numberOfChannels: number, sampleRate: number, bufferData: Uint8Array): ServerMessage {
    var allocBytes = numberOfFrames * numberOfChannels * 4;
    if(allocBytes != bufferData.length) {
        console.error('b_alloc_then_memcpy: array size error', allocBytes, bufferData.length);
    }
    return b_alloc_then(
        bufferNumber,
        numberOfFrames,
        numberOfChannels,
        osc.writePacket(b_memcpy(bufferNumber, numberOfFrames, numberOfChannels, sampleRate, bufferData))
    );
}

function b_getn1(bufferNumber: number, startIndex: number, count: number): ServerMessage {
    return {
        address: '/b_getn',
        args: [oscInt32(bufferNumber), oscInt32(startIndex), oscInt32(count)]
    };
}

function b_query1(bufferNumber: number): ServerMessage {
    return {
        address: '/b_query',
        args: [oscInt32(bufferNumber)]
    };
}

// c = control

function c_set1(busIndex: number, controlValue: number): ServerMessage {
    return {
        address: '/c_set',
        args: [oscInt32(busIndex), oscFloat(controlValue)]
    };
}

function c_setn1(busIndex: number, controlArray: number[]): ServerMessage {
    return {
        address: '/c_setn',
        args: [oscInt32(busIndex), oscInt32(controlArray.length)].concat(controlArray.map(oscFloat))
    };
}

// d = (synth) definition

function d_recv(syndefArray: Uint8Array): ServerMessage {
    return {
        address: '/d_recv',
        args: [oscBlob(syndefArray)]
    };
}

function d_recv_then(syndefArray: Uint8Array, onCompletion: Uint8Array): ServerMessage {
    return {
        address: '/d_recv',
        args: [oscBlob(syndefArray), oscBlob(onCompletion)]
    };
}

// g = group

function g_new1(groupId: number, addAction: number, nodeId: number): ServerMessage {
    return {
        address: '/g_new',
        args: [oscInt32(groupId), oscInt32(addAction), oscInt32(nodeId)]
    };
}

function g_freeAll1(groupId: number): ServerMessage {
    return {
        address: '/g_freeAll',
        args: [oscInt32(groupId)]
    };
}

// m = meta

var m_status: ServerMessage = {address: '/status', args: []};

function m_dumpOsc(code: number): ServerMessage {
    return {
        address: '/dumpOSC',
        args: [oscInt32(code)]
    };
}

function m_notify(status: number, clientId: number): ServerMessage {
    return {
        address: '/notify',
        args: [oscInt32(status), oscInt32(clientId)]
    };
}

// s = synth

function s_new0(name: string, nodeId: number, addAction: number, target: number): ServerMessage {
    return {
        address: '/s_new',
        args: [oscString(name), oscInt32(nodeId), oscInt32(addAction), oscInt32(target)]
    };
}
