import Header from "../components/Header";
import { GetStaticProps } from "next";
import { Post } from "../models/postModel";
import { getClient } from "../utils/sanity";
import PostSlider from "../components/index/PostSlider";
import CaseView from "../components/index/CaseView";
import { Footer } from "../components/Footer";
import VoiceSection from "../components/index/VoiceSection";
import { home_text } from "../components/HeroText";

const Home = ({
	posts,
	liuxin,
	viewer,
}: {
	posts: Post[];
	liuxin: VoiceQResult;
	viewer: VoiceQResult;
}) => {
	const liuxin_section = {
		title: "暖曦话语",
		subtitle: "刘鑫所有的过往至今发言收录",
		section_slug: "/posts",
		update: liuxin._updatedAt,
		post_title: liuxin.title,
		post_summary: liuxin.description,
		slug: liuxin.slug.current,
		author: undefined,
		picture:
			"https://am3pap007files.storage.live.com/y4mY4gTdVuVqypLTsY-oM55RW9Hffh6npwbsgRfkvX6VT_OjaAbUgrYKj2qlXsMVIAq5falE6MzMKVHqEIscCYLQIuGBdy_cDK-fpA654R1ss2b3bXlOhZqvRr_oKKUs9DdiND9S6s_9bRAGNCFQ5TX4d327x4oH7qHMdvKuFQ1vmW26NwrkqwlIexU5oFJY_0_?width=860&height=460&cropmode=none",
	};

	const viewer_section = {
		title: "观者评说",
		subtitle: "社会大众的探讨发言收录",
		section_slug: "/voices",
		update: viewer._updatedAt,
		post_title: viewer.title,
		post_summary: viewer.description,
		slug: viewer.slug.current,
		author: viewer.author.name,
		picture:
			"https://images.pexels.com/photos/167080/pexels-photo-167080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	};
	return (
		<div className="max-w-7xl mx-auto">
			<Header {...home_text}></Header>
			<div className="bg-gray-100">
				<PostSlider posts={posts} />
				<CaseView />
				<VoiceSection {...liuxin_section} />
				<VoiceSection {...viewer_section} />
				<Footer />
			</div>
		</div>
	);
};

type VoiceQResult = {
	_updatedAt: string;
	description: string;
	title: string;
	slug: { current: string };
	author: { name: string };
};

export const getStaticProps: GetStaticProps = async (context) => {
	const client = getClient(true);

	const post_query = `
    *[_type==$type && featured&&!(_id in path("drafts.**"))]|order(_updatedAt desc){
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
    }[0..2]
  `;

	const liuxin_vocie_query = `
    *[_type=="post"&&!(_id in path("drafts.**"))]{
      title,
      slug,
      author->{name},
      description,
      _updatedAt
      }[0]
  `;
	const viewer_vocie_query = `
    *[_type=="voice"&&!(_id in path("drafts.**"))]{
      title,
      slug,
      author->{name},
      description,
      _updatedAt
      }[0]
  `;

	const headlinePosts1: Post[] = await client.fetch(post_query, {
		type: "post",
	});
	const headlinePosts2: Post[] = await client.fetch(post_query, {
		type: "voice",
	});
	const headlinePosts = headlinePosts1.concat(headlinePosts2);
	const liuxin: VoiceQResult = await client.fetch(liuxin_vocie_query);
	const viewer: VoiceQResult = await client.fetch(viewer_vocie_query);

	return {
		props: {
			posts: headlinePosts,
			liuxin: liuxin,
			viewer: viewer,
		},
	};
};

export default Home;
