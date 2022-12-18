import { GetStaticProps } from "next";
import React from "react";
import AboutPage from "../../components/about/AboutPage";
import { About } from "../../models/aboutModel";
import { getClient } from "../../utils/sanity";

function ContactUs({ post }: { post: About }) {
	return <AboutPage post={post} button={false} center={true} />;
}

export default ContactUs;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient(true);

	const post_query = `
    *[_type=="about"&& slug.current==$slug][0]
  `;
	const post: About = await client.fetch(post_query, {
		slug: "contact",
	});
	return {
		props: {
			post: post,
		},
	};
};
