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

function sortTimeline(a: Timeline, b: Timeline) {
	// console.log(a.time, a.title);
	// return 0;
	const unknown = ["AA", "BB", "XX"];
	const [a_year, a_month, a_day] = a.date.split("-");
	const [b_year, b_month, b_day] = b.date.split("-");

	let [a_hour, a_minute] = ["", ""];
	let [b_hour, b_minute] = ["", ""];

	if (a.time) {
		[a_hour, a_minute] = a.time.split(":");
	}
	if (b.time) {
		[b_hour, b_minute] = b.time.split(":");
	}

	if (a_year == b_year) {
		if (a_month == b_month) {
			if (a_day == b_day) {
				if (!a.time && !b.time) {
					return 0;
				} else if (!a.time && b.time) {
					return 1;
				} else if (a.time && !b.time) {
					return -1;
				} else {
					if (a_hour == b_hour) {
						if (a_minute == b_minute) {
							return 0;
						} else {
							if (
								!unknown.includes(a_minute) &&
								!unknown.includes(b_minute)
							) {
								return Number(a_minute) - Number(b_minute);
							} else {
								switch (a_minute) {
									case "BB":
										if (unknown.includes(b_minute)) {
											return 1;
										} else {
											return -1;
										}
									case "AA":
										return 1;
									default:
										if (b_minute == "BB") {
											return 1;
										} else {
											return -1;
										}
								}
							}
						}
					} else {
						return Number(a_hour) - Number(b_hour);
					}
				}

				return 0;
			} else {
				if (a_day == "XX" && b_day != "XX") {
					return -1;
				} else if (a_day != "XX" && b_day == "XX") {
					return 1;
				} else {
					return Number(a_day) - Number(b_day);
				}
			}
		} else {
			return Number(a_month) - Number(b_month);
		}
	} else {
		return Number(a_year) - Number(b_year);
	}
}
