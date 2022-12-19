import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { getClient } from "../../utils/sanity";
import { getDate } from "../../utils/getDate";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import {
	calcMapSum,
	getCurrentSelectString,
} from "../../components/menu/utils";
import {
	DropDownProps,
	DropDownSelect,
	makeDropDownMenu,
} from "../../components/menu/DropDownSelect";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { BiCategory } from "react-icons/bi";
import { Media } from "../../models/mediaModel";

const media_header = {
	title: "「江案阅览」",
	text: [
		"一场对幸存者和证人的猎巫围剿",
		"然而真相必然具备绝对的力量，长存不灭",
	],
	subtext:
		"江秋莲诉刘鑫生命权纠纷案在公众平台、媒体的重要发布，本栏目尽力保存",
	link: "https://am3pap007files.storage.live.com/y4mrQYXPK0wzkCTllrL1t052m_p4B9ILnOE5793RgUsEtrfwfpZEulDim8xljELSTBcdy0t4yCXVxk1kCQ2augpQxMlA_Or54EpA3qvq1V7PFaPmvqr-3lolzzN1BcN2QLdvY606SqMXscShYWiUg9HaVBU0jroxFbwnZ9iDhcZrtVwxzseQu4VuPTMYvTjM6YS?width=1920&height=460&cropmode=none",
};

function getUniqueYear(medias: Media[]) {
	const years = new Set<string>(
		medias.map((media) => {
			return `${new Date(media.writtenAt).getFullYear()}`;
		})
	);
	return Array.from(years).sort();
}

function MediaHeader({
	medias,
	years,
	classes,
}: {
	medias: Media[];
	years: DropDownProps;
	classes: DropDownProps;
}) {
	// const showText: number =
	// 	calcMapSum(years.options.state) + calcMapSum(classes.options.state);
	return (
		<div className="m-[10px] bg-white rounded-lg border-[1px] shadow-sm">
			<div className="text-center pt-5 flow-row">
				<p className="bg-lxd text-white items-center text-[16px] tracking-[2.1px]">
					影音合集
				</p>
				<p className="bg-freeze font-bold text-[12px] h-5 pt-[2px] ">
					最后更新:{getDate(new Date(medias[0].publishedAt))}
				</p>
			</div>

			<div className="mx-8 pt-5">
				<p className="tracking-[1.8px] text-[14px] text-justify">
					本栏目对公开影音资料进行收集和整理，感谢各位网友的整理的无私分享。可以根据以下规则进行媒体内容内容的删选。
				</p>

				<div className="flex justify-between my-3 mb-5 p-2 px-10 border-2 rounded-lg">
					<DropDownSelect menu={years} />
					<DropDownSelect menu={classes} />
				</div>
			</div>
		</div>
	);
}

function inferTarget(
	media: Media,
	yearState: Map<string, boolean>,
	classState: Map<string, boolean>
) {
	let isTarget = true;
	const yearTrues = calcMapSum(yearState);
	const classTrues = calcMapSum(classState);

	if (yearTrues !== 0) {
		const currentYear = `${new Date(media.writtenAt).getFullYear()}`;
		if (!yearState.get(currentYear)) {
			isTarget = false;
		}
	}

	if (classTrues !== 0) {
		if (!classState.get(media.category)) {
			isTarget = false;
		}
	}
	return isTarget;
}

function MediaCard({
	media,
	yearState,
	classState,
}: {
	media: Media;
	yearState: Map<string, boolean>;
	classState: Map<string, boolean>;
}) {
	const isTarget = inferTarget(media, yearState, classState);

	return (
		<>
			{isTarget && (
				<Link href={`/media/${media.slug.current}`}>
					<div className="flex bg-white py-3 justify-between rounded-lg shadow-sm">
						<div className="">
							<div className="flex items-center space-x-4">
								<div className="w-10 h-[2px] bg-freeze"></div>
								<div className="w-4 h-4 bg-lxl rounded-full"></div>
								<p className="text-lg font-bold text-lxd">
									{media.title}
								</p>
							</div>
							<p className="text-black">{media.category}</p>
							<p className="text-gray-600 text-sm">
								{media.subtitle}
							</p>
						</div>
						{media.imageUrl && (
							<img
								src={media.imageUrl}
								alt={media.title}
								className="w-20 h-20 object-cover grayscale-[50%]"
							/>
						)}
					</div>
				</Link>
			)}
		</>
	);
}

function MediaList({
	medias,
	years,
	classes,
}: {
	medias: Media[];
	years: DropDownProps;
	classes: DropDownProps;
}) {
	const num_active = medias
		.map((media) =>
			inferTarget(media, years.options.state, classes.options.state)
		)
		.reduce((a, b) => Number(a) + Number(b), 0);
	return (
		<div className="bg-white rounded-lg m-[10px] border shadow-sm">
			<div className="m-6">
				<div className="flex space-x-3  pb-1 items-center border-b-2">
					<p className="text-lxd">影音</p>
					<p>|</p>
					<p className="text-sm">
						{getCurrentSelectString([years, classes])}
					</p>
				</div>
				<p className="text-[12px] mt-3">
					总共筛选出{num_active}影视作品
				</p>

				{medias.map((media) => {
					return (
						<MediaCard
							media={media}
							yearState={years.options.state}
							classState={classes.options.state}
						/>
					);
				})}
			</div>
		</div>
	);
}

function MediaIndex({ medias }: { medias: Media[] }) {
	const yearsList = getUniqueYear(medias);
	const years = makeDropDownMenu(
		"时间",
		<CalendarDaysIcon className="w-3" />,
		yearsList
	);
	const classes = makeDropDownMenu("类别", <BiCategory className="w-3" />, [
		"案情相关",
		"媒体报道",
		"创意作品",
	]);
	return (
		<div className="bg-gray-100">
			<Header {...media_header} />
			<MediaHeader medias={medias} years={years} classes={classes} />
			<MediaList medias={medias} years={years} classes={classes} />

			<Footer />
		</div>
	);
}

export default MediaIndex;

function sortMedia(a: Media, b: Media) {
	if (a.category == "案情相关" && b.category == "案情相关") {
		return (
			new Date(b.writtenAt).getTime() - new Date(a.writtenAt).getTime()
		);
	} else if (a.category == "案情相关" && b.category != "案情相关") {
		return -1;
	} else {
		return 0;
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient(true);

	const post_query = `
    *[_type=="media" &&!(_id in path("drafts.**"))]
  `;
	const medias: Media[] = await client.fetch(post_query);
	medias.sort(sortMedia);
	return {
		props: {
			medias: medias,
		},
	};
};
