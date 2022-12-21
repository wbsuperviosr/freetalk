import { TagIcon } from "@heroicons/react/20/solid";
import { ClockIcon, NewspaperIcon } from "@heroicons/react/24/outline";
import { PortableText } from "@portabletext/react";
import React from "react";
import { LXPortableTextComponents } from "./PortableText";
import { Post } from "../models/postModel";
import { getDate } from "../utils/getDate";
import QuoteLeft from "../public/icons/quote_left.svg";
import QuoteRight from "../public/icons/quote_right.svg";
import Link from "next/link";

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
	const select = post.writtenAt ? post.writtenAt : post.publishedAt!;
	const select_date = new Date(select);
	const date_string = getDate(select_date);
	const num_words = countText(post);
	const time = Math.ceil(num_words / 300);
	const back_url = post.theme == "暖曦话语" ? "/posts" : "/voices";
	return (
		<div className="p-6">
			<div className="flex justify-between text-sm border-b-2 pb-2">
				<div className="flex space-x-2">
					<Link href={back_url}>
						<p className="text-lxd font-bold">{post.theme}</p>
					</Link>
					<p>|</p>
					<p className="text-black font-bold">{post.category}</p>
				</div>
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
				<QuoteLeft className="absolute top-2 left-16 w-12 h-9 fill-lxl bg-white" />

				<div className="border-4 px-5 py-5 text-sm text-gray-600 rounded-lg text-justify z-20">
					{post.description}
				</div>

				<QuoteRight className="absolute bottom-1 right-16 w-12 h-9 fill-lxl bg-white" />
			</div>
			<div className="text-center text-xl font-bold items-center py-6 px-10">
				{post.title}
			</div>
		</div>
	);
}

export default function PostPage({ post }: { post: Post }) {
	const bottomToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="m-2">
			<article className="bg-white border border-gray-200 rounded-lg shadow-sm">
				<PostHeader post={post} />
				<PostAbstract post={post} />
				<div className="px-6 pb-5 space-y-5 text-justify text-base">
					<PortableText
						value={post.body!}
						components={LXPortableTextComponents}
					/>
				</div>
				<hr className="mb-4 mx-5 h-[2px] bg-gray-200 rounded border-0 dark:bg-gray-700" />
				<div className="flex px-5 justify-end mb-3">
					<div
						className="px-[7px] py-[3px] text-[10px] mb-1 rounded-md bg-lxd text-white tracking-[2px] hover:bg-lxd"
						onClick={bottomToTop}
					>
						回到顶部
					</div>
				</div>
			</article>
		</div>
	);
}
