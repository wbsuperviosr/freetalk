import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { Post } from "../../models/postModel";
import { getClient } from "../../utils/sanity";
import { Footer } from "../../components/Footer";
import PostPage from "../../components/PostPage";

const lx_voice = {
	title: "「暖曦话语」",
	text: [
		"我就像时代的一粒沙,卑微到尘埃里",
		"任何人都可以肆意书法她们的道德优越感",
	],
	subtext: "刘鑫/刘暖曦自2016年后再公众平台的发言，本栏目尽力保存",
	link: "https://am3pap007files.storage.live.com/y4mY4gTdVuVqypLTsY-oM55RW9Hffh6npwbsgRfkvX6VT_OjaAbUgrYKj2qlXsMVIAq5falE6MzMKVHqEIscCYLQIuGBdy_cDK-fpA654R1ss2b3bXlOhZqvRr_oKKUs9DdiND9S6s_9bRAGNCFQ5TX4d327x4oH7qHMdvKuFQ1vmW26NwrkqwlIexU5oFJY_0_?width=860&height=460&cropmode=none",
};

export default function PostsPage({ posts }: { posts: Post[] }) {
	const post = posts[0];

	return (
		<div className="max-w-6xl mx-auto" id="top">
			<Header {...lx_voice} />
			<PostPage post={post} />
			<Footer />
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
      category,
      tags,
	  theme,
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
