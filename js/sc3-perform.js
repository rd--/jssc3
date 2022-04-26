// sc3-perform.js

function arrayPerformWithArguments(receiver, selector, argumentArray) {
    switch (selector) {
        case 'at': return arrayAt(receiver, argumentArray[0]);
        case 'put': return arrayPut(receiver, argumentArray[0], argumentArray[1]);
        case 'asArray': return receiver;
        default: console.error('arrayPerformWithArguments?'); return undefined;
    }
}

function queuePerformWithArguments(receiver, selector, argumentArray) {
    switch (selector) {
        case 'push': return queuePush(receiver, argumentArray[0]);
        case 'pop': return queuePop(receiver);
        case 'asArray': return queueAsArray(receiver);
        default: console.error('queuePerformWithArguments?'); return undefined;
    }
}

function setPerformWithArguments(receiver, selector, argumentArray) {
    switch (selector) {
        case 'put': return setPut(receiver, argumentArray[0]);
        case 'includes': return setIncludes(receiver, argumentArray[0]);
        case 'asArray': return setAsArray(receiver);
        default: console.error('setPerformWithArguments?'); return undefined;
    }
}

function performWithArguments(receiver, selector, argumentArray) {
    if(isArray(receiver)) {
        return arrayPerformWithArguments(receiver, selector, argumentArray);
    } else if(isSet(receiver)) {
        return setPerformWithArguments(receiver, selector, argumentArray);
    } else {
        console.error('performWithArguments?');
        return null;
    }
}
