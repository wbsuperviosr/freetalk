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
		"https://am3pap007files.storage.live.com/y4moN6UA0S0lmXgO-ZGgqVBfBdquZtrnTkPGSUTY0NJY5D2Xt_6lDMrJeAPSg77jmvnnL2bwmhL0MRQiajuqiGRRpJqziPXbzUiM_UJFbEjSqI___p2HsGOKcBXRrJkBYvyhQ2f6MLD4WDXChs9GKACmwVAp-RAzAvReFWUMnGCB1Fgr2okKXQW9JxKrTOlnLc9?width=500&height=500&cropmode=none",
	title: "时光回溯",
	description: "案件具体时间线，细说事件始末",
	dark: false,
	link: "/timeline",
	update: new Date(),
};

const rumor: CardProps = {
	bg_image:
		"https://am3pap007files.storage.live.com/y4muQj2M_PSlKoGLuj2tlpEVuMjEWINjLBgv6GOJvOKtqwS-gMXSNATGxmpd6wyZKbTKMfH8svq0T1mh7pI7IK01D7417lYGtfddpQ6uyy7AWQFwQf_0c2NNP7lNagHba3RiXovaMU2qtJglKloNaJngbIPD9tC9Swe17q8SbofdUS7dQO5uVrc8trji6hKmx0g?width=500&height=500&cropmode=none",
	title: "辟谣问答",
	description: "事实是？那些人尽皆知的谎言又是...？",
	update: new Date(),
	link: "/rumor",
	dark: true,
};

const media: CardProps = {
	bg_image:
		"https://am3pap007files.storage.live.com/y4mNUFelAv03gAVClpNseFsCACqXyfhu3qh8xwqx3FIWK3pK14uKClUBoZ252YXR11UaWQbAnN2eUHK6r_cutYvBlyWZRCCLJv06rvCR3bU-s4xUKMxo-azMjUayKPd0s1OWv41-jA03yqoRpcK3hcCTIrXDjjzPSMLbqTnX6JVH2kDAgXTlucfLWJ0soSGz2WN?width=500&height=500&cropmode=none",
	title: "影音合集",
	description: "重要的音频视频合集，如报警录音与采访",
	update: new Date(),
	link: "/media",
	dark: false,
};

const casefile: CardProps = {
	bg_image:
		"https://am3pap007files.storage.live.com/y4mWdEsP4cgD_gApnULBztQmtC5qmsj958ltBhiy0PP6It_ooNxQXIOe8H4J_4yJU3ALfWz_VZpDLT9mQIl_E4wjq6-NIrwcX6mmMo_OvUp7y4kbmQ60b2yUtmx0SIM4AAkJmMe3Gv_6w8etwynQTF-RXpjU-Y35j5gHpCJX1vWvn4K3j81p7460avn8JLf7p-n?width=500&height=500&cropmode=none",
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
						<p className="font-bold text-[16px]">{props.title}</p>
					</div>
					<p className="text-[12px]">{props.description}</p>
					<p className="font-bold text-[11px]">
						最后更新：{getDate(props.update)}
					</p>
				</div>
			</Link>
		</div>
	);
}

export default function CaseView() {
	return (
		<div className="mx-[10px] pb-5">
			<div className="bg-white rounded-xl border shadow-lg pb-[15px]">
				<p className="flex px-5 pt-5 pb-3 font-bold text-sm text-lxd">
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
