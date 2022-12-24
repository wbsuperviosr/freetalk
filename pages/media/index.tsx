import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { getClient } from "../../utils/sanity";
import { getDate } from "../../utils/getDate";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import {
	getCurrentSelectString,
	inferTarget,
} from "../../components/menu/utils";
import {
	DropDownProps,
	makeDropDownMenu,
} from "../../components/menu/DropDownSelect";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { BiCategory } from "react-icons/bi";
import { Media } from "../../models/mediaModel";
import { media_text } from "../../components/HeroText";
import { ListHeader } from "../../components/ListHeader";
import { sum, unique } from "../../utils/ArrayOps";

function MediaCard({ media, menus }: { media: Media; menus: DropDownProps[] }) {
	const isTarget = inferTarget(media, menus);

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
	menus,
}: {
	medias: Media[];
	menus: DropDownProps[];
}) {
	const num_active = sum(medias.map((media) => inferTarget(media, menus)));
	return (
		<div className="bg-white rounded-lg m-[10px] border shadow-sm">
			<div className="m-6">
				<div className="flex space-x-3  pb-1 items-center border-b-2">
					<p className="text-lxd">影音</p>
					<p>|</p>
					<p className="text-sm">{getCurrentSelectString(menus)}</p>
				</div>
				<p className="text-[12px] mt-3">
					总共筛选出{num_active}影视作品
				</p>

				{medias.map((media, index) => {
					return (
						<MediaCard key={index} media={media} menus={menus} />
					);
				})}
			</div>
		</div>
	);
}

function MediaIndex({ medias }: { medias: Media[] }) {
	const getYear = (media: Media) =>
		`${new Date(media.writtenAt).getFullYear()}`;
	const yearsList = unique(medias, getYear);
	const years = makeDropDownMenu(
		"时间",
		<CalendarDaysIcon className="w-3" />,
		yearsList,
		getYear
	);
	const classes = makeDropDownMenu(
		"类别",
		<BiCategory className="w-3" />,
		["案情相关", "媒体报道"],
		(media) => media.category
	);

	const list_header = {
		title: "影音合集",
		description:
			"本栏目对公开影音资料进行收集和整理，感谢各位网友的整理的无私分享。可以根据以下规则进行媒体内容内容的删选。",
		last_update: getDate(new Date(medias[0]._updatedAt)),
		menus: [years, classes],
		show_active: false,
		post_link: "https://wj.qq.com/s2/11424515/904b",
	};

	return (
		<div className="bg-gray-100">
			<Header {...media_text} />
			<ListHeader {...list_header} />
			<MediaList medias={medias} menus={[years, classes]} />

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
