import { sum } from "../utils/ArrayOps";
import { DropDownProps, DropDownSelect } from "./menu/DropDownSelect";
import { calcMapSum, getCurrentSelectString } from "./menu/utils";

type ListHeaderProps = {
	title: string;
	last_update: string;
	description: string;
	menus?: DropDownProps[];
	show_active: boolean;
	post_link?: string;
};

export function ListHeader({
	title,
	last_update,
	description,
	menus,
	show_active,
	post_link,
}: ListHeaderProps) {
	const isActive =
		menus && sum(menus!.map((menu) => calcMapSum(menu.options.state)));
	const px = menus && menus.length > 2 ? "px-2" : "px-10";
	return (
		<div className="m-[10px] bg-white rounded-lg shadow-sm">
			<div className="text-center pt-7">
				<div className="bg-lxd text-white">{title}</div>
				<div className="bg-freeze py-1 text-sm">
					最后更新:{last_update}
				</div>
				<div className="p-6">
					<p className="text-sm text-justify">{description}</p>

					{post_link && (
						<div className="flex justify-center text-center mt-5 ">
							<a href={post_link} target="_blank" rel="noopener">
								<p className="w-24 text-sm px-2 bg-lxd text-white rounded-lg">
									我要投稿
								</p>
							</a>
						</div>
					)}

					{menus && (
						<div
							className={`border-2 my-5 py-2 border-gray-300 rounded-lg flex justify-between ${px}`}
						>
							{menus.map((menu, index) => (
								<DropDownSelect menu={menu} key={index} />
							))}
						</div>
					)}
					{menus && isActive !== 0 && show_active && (
						<div className="text-xs">
							<span className="font-bold">当前展示：</span>
							{getCurrentSelectString(menus!)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
