import Header from "../components/Header";
import React from "react";
import { GetStaticProps } from "next";
import { getClient } from "../utils/sanity";
import { Event, ImageUrl, Timeline } from "../models/timelineModel";
import {
	CalendarDaysIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	ChevronUpIcon,
	UserIcon,
	FolderIcon,
	GlobeAltIcon,
	FolderPlusIcon,
	XMarkIcon,
	PhotoIcon,
	BookOpenIcon,
	TagIcon,
} from "@heroicons/react/24/outline";
import { LXPortableTextComponents } from "../components/PortableText";
import { PortableText } from "@portabletext/react";

const timeline_texts = {
	title: "「江刘之案」",
	text: [
		"一场对幸存者和证人的猎巫围剿",
		"然而真相必然具备绝对的力量，长存不灭",
	],
	subtext:
		"江秋莲诉刘鑫生命权纠纷案在公众平台、媒体的重要发布，本栏目尽力保存",
	link: "https://assets.wbavengers.com/Resource/background_imgs/header_case.png",
};

type DropDownProps = {
	title: string;
	options: MenuProps;
	icon: React.ReactNode;
};

type DropDownItemsProps = {
	option: string;
	isSelected: boolean;
	setOptionState: (option: string, toggle: boolean) => void;
};

type MenuProps = {
	state: Map<string, boolean>;
	setState: (state: Map<string, boolean>) => void;
};

function getYears(timelines: Timeline[]): string[] {
	const years = new Set<string>(
		timelines.map((timeline) => {
			return timeline.date.split("-")[0];
		})
	);
	return Array.from(years);
}

function getPeoples(timelines: Timeline[]): string[] {
	const peoples = timelines
		.map((timeline) => {
			return timeline.people.map((p) => {
				if (p) {
					if (p.name) {
						return p.name;
					}
				}
			});
		})
		.flat(1);

	const names = Array.from(
		new Set(
			peoples.filter((p) => {
				return p !== undefined;
			})
		)
	) as string[];
	return names;
}

function getTypes(timelines: Timeline[]): string[] {
	const types = new Set(
		timelines.map((timeline) => {
			return timeline.type.title;
		})
	);
	return Array.from(types);
}

function getInfos(timelines: Timeline[]): string[] {
	const sources = new Set(
		timelines.map((timeline) => {
			return timeline.source;
		})
	);
	return Array.from(sources).filter((source) => {
		return source;
	}) as string[];
}

