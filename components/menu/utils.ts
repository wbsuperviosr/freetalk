import { DropDownProps } from "./DropDownSelect";

export const calcMapSum = (map: Map<string, boolean>) => {
	return Array.from(map.values()).reduce((a, b) => Number(a) + Number(b), 0);
};

export function makeMapState(options: string[], initial: boolean = false) {
	const state = new Map<string, boolean>();
	for (const option of options) {
		state.set(option, initial);
	}
	return state;
}

export function getSelect(state: Map<string, boolean>) {
	const select = Array.from(state.keys())
		.map((year) => {
			return state.get(year) ? year : "";
		})
		.filter((y) => y != "");
	if (select.length == 0) {
		return "所有";
	} else if (select.length == 1) {
		return select[0];
	} else if (select.length == state.size) {
		return "所有";
	} else {
		return select.join("，");
	}
}

export function getCurrentSelectString(states: DropDownProps[]) {
	const text = states.map((state) => {
		return `【${state.title}:${getSelect(state.options.state)}】`;
	});

	return text.join(" ");
}

export function inferTarget(obj: any, menus: DropDownProps[]): boolean {
	let isTarget = true;
	menus.map((menu) => {
		const num_active = calcMapSum(menu.options.state);
		if (num_active !== 0) {
			const field = menu.mapping_fn!(obj);
			if (field instanceof Array) {
				for (const item of field) {
					if (!menu.options.state.get(item)) {
						isTarget = false;
					}
				}
			} else {
				if (!menu.options.state.get(field)) {
					isTarget = false;
				}
			}
		}
		return;
	});

	return isTarget;
}
