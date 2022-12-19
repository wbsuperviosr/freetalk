import { GetStaticProps } from "next";
import React from "react";
import AboutPage from "../../components/about/AboutPage";
import { About } from "../../models/aboutModel";
import { getClient } from "../../utils/sanity";

function AboutUs({ post }: { post: About }) {
	return <AboutPage post={post} button={false} center={true} />;
}

export default AboutUs;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient(true);

	const post_query = `
    *[_type=="about" &&!(_id in path("drafts.**"))&& slug.current==$slug][0]
  `;
	const post: About = await client.fetch(post_query, {
		slug: "about_us",
	});
	return {
		props: {
			post: post,
		},
	};
};
