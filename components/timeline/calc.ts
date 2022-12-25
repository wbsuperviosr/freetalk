import { Timeline } from "../../models/timelineModel";

export function getDate(date: string) {
	const [year, month, day] = date.split("-");
	return day == "XX" ? `${year}年${month}月` : `${year}年${month}月${day}日`;
}

export function getTime(time: string) {
	const [hh, mm] = time.split(":");
	if (mm == "XX") {
		return `${hh}点左右`;
	} else if (mm == "AA") {
		return `${hh}点之前`;
	} else if (mm == "BB") {
		return `${hh}点之后`;
	} else {
		return `${hh}点${mm}分`;
	}
}

export function getYears(timelines: Timeline[]): string[] {
	const years = new Set<string>(
		timelines.map((timeline) => {
			return timeline.date.split("-")[0];
		})
	);
	return Array.from(years);
}

export function getPeoples(timelines: Timeline[]): string[] {
	const peoples = timelines
		.map((timeline) => {
			return timeline.people.map((p) => {
				if (p) {
					if (p.name) {
						return p.name;
					}
				}
			});
		})
		.flat(1);

	const names = Array.from(
		new Set(
			peoples.filter((p) => {
				return p !== undefined;
			})
		)
	) as string[];
	return names;
}

export function getTypes(timelines: Timeline[]): string[] {
	const types = new Set(
		timelines.map((timeline) => {
			return timeline.type;
		})
	);
	return Array.from(types);
}

export function getInfos(timelines: Timeline[]): string[] {
	const sources = new Set(
		timelines.map((timeline) => {
			return timeline.source;
		})
	);
	return Array.from(sources).filter((source) => {
		return source;
	}) as string[];
}
