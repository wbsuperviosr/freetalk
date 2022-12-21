export function sum(array: Array<number | boolean>) {
	return array.reduce((partial, a) => Number(partial) + Number(a), 0);
}

export function unique<T>(array: Array<any>, getter: (obj: any) => T) {
	const values = new Set<T>(array.map(getter));
	return Array.from(values).sort();
}

// function getUniqueYear(casefiles: CaseFile[]) {
// 	const years = new Set<string>(
// 		casefiles.map((casefile) => {
// 			return `${new Date(casefile.writtenAt).getFullYear()}`;
// 		})
// 	);
// 	return Array.from(years).sort();
// }
