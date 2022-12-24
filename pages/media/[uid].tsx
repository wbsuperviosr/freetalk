import { ClockIcon, NewspaperIcon } from "@heroicons/react/24/outline";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import "photoswipe/dist/photoswipe.css";
import React from "react";
import { BsBookmarks, BsCalendar3 } from "react-icons/bs";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header";
import { LXPortableTextComponents } from "../../components/PortableText";
import { Media } from "../../models/mediaModel";
import { getDate } from "../../utils/getDate";
import { getClient } from "../../utils/sanity";
import { media_text } from "../../components/HeroText";

function MediaBody({ media }: { media: Media }) {
	const select = media.writtenAt ? media.writtenAt : media.publishedAt!;
	const select_date = new Date(select);
	const media_url = `https://assets.wbavengers.com/${media.mediaUrl}`;
	return (
		<div className="m-[10px] bg-white rounded-lg min-h-[57vh]">
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
				<div className="flex space-x-2 pt-2 items-center">
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

				<video controls autoPlay className="py-5">
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
			<Header {...media_text} />
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
