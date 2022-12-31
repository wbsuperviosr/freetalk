import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header";
import {
	DropDownProps,
	makeDropDownMenu,
} from "../../components/menu/DropDownSelect";
import { inferTarget } from "../../components/menu/utils";
import { Post } from "../../models/postModel";
import { getDate } from "../../utils/getDate";
import { getClient } from "../../utils/sanity";
import { nuanxi_voice } from "../../components/HeroText";
import { limit_text } from "../../utils/limitText";
import { ListHeader } from "../../components/ListHeader";
import { unique } from "../../utils/ArrayOps";

function PostDetail({ post, menus }: { post: Post; menus: DropDownProps[] }) {
	const isTarget = inferTarget(post, menus);
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
									{limit_text(post.description)}
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

function PostList({ posts, menus }: { posts: Post[]; menus: DropDownProps[] }) {
	return (
		<div>
			{posts.map((post, index) => {
				return <PostDetail post={post} menus={menus} key={index} />;
			})}
		</div>
	);
}

function Posts({ posts }: { posts: Post[] }) {
	const getYear = (post: Post) => `${new Date(post.writtenAt).getFullYear()}`;

	const yearsList = unique(posts, getYear);
	const years = makeDropDownMenu(
		"时间",
		<CalendarDaysIcon className="w-3" />,
		yearsList,
		getYear
	);
	const classes = makeDropDownMenu(
		"类别",
		<BiCategory className="w-3" />,
		["过往残篇", "今时尽言"],
		(post) => post.category
	);

	const list_header = {
		title: "刘鑫在过去和现在所有社交平台的发言",
		description:
			"这里是自2017年5月起刘鑫在网上尽力留下的声音。感谢各位网友的热心整理贡献，本栏目会持续更新，也希望大家踊跃投稿。您可以通过下方按钮对文章进行筛选阅读",
		last_update: getDate(new Date(posts[0]._updatedAt)),
		menus: [years, classes],
		show_active: true,
	};

	return (
		<div className="max-w-7xl mx-auto bg-gray-100">
			<Header {...nuanxi_voice} />
			<ListHeader {...list_header} />
			<PostList posts={posts} menus={[years, classes]} />
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
