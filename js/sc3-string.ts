// sc3-string.ts

// isString('string') === true
export function isString(aValue: any): boolean {
	return typeof aValue === 'string';
}

// stringIsPrefixOf('str', 'string') === true
export function stringIsPrefixOf(aPrefix: string, aString: string): boolean {
	return aString.slice(0, aPrefix.length) === aPrefix;
}

export function stringLines(aString: string): string[] {
	return aString.split('\n');
}

// The split method accepts regular expressions, this is a simpler function.
export function stringSplitOn(aString: string, aDelimiter: string): string[] {
	return aString.split(aDelimiter);
}

export function stringUnlines(anArray: string[]): string {
	return anArray.join('\n');
}
