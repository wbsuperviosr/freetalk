import { ClockIcon, NewspaperIcon } from "@heroicons/react/24/outline";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import "photoswipe/dist/photoswipe.css";
import React from "react";
import { BsBookmarks, BsCalendar3 } from "react-icons/bs";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header";
import { LXPortableTextComponents } from "../../components/PortableText";
import { CaseFile, ImageUrl } from "../../models/casefilesModel";
import { Media } from "../../models/mediaModel";
import { getDate } from "../../utils/getDate";
import { getClient } from "../../utils/sanity";

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

function MediaBody({ media }: { media: Media }) {
	const select = media.writtenAt ? media.writtenAt : media.publishedAt!;
	const select_date = new Date(select);
	const date_string = getDate(select_date);
	const media_url = `https://assets.wbavengers.com/${media.mediaUrl}`;
	return (
		<div className="m-[10px] bg-white rounded-lg">
			<div className="p-[22px]">
				<div className="flex justify-between border-b-2 pb-2">
					<div className="flex space-x-2">
						<Link href={"/media"}>
							<p className="text-lxd">影音合集</p>
						</Link>
						<p>|</p>
						<p>{media.category}</p>
					</div>
					<div>{getDate(new Date(media.writtenAt))}</div>
				</div>
				<div className="flex space-x-2 items-center">
					{media.tags &&
						media.tags.map((tag, index) => {
							return (
								<div
									className="flex space-x-1 items-center"
									key={index}
								>
									<BsBookmarks className="w-3" />
									<p className="text-lxd text-xs">{tag}</p>
								</div>
							);
						})}
				</div>
				<div className="mx-[100px] mt-8 text-center text-xl font-bold border-b-2 pb-2">
					{media.title}
				</div>
				<div className="mx-[80px] text-center pt-4 border-b-2 pb-2">
					{media.subtitle}
				</div>

				{media.description && <div>{media.description}</div>}

				<video controls autoPlay className="pt-2">
					<source src={media_url} type="video/mp4" />
				</video>

				{media.content && (
					<div className="pb-5 pt-5 space-y-3 text-justify">
						<PortableText
							value={media.content!}
							components={LXPortableTextComponents}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default function MediaPost({ medias }: { medias: Media[] }) {
	return (
		<div className="bg-gray-100">
			<Header {...media_header} />
			{medias.map((media, index) => {
				return <MediaBody media={media} key={index} />;
			})}
			<Footer />
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const client = getClient(true);

	const post_query = `
    *[_type=="media"&&!(_id in path("drafts.**"))]|order(_updatedAt desc){
      _id, 
      slug,
    }`;

	const medias: Media[] = await client.fetch(post_query);
	const paths = medias.map((media) => {
		return {
			params: {
				uid: media.slug.current,
			},
		};
	});
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient(true);

	const post_query = `
    *[_type=="media" &&!(_id in path("drafts.**"))&& slug.current==$slug]
  `;
	const medias: Media[] = await client.fetch(post_query, {
		slug: params?.uid,
	});
	return {
		props: {
			medias: medias,
		},
	};
};
