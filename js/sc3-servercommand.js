'use strict';

// b = buffer

function b_alloc_then(bufferNumber, numberOfFrames, numberOfChannels, onCompletion) {
    return {
        address: '/b_alloc',
        args: [oscInt32(bufferNumber), oscInt32(numberOfFrames), oscInt32(numberOfChannels), oscBlob(onCompletion)]
    };
}

// b_gen memcpy is in sc3-rdu
function b_memcpy(bufferNumber, numFrames, numChannels, sampleRate, bufferData) {
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

function b_alloc_then_memcpy(bufferNumber, numberOfFrames, numberOfChannels, sampleRate, bufferData) {
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

function b_getn1(bufferNumber, startIndex, count) {
    return {
        address: '/b_getn',
        args: [oscInt32(bufferNumber), oscInt32(startIndex), oscInt32(count)]
    };
}

function b_query1(bufferNumber) {
    return {
        address: '/b_query',
        args: [oscInt32(bufferNumber)]
    };
}

// c = control

function c_set1(busIndex, controlValue) {
    return {
        address: '/c_set',
        args: [oscInt32(busIndex), oscFloat(controlValue)]
    };
}

function c_setn1(busIndex, controlArray) {
    return {
        address: '/c_setn',
        args: [oscInt32(busIndex), oscInt32(controlArray.length)].concat(controlArray.map(oscFloat))
    };
}

// d = (synth) definition

function d_recv(syndefArray) {
    return {
        address: '/d_recv',
        args: [oscBlob(syndefArray)]
    };
}

function d_recv_then(syndefArray, onCompletion) {
    return {
        address: '/d_recv',
        args: [oscBlob(syndefArray), oscBlob(onCompletion)]
    };
}

// g = group

function g_freeAll1(id) {
    return {
        address: '/g_freeAll',
        args: [oscInt32(id)]
    };
}

// m = meta

var m_status = {address: '/status', args: []};

function m_dumpOsc(code) {
    return {
        address: '/dumpOSC',
        args: [oscInt32(code)]
    };
}

function m_notify(status, clientId) {
    return {
        address: '/notify',
        args: [oscInt32(status), oscInt32(clientId)]
    };
}

// s = synth

function s_new0(name, id, addAction, target) {
    return {
        address: '/s_new',
        args: [oscString(name), oscInt32(id), oscInt32(addAction), oscInt32(target)]
    };
}
