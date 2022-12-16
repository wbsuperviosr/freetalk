import Header from "../components/Header";
import { GetStaticProps } from "next";
import { Category, Post } from "../models/sanityModel";
import { getClient } from "../utils/sanity";
import fs from "fs";
import PostSlider from "../components/index/PostSlider";
import CaseView from "../components/index/CaseView";
import { Footer } from "../components/Footer";

const heropros = {
	title: "「九纸书笺」",
	text: ["所有的事情有因必有果。", "大家只看了结果，且结果只是一面之词"],
	subtext:
		"我们尽可能地保存那些微弱的声音，那些隐蔽的细节。历史的夜空中，任何一粒星屑，都有它被凝视的意义",
	link: "https://assets.wbavengers.com/Resource/background_imgs/header_main.png",
};

const Home = ({ posts }: { posts: Post[] }) => {
	return (
		<div className="max-w-7xl mx-auto">
			<Header {...heropros}></Header>
			<div className="bg-gray-100">
				<PostSlider posts={posts} />
				<CaseView />
				<Footer />
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const client = getClient(true);

	const post_query = `
    *[_type=="post" && featured&&!(_id in path("drafts.**"))]|order(_updatedAt desc){
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
      category->{
        title
      },
      subcategory->{
        title
      },
      tags,
      publishedAt,
      writtenAt,
      description
    }
  `;
	const category_query = `
    *[_type=="category"&&!(_id in path("drafts.**"))]|order(order asc){
      title, slug, _id,
      subcategory[]->{
        _id,
        slug,
		order,
        title
      }
    }
  `;

	const headlinePosts: Post[] = await client.fetch(post_query);
	const categories: Category[] = await client.fetch(category_query);

	fs.writeFile("categories.json", JSON.stringify(categories), (e) => {
		console.log(e);
	});

	return {
		props: {
			posts: headlinePosts,
		},
	};
};

export default Home;
