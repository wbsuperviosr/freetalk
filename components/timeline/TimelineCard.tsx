import {
	ChevronRightIcon,
	ChevronUpIcon,
	TagIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { PortableText } from "@portabletext/react";
import React from "react";
import { MdMergeType } from "react-icons/md";
import { VscSourceControl } from "react-icons/vsc";
import { Timeline, Event } from "../../models/timelineModel";
import { LXPortableTextComponents } from "../PortableText";
import { getDate, getTime } from "./calc";
import { inferTarget } from "../menu/utils";
import ExternalEvidence from "./ExternalEvidence";
import { ImageEvidence } from "./ImageEvidence";
import { DropDownProps } from "../menu/DropDownSelect";
import { time } from "console";

function find_breakpoint(eventText: Event[], threhold: number = 140) {
	let count = 0;
	let i = 0;
	let j = 0;
	let block;
	let span;
	for ([i, block] of eventText.entries()) {
		for ([j, span] of block.children.entries()) {
			count += span.text.length;
			if (count > threhold) {
				return [i, j];
			}
		}
	}
	return [i, j];
}

function makeSummary(eventText: Event[], threhold: number = 50) {
	let summary: Event[] = JSON.parse(JSON.stringify(eventText));
	const [block_i, span_j] = find_breakpoint(eventText, threhold);
	summary.length = block_i + 1;
	summary[block_i].children.length = span_j + 1;

	let isSummarized = false;

	if (eventText.length > block_i + 1) {
		isSummarized = true;
	} else {
		if (
			summary[block_i].children.length <
			eventText[block_i].children.length
		) {
			isSummarized = true;
		}
	}

	return [summary, isSummarized];
}

export function TimelineCard({
	timeline,
	menus,
}: {
	timeline: Timeline;
	menus: DropDownProps[];
}) {
	const [expand, setExpand] = React.useState(false);
	let summary: any;
	let isSummarized: any;
	if (timeline.event) {
		[summary, isSummarized] = makeSummary(timeline.event);
	}

	if (
		timeline.title ==
		"刘鑫向母亲和江秋莲打视频电话，在视频通话中哭着一直向江秋莲道歉"
	) {
		console.log(summary, timeline.event);
	}

	const isTarget = inferTarget(timeline, menus);

	return (
		<>
			{isTarget && (
				<div className="transform  ml-6 relative flex items-center pb-4 bg-white text-black rounded-lg border border-gray-300 mb-4 shadow-sm flex-col space-y-4 z-10 cursor-default">
					<div className="w-5 h-5 bg-white absolute -left-[26px] -translate-y-[1px] transform -translate-x-2/4 rounded-full z-10 mt-2 border-4 border-s border-lxd border-spacing-4"></div>
					{timeline.event && (
						<div className="w-8 h-[2px] bg-gray-300 absolute -left-8 z-0"></div>
					)}
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

						{timeline.event && (
							<div className="flex-col px-3 pr-5 space-y-2 text-sm text-justify border-b-2 pb-2">
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
										className="flex justify-end mt-0"
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
						)}

						<div className="px-3 flex pt-3 space-x-2 items-center ">
							<div className="flex space-x-1 items-center ">
								<UserIcon className="w-4" />
								<div className="text-xs text-lxd">
									{timeline.people
										.map((p) => (p ? p.name : ""))
										.join(" ")}
								</div>
							</div>

							{timeline.type && (
								<div className="flex space-x-0 items-center">
									<MdMergeType className="w-4" />
									<div className="text-xs text-lxd">
										{timeline.type}
									</div>
								</div>
							)}
						</div>

						{timeline.image_urls &&
							timeline.image_urls.length != 0 && (
								<ImageEvidence
									image_urls={timeline.image_urls}
								/>
							)}

						{timeline.source_urls &&
							timeline.source_urls.length != 0 && (
								<ExternalEvidence
									source_urls={timeline.source_urls}
								/>
							)}

						<div className="flex pt-1">
							{timeline.tags && (
								<div className="flex items-center space-x-1 px-3">
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

							{timeline.source && (
								<div className="flex px-3 space-x-1">
									<VscSourceControl className="w-4" />
									<div className="text-xs text-lxd ">
										{timeline.source}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
