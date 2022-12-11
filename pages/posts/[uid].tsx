import { TagIcon } from "@heroicons/react/20/solid";
import {
	ClockIcon,
	EnvelopeIcon,
	FaceSmileIcon,
	HomeIcon,
	NewspaperIcon,
} from "@heroicons/react/24/outline";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import Header from "../../components/Header";
import { LXPortableTextComponents } from "../../components/PortableText";
import { Post } from "../../models/sanityModel";
import { getDate } from "../../utils/getDate";
import { getClient } from "../../utils/sanity";
import QuoteLeft from "../../public/icons/quote_left.svg";
import QuoteRight from "../../public/icons/quote_right.svg";

const lx_voice = {
	title: "「刘鑫声音」",
	text: [
		"我就像时代的一粒沙,卑微到尘埃里",
		"任何人都可以肆意书法她们的道德优越感",
	],
	subtext: "刘鑫/刘暖曦自2016年后再公众平台的发言，本栏目尽力保存",
	link: "https://assets.wbavengers.com/Resource/background_imgs/header_liuxin.png",
};

const common_voice = {
	title: "「网友声音」",
	text: [
		"我就像时代的一粒沙,卑微到尘埃里",
		"任何人都可以肆意书法她们的道德优越感",
	],
	subtext: "刘鑫/刘暖曦自2016年后再公众平台的发言，本栏目尽力保存",
	link: "https://assets.wbavengers.com/Resource/background_imgs/header_main.png",
};

function countText(post: Post): number {
	const body = post.body;
	let total = 0;
	for (const child of body) {
		let num = child.children[0].text.length;
		if (num) {
			total += num;
		}
	}
	return total;
}

function PostHeader({ post }: { post: Post }) {
	const category = post.category
		? post.category.title
		: post.author.name == "刘鑫"
		? "刘鑫声音"
		: "网友声音";

	const select = post.writtenAt ? post.writtenAt : post.publishedAt!;
	const select_date = new Date(select);
	const date_string = getDate(select_date);
	const num_words = countText(post);
	const time = Math.ceil(num_words / 300);
	return (
		<div className="p-5">
			<div className="flex justify-between text-sm border-b-2 pb-2">
				<p className="text-purple-800 font-bold">{category}</p>
				<div className="flex space-x-2 text-gray-500 ">
					<p>{post.author.name}</p>
					<p>|</p>
					<p>{date_string}</p>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex items-center space-x-1 pt-2">
					<div>
						<NewspaperIcon className="w-3" />
					</div>
					<p className="text-xs pr-2">{num_words}字</p>
					<div>
						<ClockIcon className="w-3" />
					</div>
					<p className="text-xs">{time}分钟</p>
				</div>
				<div className="pt-2 flex">
					{post.tags &&
						post.tags.map((tag, index) => {
							const pr = index + 1 == post.tags.length ? 0 : 1;
							return (
								<div
									key={index}
									className={`flex items-center space-x-1 pr-${pr}`}
								>
									<TagIcon className="w-3" />
									<p className="text-xs text-gray-600">
										{tag}
									</p>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}

function PostAbstract({ post }: { post: Post }) {
	return (
		<div>
			<div className="relative px-10 py-5">
				{/* <p className="absolute top-[8px] left-[15%] text-7xl text-purple-300 ">
					“
				</p> */}

				<QuoteLeft className="absolute top-2 left-16 w-12 h-9 fill-purple-300 bg-white" />

				<div className="border-4 px-5 py-5 text-sm text-gray-600 rounded-lg z-20">
					{post.description}
				</div>

				<QuoteRight className="absolute bottom-1 right-16 w-12 h-9 fill-purple-300 bg-white" />
				{/* <p className="absolute bottom-[-32px] left-[80%] text-7xl text-purple-300 ">
					”
				</p> */}
			</div>
			<div className="text-center text-xl font-bold items-center py-2">
				{post.title}
			</div>
		</div>
	);
}

function PostFooter() {
	return (
		<div className="flex justify-center space-x-4 pt-4">
			<div className="flex items-center">
				<HomeIcon className="w-3" />
				<p className="text-xs ">关于本站</p>
			</div>
			<div className="flex items-center">
				<FaceSmileIcon className="w-3" />
				<p className="text-xs ">关于我们</p>
			</div>
			<div className="flex items-center">
				<EnvelopeIcon className="w-3" />
				<p className="text-xs ">联系我们</p>
			</div>
		</div>
	);
}

export default function PostPage({ posts }: { posts: Post[] }) {
	const post = posts[0];
	let header_props = post.author.name == "刘鑫" ? lx_voice : common_voice;

	return (
		<div className="max-w-6xl mx-auto" id="top">
			<Header {...header_props} />

			<div className="bg-gray-100 pb-5">
				<div className="px-2 pt-2">
					<article className="bg-white border border-gray-200 rounded-lg shadow-sm">
						<PostHeader post={post} />
						<PostAbstract post={post} />
						<div className="px-5 pb-5 space-y-5 text-justify">
							<PortableText
								value={post.body!}
								components={LXPortableTextComponents}
							/>
						</div>
						<hr className="mb-4 mx-5 h-[2px] bg-gray-200 rounded border-0 dark:bg-gray-700" />
						<Link href="#top">
							<div className="flex px-5 justify-end mb-3">
								<div className="px-2 py-1 mb-1 rounded-md bg-purple-800 text-white hover:bg-purple-700">
									回到顶部
								</div>
							</div>
						</Link>
					</article>
					<PostFooter />
				</div>
			</div>
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const client = getClient(true);

	const post_query = `
    *[_type=="post"]|order(_updatedAt desc){
      _id, 
      slug,
    }`;

	const posts: Post[] = await client.fetch(post_query);
	const paths = posts.map((post) => {
		return {
			params: {
				uid: post.slug.current,
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
    *[_type=="post"&& slug.current==$slug]{
      _id, 
      _createdAt,
      _updatedAt,
      title, 
      slug,
      author->{
        name,
        imageUrl
      },
      mainImageUrl,
      featured,
      categories,
      tags,
      publishedAt,
      writtenAt,
      description,
      body,
    }
  `;
	const posts: Post[] = await client.fetch(post_query, { slug: params?.uid });
	return {
		props: {
			posts: posts,
		},
	};
};