function DropDownItems({
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

function DropDownSelect({ menu }: { menu: DropDownProps }) {
	const [open, setOpen] = React.useState(false);

	const handOptionState = (option: string, toggle: boolean) => {
		menu.options.setState(
			new Map<string, boolean>(menu.options.state.set(option, toggle))
		);
	};

	const menuOptions = Array.from(menu.options.state.keys());
	return (
		<div className="relative">
			<div className="flex space-x-1 items-center cursor-default ">
				<div>{menu.icon}</div>
				<div className="text-xs cursor-default ">{menu.title}</div>
				<div>
					<ChevronDownIcon
						className="w-4 cursor-pointer"
						onClick={() => setOpen(!open)}
					/>
				</div>
			</div>

			{open && (
				<div className="absolute top-8 bg-white border border-gray-300 py-1 space-y-1 rounded-lg z-50">
					{menuOptions.map((option) => {
						return (
							<DropDownItems
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

function Menu({
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

export function HeadCard({
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

function makeMapState(options: string[], initial: boolean = false) {
	const state = new Map<string, boolean>();
	for (const option of options) {
		state.set(option, initial);
	}
	return state;
}

function getSelect(state: Map<string, boolean>) {
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

function getDate(date: string) {
	const [year, month, day] = date.split("-");
	return day == "XX" ? `${year}年${month}月` : `${year}年${month}月${day}日`;
}

function getTime(time: string) {
	const [hh, mm] = time.split(":");
	if (mm == "XX") {
		return `${hh}点`;
	} else if (mm == "AA") {
		return `${hh}点之前`;
	} else if (mm == "BB") {
		return `${hh}点之后`;
	} else {
		return `${hh}点${mm}分`;
	}
}

function makeSummary(eventText: Event[], threhold: number = 140) {
	console.log(eventText);
	let summary: Event[] = JSON.parse(JSON.stringify(eventText.slice(0, 1)));
	let isSummarized: boolean = false;

	if (eventText.length > 1) {
		if (eventText[eventText.length - 1].children[0].text !== "") {
			isSummarized = true;
		}
	}

	if (summary[0].children[0].text.length > threhold) {
		summary[0].children[0].text = summary[0].children[0].text.slice(
			0,
			threhold
		);
		isSummarized = true;
	}

	return [summary, isSummarized];
}
function EvidenceCard({
	image_url,
	index,
}: {
	image_url: ImageUrl;
	index: number;
}) {
	return (
		<div
			className={`carousel-item ${
				index == 0 ? "active" : ""
			} relative float-left w-full`}
		>
			<img src={image_url.urlField} className="block w-full" alt="..." />
			<div className="carousel-caption absolute text-center">
				<h5 className="text-md">{image_url.url_title}</h5>
				{/* <p className="text-white">
					Some representative placeholder content for the first slide.
				</p> */}
			</div>
		</div>
	);
}

function ImageSlider({ image_urls }: { image_urls: ImageUrl[] }) {
	return (
		<div
			id="carouselExampleCaptions"
			className="carousel slide relative"
			data-bs-ride="carousel"
		>
			<div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
				{image_urls.map((_, index) => {
					return (
						<button
							type="button"
							key={index}
							data-bs-target="#carouselExampleCaptions"
							data-bs-slide-to={`${index}`}
							className={index == 0 ? "active w-5" : "w-5"}
							aria-current={index == 0 ? "true" : "false"}
							aria-label={`Slide ${index + 1}`}
						></button>
					);
				})}
			</div>
			<div className="carousel-inner relative w-full overflow-hidden">
				{image_urls.map((image_url, index) => {
					return (
						<EvidenceCard
							image_url={image_url}
							index={index}
							key={index}
						/>
					);
				})}
			</div>
			<button
				className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
				type="button"
				data-bs-target="#carouselExampleCaptions"
				data-bs-slide="prev"
			>
				<span
					className="carousel-control-prev-icon inline-block bg-no-repeat"
					aria-hidden="true"
				></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button
				className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
				type="button"
				data-bs-target="#carouselExampleCaptions"
				data-bs-slide="next"
			>
				<span
					className="carousel-control-next-icon inline-block bg-no-repeat"
					aria-hidden="true"
				></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
}

function ImageEvidence({ image_urls }: { image_urls: ImageUrl[] }) {
	const [open, setOpen] = React.useState(false);

	const valid_images =
		image_urls &&
		image_urls.filter((image_url) => {
			return image_url.urlField && image_url.url_title;
		});

	return (
		<>
			{valid_images && valid_images.length !== 0 && (
				<div className="relative flex justify-between px-3 pt-1 space-x-1">
					<div className="flex space-x-1">
						<PhotoIcon className="w-4" />
						<p
							className="text-lxd text-xs"
							onClick={() => setOpen(!open)}
						>
							点击查看图片证据
						</p>
					</div>
					{open && (
						<div className="flex" onClick={() => setOpen(!open)}>
							<XMarkIcon className="w-4 fill-lxd text-lxd" />
							<p className="text-lxd text-xs">关闭</p>
						</div>
					)}
				</div>
			)}
			{open && <ImageSlider image_urls={image_urls} />}
		</>
	);
}

const calcMapSum = (map: Map<string, boolean>) => {
	return Array.from(map.values()).reduce((a, b) => Number(a) + Number(b), 0);
};

function inferTarget(
	timeline: Timeline,
	yearState: Map<string, boolean>,
	nameState: Map<string, boolean>,
	typeState: Map<string, boolean>,
	infoState: Map<string, boolean>
) {
	let isTarget = true;
	const yearTrues = calcMapSum(yearState);
	const nameTrues = calcMapSum(nameState);
	const typeTrues = calcMapSum(typeState);
	const infoTrues = calcMapSum(infoState);

	if (yearTrues !== 0) {
		let current_year = timeline.date.split("-")[0];
		if (!yearState.get(current_year)) {
			isTarget = false;
		}
	}

	if (nameTrues !== 0) {
		const curerntPeople = new Map<string, boolean>();
		for (const people of timeline.people) {
			people &&
				curerntPeople.set(people.name, nameState.get(people.name)!);
		}
		const currentNameTrues = calcMapSum(curerntPeople);
		if (currentNameTrues == 0) {
			isTarget = false;
		}
	}

	if (typeTrues !== 0) {
		if (!typeState.get(timeline.type.title)) {
			isTarget = false;
		}
	}

	if (infoTrues !== 0) {
		if (!infoState.get(timeline.source)) {
			isTarget = false;
		}
	}

	return isTarget;
}

function TimelineCard({
	timeline,
	yearState,
	nameState,
	typeState,
	infoState,
}: {
	timeline: Timeline;
	yearState: Map<string, boolean>;
	nameState: Map<string, boolean>;
	typeState: Map<string, boolean>;
	infoState: Map<string, boolean>;
}) {
	const [expand, setExpand] = React.useState(false);
	const [summary, isSummarized] = makeSummary(timeline.event);

	const isTarget = inferTarget(
		timeline,
		yearState,
		nameState,
		typeState,
		infoState
	);
	return (
		<>
			{isTarget && (
				<div className="transform transition cursor-pointer hover:-translate-y-2 ml-6 relative flex items-center pb-4 bg-white text-black rounded-lg border border-gray-300 mb-4 shadow-sm flex-col space-y-4 ">
					<div className="w-5 h-5 bg-white absolute -left-[26px] -translate-y-[1px] transform -translate-x-2/4 rounded-full z-10 mt-2 border-4 border-s border-lxd border-spacing-4"></div>
					<div className="w-8 h-[2px] bg-gray-300 absolute -left-8 z-0"></div>
					<div className="flex-row justify-start w-full">
						<div className="rounded-lg -translate-x-[0px]">
							<div className="pl-3 flex space-x-2 text-xs bg-lxd -translate-y-2 mr-2 text-white rounded-tr-lg">
								<p>{getDate(timeline.date)}</p>
								{timeline.time && <p>|</p>}
								{timeline.time && (
									<p>{getTime(timeline.time)}</p>
								)}
							</div>
							<div className="-translate-y-2 pl-3 text-lg bg-slate-200 mr-2 rounded-br-lg tracking-widest font-noto font-semibold">
								{timeline.title}
							</div>
						</div>
						<div className="flex-col px-3 pr-5  text-sm text-justify border-b-2">
							{isSummarized && !expand && (
								<PortableText
									value={summary as Event[]}
									components={LXPortableTextComponents}
								/>
							)}
							{(!isSummarized || expand) && (
								<PortableText
									value={timeline.event}
									components={LXPortableTextComponents}
								/>
							)}
							{isSummarized && (
								<div
									className="flex justify-end"
									onClick={() => setExpand(!expand)}
								>
									<span className="block font-bold text-lxd">
										{expand ? "...收起" : "...展开"}
									</span>
									{expand ? (
										<ChevronUpIcon className="w-3 fill-lxd" />
									) : (
										<ChevronRightIcon className="w-3 fill-lxd" />
									)}
								</div>
							)}
						</div>

						<div className="px-3 flex pt-4 space-x-2">
							<div className="flex items-center space-x-1">
								<UserIcon className="w-4" />
								<div className="text-xs text-lxd">
									{timeline.people
										.map((p) => (p ? p.name : ""))
										.join(" ")}
								</div>
							</div>
							{timeline.tags && (
								<div className="flex items-center space-x-1">
									<TagIcon className="w-4" />
									{timeline.tags.map((tag, index) => {
										return (
											<div
												className="text-xs text-lxd"
												key={index}
											>
												{tag}
											</div>
										);
									})}
								</div>
							)}
						</div>
						<ImageEvidence image_urls={timeline.image_urls} />

						{timeline.source && (
							<div className="flex px-3 pt-1 space-x-1">
								<BookOpenIcon className="w-4" />
								<div className="text-xs text-lxd ">
									{timeline.source}
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
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
		<div className="mx-auto relative py-3">
			<div className="border-l-2 mt-3">
				<div className="relative flex items-center px-6 py-4  rounded mb-2 flex-col">
					<div className="w-3 h-3 bg-lxd  absolute -left-[1px] -top-2 transform -translate-x-2/4 rounded-full z-10 mt-2"></div>
					<div className="text-xs ml-1 font-bold justify-start text-justify text-slate-600">
						{string}
					</div>
				</div>
				{/* <TimelineCard
					timeline={timelines[0]}
					yearState={yearState}
					nameState={nameState}
					typeState={typeState}
					infoState={infoState}
				/> */}
				{/* 
				<TimelineCard
					timeline={timelines[4]}
					yearState={yearState}
					nameState={nameState}
					typeState={typeState}
					infoState={infoState}
				/> */}

				{timelines.map((timeline) => {
					return (
						<TimelineCard
							timeline={timeline}
							yearState={yearState}
							nameState={nameState}
							typeState={typeState}
							infoState={infoState}
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
		  type->{
			title,
		  },
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
