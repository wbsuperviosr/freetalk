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
import { HeadCard } from "../components/timeline/HeadCard";
import { TimelineCard } from "../components/timeline/TimelineCard";
import { Timeline } from "../models/timelineModel";
import { getClient } from "../utils/sanity";
import { makeMapState, getSelect } from "../components/menu/utils";

const timeline_texts = {
	title: "「江案阅览」",
	text: [
		"一场对幸存者和证人的猎巫围剿",
		"然而真相必然具备绝对的力量，长存不灭",
	],
	subtext:
		"江秋莲诉刘鑫生命权纠纷案在公众平台、媒体的重要发布，本栏目尽力保存",
	link: "https://assets.wbavengers.com/Resource/background_imgs/header_case.png",
};

function getCurrentStatusText(
	yearState: Map<string, boolean>,
	nameState: Map<string, boolean>,
	typeState: Map<string, boolean>,
	infoState: Map<string, boolean>
) {
	const years = getSelect(yearState);
	const names = getSelect(nameState);
	const types = getSelect(typeState);
	const infos = getSelect(infoState);

	const string = `当前展示【时间：${years}】【人物：${names}】【性质：${types}】【来源：${infos}】范围内的条目`;
	return string;
}

function TimelineList({
	timelines,
	yearState,
	nameState,
	typeState,
	infoState,
}: {
	timelines: Timeline[];
	yearState: Map<string, boolean>;
	nameState: Map<string, boolean>;
	typeState: Map<string, boolean>;
	infoState: Map<string, boolean>;
}) {
	const string = getCurrentStatusText(
		yearState,
		nameState,
		typeState,
		infoState
	);
	return (
		<div className="mx-auto relative pt-2">
			<div className="border-l-2 mt-3">
				<div className="relative flex items-center px-6 py-4  rounded mb-2 flex-col">
					<div className="w-3 h-3 bg-lxd  absolute -left-[1px] -top-2 transform -translate-x-2/4 rounded-full mt-2"></div>
					<div className="text-xs ml-1 font-bold justify-start text-justify text-slate-600">
						{string}
					</div>
				</div>
				{/* 
				<TimelineCard
					timeline={timelines[4]}
					yearState={yearState}
					nameState={nameState}
					typeState={typeState}
					infoState={infoState}
				/> */}

				{timelines.map((timeline, index) => {
					return (
						<TimelineCard
							timeline={timeline}
							yearState={yearState}
							nameState={nameState}
							typeState={typeState}
							infoState={infoState}
							key={index}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default function TimelinePage({ timelines }: { timelines: Timeline[] }) {
	const initialYears = makeMapState(getYears(timelines));
	const initialNames = makeMapState(getPeoples(timelines));
	const initialTypes = makeMapState(getTypes(timelines));
	const initialInfos = makeMapState(getInfos(timelines));

	const [yearState, setYearState] = React.useState(initialYears);
	const [nameState, setNameState] = React.useState(initialNames);
	const [typeState, setTypeState] = React.useState(initialTypes);
	const [infoState, setInfoState] = React.useState(initialInfos);

	return (
		<div>
			<Header {...timeline_texts} />
			<div className="bg-gray-100 p-3 ">
				<HeadCard
					yearState={{ state: yearState, setState: setYearState }}
					nameState={{ state: nameState, setState: setNameState }}
					typeState={{ state: typeState, setState: setTypeState }}
					infoState={{ state: infoState, setState: setInfoState }}
				/>

				<TimelineList
					timelines={timelines}
					yearState={yearState}
					nameState={nameState}
					typeState={typeState}
					infoState={infoState}
				/>
				<Footer />
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient(true);

	const query = `
    *[_type=="timeline"&&!(_id in path("drafts.**"))]{
		date,
		  time,
		  event,
		  type,
		  image_urls[]{
			urlField,
			url_title,
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
