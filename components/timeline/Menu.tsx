import {
	CalendarDaysIcon,
	FolderIcon,
	GlobeAltIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { DropDownProps, DropDownSelect } from "./DropDownSelect";

export type MenuProps = {
	state: Map<string, boolean>;
	setState: (state: Map<string, boolean>) => void;
};

export function Menu({
	yearState,
	nameState,
	typeState,
	infoState,
}: {
	yearState: MenuProps;
	nameState: MenuProps;
	typeState: MenuProps;
	infoState: MenuProps;
}) {
	const time: DropDownProps = {
		title: "时间",
		options: yearState,
		icon: <CalendarDaysIcon className="w-3" />,
	};
	const people: DropDownProps = {
		title: "人物",
		options: nameState,
		icon: <UserIcon className="w-3" />,
	};

	const category: DropDownProps = {
		title: "性质",
		options: typeState,
		icon: <FolderIcon className="w-3" />,
	};
	const source: DropDownProps = {
		title: "来源",
		options: infoState,
		icon: <GlobeAltIcon className="w-3" />,
	};

	return (
		<div className="flex border-2 mx-5 justify-between mb-2 px-3 py-2 rounded-lg">
			<DropDownSelect menu={time} />
			<DropDownSelect menu={people} />
			<DropDownSelect menu={category} />
			<DropDownSelect menu={source} />
		</div>
	);
}
