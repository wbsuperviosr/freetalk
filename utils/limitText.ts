export function limit_text(text: string, limit: number = 50) {
	if (text.length > limit) {
		let cut = text.slice(0, limit) + "...";
		return cut;
	} else {
		return text;
	}
}
