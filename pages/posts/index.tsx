import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header";
import {
	DropDownProps,
	DropDownSelect,
	makeDropDownMenu,
} from "../../components/menu/DropDownSelect";
import {
	calcMapSum,
	getCurrentSelectString,
} from "../../components/menu/utils";
import { Post } from "../../models/postModel";
import { getDate } from "../../utils/getDate";
import { getClient } from "../../utils/sanity";

const nuanxi = {
	title: "「暖曦话语」",
	text: [
		"我被掩藏过，打败过，我叶充满着针扎和无奈",
		"现在只希望网友也能通过我了解事情的另一面",
	],
	subtext: "这里是自2017年5月七刘鑫再网上尽力留下的声音",
	link: "https://am3pap007files.storage.live.com/y4mY4gTdVuVqypLTsY-oM55RW9Hffh6npwbsgRfkvX6VT_OjaAbUgrYKj2qlXsMVIAq5falE6MzMKVHqEIscCYLQIuGBdy_cDK-fpA654R1ss2b3bXlOhZqvRr_oKKUs9DdiND9S6s_9bRAGNCFQ5TX4d327x4oH7qHMdvKuFQ1vmW26NwrkqwlIexU5oFJY_0_?width=860&height=460&cropmode=none",
};

function getUniqueYear(posts: Post[]) {
	const years = new Set<string>(
		posts.map((post) => {
			return `${new Date(post.writtenAt).getFullYear()}`;
		})
	);
	return Array.from(years).sort();
}

function inferTarget(
	post: Post,
	yearState: Map<string, boolean>,
	classState: Map<string, boolean>
) {
	let isTarget = true;
	const yearTrues = calcMapSum(yearState);
	const classTrues = calcMapSum(classState);

	if (yearTrues !== 0) {
		const currentYear = `${new Date(post.writtenAt).getFullYear()}`;
		if (!yearState.get(currentYear)) {
			isTarget = false;
		}
	}

	if (classTrues !== 0) {
		if (!classState.get(post.category)) {
			isTarget = false;
		}
	}
	return isTarget;
}

function PostDetail({
	post,
	years,
	classes,
}: {
	post: Post;
	years: DropDownProps;
	classes: DropDownProps;
}) {
	const isTarget = inferTarget(
		post,
		years.options.state,
		classes.options.state
	);
	return (
		<>
			{isTarget && (
				<div className="m-[10px] bg-white rounded-lg shadow-sm">
					<div className="p-6">
						<div className="flex space-x-2 border-b-2 pb-2">
							<p className="text-lxd ">{post.category}</p>
							<p>|</p>
							<p>{getDate(new Date(post.writtenAt))}</p>
						</div>

						<div className="flex pt-3 space-x-2">
							{post.mainImageUrl && (
								<img
									src={post.mainImageUrl}
									alt=""
									className="basis-1/4 object-cover w-1/4 rounded-md grayscale-[70%]"
								></img>
							)}

							<div
								className={`${
									post.mainImageUrl ? "basis-3/4" : "w-full"
								}`}
							>
								<Link href={`posts/${post.slug.current}`}>
									<p className="text-lxd">{post.title}</p>
								</Link>
								<p className="text-xs pt-1 text-justify">
									{post.description}
								</p>
								<Link href={`posts/${post.slug.current}`}>
									<div className="flex pt-1 justify-end">
										<div className="px-[7px] py-[3px] text-[10px] rounded-md bg-lxd text-white tracking-[2px] hover:bg-lxd">
											阅读全文
										</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

function PostList({
	posts,
	years,
	classes,
}: {
	posts: Post[];
	years: DropDownProps;
	classes: DropDownProps;
}) {
	return (
		<div>
			{posts.map((post) => {
				return (
					<PostDetail post={post} years={years} classes={classes} />
				);
			})}
		</div>
	);
}

function PostHeader({
	posts,
	years,
	classes,
}: {
	posts: Post[];
	years: DropDownProps;
	classes: DropDownProps;
}) {
	const isActive =
		calcMapSum(years.options.state) + calcMapSum(classes.options.state);
	return (
		<div className="m-[10px] bg-white rounded-lg shadow-sm">
			<div className="text-center pt-7">
				<div className="bg-lxd text-white">
					刘鑫在过去和现在所有社交平台的发言
				</div>
				<div className="bg-freeze text-sm">
					最后更新:{getDate(new Date(posts[0]._updatedAt))}
				</div>
				<div className="p-6">
					<p className="text-sm text-justify">
						这里是自2017年5月七刘鑫再网上尽力留下的声音。感谢各位网友的热心整理贡献，本栏目会持续更新，也希望大家踊跃投稿。您可以通过下方按钮对文章进行筛选阅读
					</p>
					<div className="border-2 my-5 py-2 border-gray-300 rounded-lg flex justify-between px-10">
						<DropDownSelect menu={years} />
						<DropDownSelect menu={classes} />
					</div>
					{isActive !== 0 && (
						<div className="text-xs">
							<span className="font-bold">当前展示：</span>
							{getCurrentSelectString([years, classes])}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function Posts({ posts }: { posts: Post[] }) {
	const yearsList = getUniqueYear(posts);
	const years = makeDropDownMenu(
		"时间",
		<CalendarDaysIcon className="w-3" />,
		yearsList
	);
	const classes = makeDropDownMenu("类别", <BiCategory className="w-3" />, [
		"过往残篇",
		"今时尽言",
	]);
	return (
		<div className="max-w-7xl mx-auto bg-gray-100">
			<Header {...nuanxi} />
			<PostHeader posts={posts} years={years} classes={classes} />
			<PostList posts={posts} years={years} classes={classes} />
			<Footer />
		</div>
	);
}

export default Posts;

export const getStaticProps: GetStaticProps = async (context) => {
	const client = getClient(true);

	const post_query = `
    *[_type=="post" &&!(_id in path("drafts.**"))]|order(writtenAt desc){
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
      category,
      tags,
      publishedAt,
      writtenAt,
      description
    }
  `;

	const posts: Post[] = await client.fetch(post_query);

	return {
		props: {
			posts: posts,
		},
	};
};
