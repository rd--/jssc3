// isString('string') === true
export function isString(aValue: unknown): aValue is string {
	return typeof aValue === 'string';
}

// stringIsPrefixOf('str', 'string') === true
export function stringIsPrefixOf(aPrefix: string, aString: string): boolean {
	return aString.slice(0, aPrefix.length) === aPrefix;
}

export function stringLines(aString: string): string[] {
	return aString.split('\n');
}

export function stringNonEmptyLines(aString: string): string[] {
	return aString.split('\n').filter(each => each.length > 0);
}

// The split method accepts regular expressions, this is a simpler function.
export function stringSplitOn(aString: string, aDelimiter: string): string[] {
	return aString.split(aDelimiter);
}

export function stringUnlines(anArray: string[]): string {
	return anArray.join('\n');
}

export function stringAppend(lhs: string, rhs: string): string {
	return lhs + rhs;
}

export function stringToCharCodeArray(aString: string): number[] {
	const answer = [];
	for (let i = 0; i < aString.length; i ++) {
		answer.push(aString.charCodeAt(i));
	}
	return answer;
}

export function stringCapitalizeFirstLetter(aString: string): string {
	return aString.charAt(0).toUpperCase() + aString.slice(1);
}

export function stringIsEmpty(aString: string): boolean {
	return aString.length === 0;
}

export function stringCompare(p: string, q: string): number {
	return p < q ? -1 : (p > q ? 1 : 0);
}
