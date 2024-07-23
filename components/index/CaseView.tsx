import Link from "next/link";
import React from "react";
import { getDate } from "../../utils/getDate";

type CardProps = {
	bg_image: string;
	title: string;
	description: string;
	update: Date;
	dark: boolean;
	link: string;
};

const timeline: CardProps = {
	bg_image:
		"https://images.pexels.com/photos/714701/pexels-photo-714701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	title: "时光回溯",
	description: "案件具体时间线，细说事件始末",
	dark: false,
	link: "/timeline",
	update: new Date(),
};

const rumor: CardProps = {
	bg_image:
		"https://images.pexels.com/photos/33779/hand-microphone-mic-hold.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	title: "辟谣问答",
	description: "那些人尽皆知的谎言是...？",
	update: new Date(),
	link: "/rumor",
	dark: true,
};

const media: CardProps = {
	bg_image:
		"https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	title: "影音合集",
	description: "重要的音频视频合集",
	update: new Date(),
	link: "/media",
	dark: false,
};

const casefile: CardProps = {
	bg_image:
		"https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	title: "部分卷宗",
	description: "有缘见到的这些也说明了许多",
	update: new Date(),
	link: "/casefiles",
	dark: true,
};

function Card(props: CardProps) {
	return (
		<div className="flex px-5 pt-[15px]">
			<img
				src={props.bg_image}
				alt={props.title}
				className="w-20 h-20 md:w-40 md:h-40 object-cover"
			/>
			<Link href={props.link}>
				<div className="pl-5 space-y-[7px] text-black">
					<div className="flex items-center">
						<hr className="h-[2px] w-[25px] md:h-1 md:w-10 bg-gray-300 mr-[10px]" />
						<div
							className={`w-4 h-4 md:w-6 md:h-6 ${
								props.dark ? "bg-lxd" : "bg-lxl"
							} rounded-full mr-[10px]`}
						></div>
						<p className="font-bold text-[16px] md:text-xl">
							{props.title}
						</p>
					</div>
					<p className="text-[14px] md:text-lg">
						{props.description}
					</p>
					<p className="font-bold text-[12px] md:text-[15px]">
						最后更新：{getDate(props.update)}
					</p>
				</div>
			</Link>
		</div>
	);
}

export default function CaseView() {
	return (
		<div className="mx-[10px]">
			<div className="bg-white rounded-xl border shadow-lg pb-[15px]">
				<p className="flex px-5 pt-5 pb-3 font-bold text-sm md:text-xl text-lxd">
					江案阅览
				</p>

				<hr className="text-black h-[2px] bg-freeze mx-5" />
				<div>
					<Card {...casefile} />
					<Card {...timeline} />
					<Card {...rumor} />
					<Card {...media} />
				</div>
			</div>
		</div>
	);
}
