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
		"https://am3pap007files.storage.live.com/y4mZKtH3s1Bx3lOdyt17ps7MS3p7Io359Tx7aZXD-jlY0nti5PUE61CYbHntFVdJoyfiwViasEi2eKegzmdWzjmopZxmY-lB3Z7N21WnSMw2Jt6bXga_zd_7EFTUl_DzXRv8b70od1gM89QTc8PVUYhGa9MQCbAX74MWwF5708thljXRWtpEzbPuygo91HkqvEf?width=1024&height=576&cropmode=none",
	title: "时光回溯",
	description: "案件具体时间线，细说事件始末",
	dark: false,
	link: "/timeline",
	update: new Date(),
};

const rumor: CardProps = {
	bg_image:
		"https://am3pap007files.storage.live.com/y4mI5-GKO3C4Ayyw2p-O_I8Xd-6mWc_LCAiKIrqOHdSaUd6mnUGA13SHKb1WS2Ot5DLxip9qt3CyVfnZBqVnDfVXGEivQHoO1E1O2VKWR0UJc4I6iGnJOsj6vT8oeQt350yggwX-ux4bflKM7rQKJ7P_hFkqDU-Zk0Ck_5LkBIBdYySRwA3PER8-_rKDSwLxbZ1?width=1024&height=683&cropmode=none",
	title: "辟谣问答",
	description: "事实是？那些人尽皆知的谎言又是...？",
	update: new Date(),
	link: "/rumor",
	dark: true,
};

const media: CardProps = {
	bg_image:
		"https://am3pap007files.storage.live.com/y4m_EoEIEXTzcwJgH65UvPI4ywN5Tu29FDpq8SOClbiC-KzPIyDQuaePlevZQ_hZDPoaf4ivS3e9PW8HBTZGbSP_7OAHHUx3XSgLWjJnck2SK0oLT5-tUxQ2_yg9Nl10y4FRjG-I70WN7xwluCzvqY7CSSvbbdf6366nk2Du0-FOu9yt0YiaCgcQzsapc_w0wPx?width=1024&height=643&cropmode=none",
	title: "影音合集",
	description: "重要的音频视频合集，如报警录音与采访",
	update: new Date(),
	link: "/media",
	dark: false,
};

const casefile: CardProps = {
	bg_image:
		"https://am3pap007files.storage.live.com/y4m7JUpB7GDecmGaaik_kiRT_eHVpfWJMhpRS1xqyYHwi1hGrzxV8XfdRriz0fAvHhIunUtQDxB9z93j2jWif48XqH73GKGM0ZrIg-AxL0jVhrlOtA7CpBQ83r8MvR5zafLB4W_9vliuqGDa5UytcdLHM-hepuGg-B_o1NAZEHkZIGGD6ObJOKAuYQgT-3226tn?width=1024&height=678&cropmode=none",
	title: "部分卷宗",
	description: "有缘见到的仅有这些，也已经说明了许多",
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
				className="w-20 h-20 object-cover"
			/>
			<Link href={props.link}>
				<div className="pl-5 space-y-[7px] text-black">
					<div className="flex items-center">
						<hr className="h-1 w-[25px] bg-gray-300 mr-[10px]" />
						<div
							className={`w-4 h-4 ${
								props.dark ? "bg-lxd" : "bg-lxl"
							} rounded-full mr-[10px]`}
						></div>
						<p className="font-bold">{props.title}</p>
					</div>
					<p className="text-xs">{props.description}</p>
					<p className="font-bold text-xs">
						最后更新：{getDate(props.update)}
					</p>
				</div>
			</Link>
		</div>
	);
}

export default function CaseView() {
	return (
		<div className="mx-4 pb-5">
			<div className="bg-white rounded-lg border shadow-sm pb-[15px]">
				<p className="flex px-5 pt-5 pb-3 border-b-2 font-bold text-sm">
					江案阅览
				</p>
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
