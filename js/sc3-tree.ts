// sc3-tree.ts

export type Tree<T> = T | Tree<T>[];

export function treeVisit(aTree: Tree<any>, visitFunction: (x: any) => void): void {
	if(Array.isArray(aTree)) {
		aTree.forEach(item => treeVisit(item, visitFunction));
	} else {
		visitFunction(aTree);
	}
}

export function treeFlattenIntoArray(aTree: Tree<any>, anArray: any[]): void {
	treeVisit(aTree, item => anArray.push(item));
}

// treeFlatten(1) //= [1]
// treeFlatten([1, [2, [3, 4], 5], 6]) //= [1, 2, 3, 4, 5, 6]
export function treeFlatten(aTree: Tree<any>): any[] {
	var anArray: any[] = [];
	treeFlattenIntoArray(aTree, anArray);
	return anArray;
}

export type Forest<T> = Tree<T>[];

export function forestFlatten(aForest: Forest<any>): any[] {
	return treeFlatten(aForest);
}
