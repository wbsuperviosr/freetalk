import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";

import { Post } from "../../models/postModel";

import { getClient } from "../../utils/sanity";

import { Footer } from "../../components/Footer";
import PostPage from "../../components/PostPage";
import { common_voice } from "../../components/HeroText";

export default function VoicePage({ posts }: { posts: Post[] }) {
	const post = posts[0];
	return (
		<div className="max-w-6xl mx-auto bg-gray-100">
			<Header {...common_voice} />
			<PostPage post={post} />
			<Footer />
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const client = getClient(true);

	const post_query = `
    *[_type=="voice"&&!(_id in path("drafts.**"))]|order(_updatedAt desc){
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
    *[_type=="voice"&&!(_id in path("drafts.**"))&& slug.current==$slug]{
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
	  theme,
      category,
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
