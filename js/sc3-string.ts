// sc3-string.ts

// isString('string') === true
function isString(x : any) : boolean {
    return typeof x === 'string';
}

// The split method accepts regular expressions, this is a simpler function.
function stringSplitOn(aString : string, delimiter: string) : string[] {
    return aString.split(delimiter);
}

function stringLines(aString : string) : string[] {
    return aString.split('\n');
}

function stringIsPrefixOf(lhs : string, rhs : string) : boolean {
    return rhs.slice(0, lhs.length) === lhs;
}
