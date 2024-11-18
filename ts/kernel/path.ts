import * as path from "jsr:@std/path";

export function pathDirectory(aPath: string): string {
	return path.dirname(aPath);
}

export function pathExtension(aPath: string): string {
	return path.extname(aPath);
}

export function pathIsAbsolute(aPath: string): boolean {
	return path.isAbsolute(aPath);
}

export function pathJoin(pathArray: string[]): string {
	return path.join(...pathArray);
}

export function pathNormalize(aPath: string): string {
	return path.normalize(aPath);
}
