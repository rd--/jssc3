// sc3-perform.js

function arrayPerformWithArguments(receiver, selector, argumentArray) {
	switch (selector) {
		case 'at': return arrayAt(receiver, argumentArray[0]);
		case 'put': return arrayPut(receiver, argumentArray[0], argumentArray[1]);
		case 'asArray': return receiver;
		default: console.error('arrayPerformWithArguments?'); return undefined;
	}
}

function numberPerformWithArguments(receiver, selector, argumentArray) {
	switch (selector) {
		case 'rand': return randomFloat(receiver, argumentArray[0]);
		case 'rand2': return randomFloat(0 - receiver, receiver);
		case 'timesRepeat': return numberTimesRepeat(receiver, argumentArray[0]);
		case 'to': return arrayFromTo(receiver, argumentArray[0]);
		default: console.error('numberPerformWithArguments?'); return undefined;
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
		case 'add': return setAdd(receiver, argumentArray[0]);
		case 'includes': return setIncludes(receiver, argumentArray[0]);
		case 'asArray': return setAsArray(receiver);
		default: console.error('setPerformWithArguments?'); return undefined;
	}
}

function performWithArguments(receiver, selector, argumentArray) {
	var performFunction;
	if(isArray(receiver)) {
		performFunction = arrayPerformWithArguments;
	} else if(isNumber(receiver)) {
		performFunction = numberPerformWithArguments;
	} else if(isQueue(receiver)) {
		performFunction = queuePerformWithArguments;
	} else if(isSet(receiver)) {
		performFunction = setPerformWithArguments;
	} else {
		console.error('performWithArguments?');
		return null;
	}
	return performFunction(receiver, selector, argumentArray);
}
