import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useVisible } from "../../utils/useVisible";
import { calcMapSum } from "./calc";
import { MenuProps } from "./Menu";

export type DropDownItemsProps = {
	option: string;
	isSelected: boolean;
	setOptionState: (option: string, toggle: boolean) => void;
};
export type DropDownProps = {
	title: string;
	options: MenuProps;
	icon: React.ReactNode;
};

export function DropDownItems({
	option,
	isSelected,
	setOptionState,
}: DropDownItemsProps) {
	return (
		<div
			className={`text-center mx-auto px-2 w-24 ${
				isSelected ? "bg-lxd text-white" : ""
			} cursor-pointer rounded-t-md border-b-2 md:hover:bg-lxl`}
			onClick={() => {
				setOptionState(option, !isSelected);
			}}
		>
			{option}
		</div>
	);
}

export function DropDownSelect({ menu }: { menu: DropDownProps }) {
	const { dropref, open, setOpen } = useVisible(false);

	const handOptionState = (option: string, toggle: boolean) => {
		menu.options.setState(
			new Map<string, boolean>(menu.options.state.set(option, toggle))
		);
	};

	const menuOptions = Array.from(menu.options.state.keys());
	const isMenuActive = calcMapSum(menu.options.state);
	return (
		<div className="relative">
			<div
				className={`flex space-x-1 items-center rounded-md p-1 cursor-pointer ${
					isMenuActive ? "bg-lxd text-white" : ""
				}`}
				onClick={() => setOpen(!open)}
			>
				<div>{menu.icon}</div>
				<div className="text-xs cursor-pointer ">{menu.title}</div>
				<div>
					<ChevronDownIcon className="w-4 cursor-pointer" />
				</div>
			</div>

			{open && (
				<div
					className="absolute top-8 bg-white border border-gray-300 py-1 space-y-1 rounded-lg z-50"
					ref={dropref}
				>
					{menuOptions.map((option, index) => {
						return (
							<DropDownItems
								key={index}
								option={option}
								isSelected={menu.options.state.get(option)!}
								setOptionState={handOptionState}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
