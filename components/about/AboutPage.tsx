import React from "react";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";
import QuoteLeft from "../../public/icons/quote_left.svg";
import QuoteRight from "../../public/icons/quote_right.svg";
import { About } from "../../models/aboutModel";
import { PortableText } from "@portabletext/react";
import { LXPortableTextComponents } from "../../components/PortableText";
import { about_us } from "../HeroText";

function AboutAbstract({ post }: { post: About }) {
	return (
		<div className="pt-5">
			<div className="relative px-10 py-5">
				<QuoteLeft className="absolute top-2 left-16 w-12 h-9 fill-lxl bg-white" />

				<div className="border-4 px-5 py-5 text-sm text-gray-600 rounded-lg text-justify z-20">
					{post.quote}
				</div>

				<QuoteRight className="absolute bottom-1 right-16 w-12 h-9 fill-lxl bg-white" />
			</div>
		</div>
	);
}

export default function AboutPage({
	post,
	button,
	center,
}: {
	post: About;
	button: boolean;
	center?: boolean;
}) {
	const bottomToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	const isCenter = center ? "text-center" : "text-justify";
	return (
		<div className="max-w-6xl mx-auto  bg-gray-100" id="top">
			<Header {...about_us} />
			<div className="m-[10px] bg-white rounded-lg border-[1px] h-full shadow-sm">
				<div className="px-6 mb-7">
					<h1 className="text-center text-gray-500 font-bold mt-7 pb-2 text-xl border-b-2">
						{post.title}
					</h1>
					<h2 className="text-center text-gray-500 mx-6 mt-4">
						{post.subtitle}
					</h2>

					{post.quote && <AboutAbstract post={post} />}

					<div className={`mt-10  space-y-5 ${isCenter} text-[16px]`}>
						<PortableText
							value={post.content}
							components={LXPortableTextComponents}
						/>
					</div>

					{post.footer && (
						<div className="border-b-2 mb-5 pb-5">
							{post.footer.map((foot, index) => {
								return (
									<p
										className="text-right text-sm"
										key={index}
									>
										{foot}
									</p>
								);
							})}
						</div>
					)}

					{button && (
						<div className="flex justify-end">
							<div
								className="px-[7px] py-[3px] text-[14px] mb-1 rounded-md bg-lxd text-white tracking-[2px] hover:bg-lxd"
								onClick={bottomToTop}
							>
								回到顶部
							</div>
						</div>
					)}
				</div>
			</div>

			<Footer />
		</div>
	);
}
