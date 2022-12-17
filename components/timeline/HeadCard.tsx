import { DropDownState } from "../menu/DropDownSelect";
import { Menu } from "./Menu";

export function HeadCard({
	yearState,
	nameState,
	typeState,
	infoState,
}: {
	yearState: DropDownState;
	nameState: DropDownState;
	typeState: DropDownState;
	infoState: DropDownState;
}) {
	return (
		<div className="bg-white rounded-lg border border-gray-300">
			<p className="bg-lxd py-1 translate-x-[0px] text-white mt-7 text-center tracking-wider">
				江刘案相关事件时间线 ：2017-2022
			</p>
			<p className="bg-gray-300 py-1 text-center text-sm">
				更新：2022年12月22日 | 第0.1版[日志]
			</p>
			<p className="bg-white p-5 text-sm text-gray-500 font-noto">
				时间线可以根据不同的方式进行筛选。例如，按时间年份查看，按事件人物查看，按事件性质查看，和按事件信息来源查看。感谢：@孤独的开心果酱，@灰石eye进行整理。
			</p>
			<Menu
				yearState={yearState}
				nameState={nameState}
				typeState={typeState}
				infoState={infoState}
			/>
		</div>
	);
}
