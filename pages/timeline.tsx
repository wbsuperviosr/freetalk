import { GetStaticProps } from "next";
import React from "react";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import {
	getInfos,
	getPeoples,
	getTypes,
	getYears,
} from "../components/timeline/calc";
import { TimelineCard } from "../components/timeline/TimelineCard";
import { Timeline } from "../models/timelineModel";
import { getClient } from "../utils/sanity";
import { timeline_text } from "../components/HeroText";
import {
	DropDownProps,
	makeDropDownMenu,
} from "../components/menu/DropDownSelect";
import {
	CalendarDaysIcon,
	FolderIcon,
	GlobeAltIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { ListHeader } from "../components/ListHeader";
import { getCurrentSelectString } from "../components/menu/utils";
import { makeSearchState, SearchProps } from "../components/menu/SearchBar";
import { extractText } from "../components/PortableText";

function TimelineList({
	timelines,
	menus,
	search,
}: {
	timelines: Timeline[];
	menus: DropDownProps[];
	search: SearchProps;
}) {
	const string = getCurrentSelectString(menus);
	return (
		<div className="mx-auto relative pt-2">
			<div className="border-l-2 mt-3">
				<div className="relative flex items-center px-6 py-4  rounded mb-2 flex-col">
					<div className="w-3 h-3 bg-lxd  absolute -left-[1px] -top-2 transform -translate-x-2/4 rounded-full mt-2"></div>
					<div className="text-xs ml-1 font-bold justify-start text-justify text-slate-600">
						{string}
					</div>
				</div>

				{timelines.map((timeline, index) => {
					return (
						<TimelineCard
							timeline={timeline}
							menus={menus}
							key={index}
							search={search}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default function TimelinePage({ timelines }: { timelines: Timeline[] }) {
	// timelines.sort(sortTimeline);
	const years = makeDropDownMenu(
		"时间",
		<CalendarDaysIcon className="w-3" />,
		getYears(timelines),
		(timeline: Timeline) => timeline.date.split("-")[0]
	);

	const names = makeDropDownMenu(
		"人物",
		<UserIcon className="w-3" />,
		getPeoples(timelines),
		(timeline: Timeline) => timeline.people.map((p) => p.name)
	);
	const types = makeDropDownMenu(
		"性质",
		<FolderIcon className="w-3" />,
		getTypes(timelines),
		(timeline: Timeline) => timeline.type
	);
	const infos = makeDropDownMenu(
		"来源",
		<GlobeAltIcon className="w-3" />,
		getInfos(timelines),
		(timeline: Timeline) => timeline.source
	);

	const menus = [years, names, types];
	const search = makeSearchState(
		(timeline: Timeline) => {
			return [timeline.title, extractText(timeline.event)];
		},
		"搜索",
		"例如: 微博热搜"
	);

	const list_header = {
		title: "江刘案相关事件时间线 ：2017-2022",
		description:
			"时间线可以根据不同的方式进行筛选。例如，按时间年份查看，按事件人物查看，按事件性质查看，和按事件信息来源查看。感谢各位网友进行整理！。",
		last_update: "更新：2023年1月22日 | 第0.1版[日志]",
		menus: menus,
		show_active: false,
		post_link: "https://wj.qq.com/s2/11424513/d27e",
		search: search,
	};

	return (
		<div>
			<Header {...timeline_text} />
			<div className="bg-gray-100 p-3 ">
				<ListHeader {...list_header} />

				<TimelineList
					timelines={timelines}
					menus={menus}
					search={search}
				/>
				<Footer />
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient(true);

	const query = `
    *[_type=="timeline"&&!(_id in path("drafts.**"))]|order(order asc){
		date,
		  time,
		  event,
		  type,
		  image_urls[]{
			urlField,
			url_title,
			width,
			height
		  },
		  source_urls[]{
			urlField,
			url_title,
		  },
		  people[]->{
			name,
		  },
		  title,
		  source,
			tags
	  }
	`;
	const timelines: Timeline[] = await client.fetch(query);
	return {
		props: { timelines: timelines },
	};
};
