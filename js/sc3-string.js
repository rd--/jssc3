'use strict';

// string -> [string]
String.prototype.lines = function () {
    return this.split('\n');
}

// string -> string -> bool
String.prototype.isPrefixOf = function (aString) {
    return aString.slice(0, this.length) === this;
}
