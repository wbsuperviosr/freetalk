import { GetStaticProps } from "next";
import React from "react";
import { getClient } from "../../utils/sanity";
import { About } from "../../models/aboutModel";
import AboutPage from "../../components/about/AboutPage";

export default function IndexAboutPage({ post }: { post: About }) {
	return <AboutPage post={post} button={true} center={false} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient(true);

	const post_query = `
    *[_type=="about" &&!(_id in path("drafts.**"))&& slug.current==$slug][0]
  `;
	const post: About = await client.fetch(post_query, {
		slug: "about_site",
	});
	return {
		props: {
			post: post,
		},
	};
};
