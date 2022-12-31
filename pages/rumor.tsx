import { GetStaticProps } from "next";
import React from "react";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import { Rumor, RumorImage, RumorPost } from "../models/rumorModel";
import { getDate } from "../utils/getDate";
import { getClient } from "../utils/sanity";
import {
	AiOutlineDown,
	AiOutlineUp,
	AiOutlineUser,
	AiOutlineShareAlt,
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { rumor_text } from "../components/HeroText";
import { ListHeader } from "../components/ListHeader";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

type RumorDetailProps = {
	text: string;
	people: string[];
	images?: RumorImage[];
	posts?: RumorPost[];
};

function RumorDetail({ text, people, images, posts }: RumorDetailProps) {
	const [postOpen, setPostOpen] = React.useState(false);

	const htmlString = (url: string) => {
		let src = "";
		const domain = "https://assets.wbavengers.com/";
		if (url.startsWith("https")) {
			src = `<img src="${url}"/>`;
		} else {
			if (url.endsWith("mp4")) {
				src = `
				<video controls>
					<source src='${domain}${url}' type="video/mp4" />
				</video>
				`;
			} else {
				src = `
				<img src="${domain}${url}"/>
				`;
			}
		}

		const html_string = `
			<div style="
			color: white;
			display: flex;
			place-content: center;
			flex-direction: column;
			height: 100%;
			widht:100%,
			text-align: center;
			">
			${src}
			</div>
			`;
		return html_string;
	};
	return (
		<div className="bg-gray-200 rounded-md">
			<div className="text-sm p-3 border-b-2 border-white">
				{text.split("\n").map((p, index) => (
					<p className="pb-1" key={index}>
						{p}
					</p>
				))}
			</div>
			<div className="p-3">
				{people && (
					<div className="flex items-center space-x-1">
						<AiOutlineUser className="w-3" />
						{people.map((p, index) => {
							return (
								<p className="text-sm text-lxd" key={index}>
									{p}
								</p>
							);
						})}
					</div>
				)}
				{images && images.length != 0 && (
					<div className="flex items-center space-x-1">
						<IoImageOutline className="w-3" />
						<Gallery>
							{images.map((image, index) => {
								return image.width ? (
									<Item
										key={index}
										original={image.urlField}
										thumbnail={image.urlField}
										width={image.width}
										height={image.height}
									>
										{({ ref, open }) => (
											<a
												href="#"
												onClick={(e) => {
													e.preventDefault();
													open(e);
												}}
												ref={
													ref as React.MutableRefObject<HTMLAnchorElement>
												}
											>
												{index == 0 && (
													<p className="text-sm text-lxd">
														点击查看媒体资料
													</p>
												)}
											</a>
										)}
									</Item>
								) : (
									<Item
										key={index}
										html={htmlString(image.urlField)}
									>
										{({ ref, open }) => (
											<a
												href="#"
												onClick={(e) => {
													e.preventDefault();
													open(e);
												}}
												ref={
													ref as React.MutableRefObject<HTMLAnchorElement>
												}
											>
												{index == 0 && (
													<p className="text-sm text-lxd">
														点击查看媒体资料
													</p>
												)}
											</a>
										)}
									</Item>
								);
							})}
						</Gallery>
					</div>
				)}
				{posts && posts.length != 0 && (
					<div
						className="flex items-center space-x-1"
						onClick={() => setPostOpen(!postOpen)}
					>
						<AiOutlineShareAlt className="w-3" />
						<p className="text-sm text-lxd">点击展开文章链接</p>
					</div>
				)}
				{postOpen && (
					<div className="block pl-5">
						<ul className="list-disc list-inside">
							{posts!.map((post, index) => {
								return (
									<li key={index}>
										<a
											href={post.urlField}
											target="_blank"
											rel="noopener noreferrer"
										>
											<span className="text-lxd text-xs">
												{post.url_title}
											</span>
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

function RumorItem({ rumor }: { rumor: Rumor }) {
	const [rumorOpen, setRumorOpen] = React.useState(false);
	const [truthOpen, setTruthOpen] = React.useState(false);

	const handleTab = (handle: string) => {
		if (handle === "rumor") {
			if (!rumorOpen && truthOpen) {
				setTruthOpen(false);
				setRumorOpen(true);
			} else {
				setRumorOpen(!rumorOpen);
			}
		} else {
			if (!truthOpen && rumorOpen) {
				setTruthOpen(true);
				setRumorOpen(false);
			} else {
				setTruthOpen(!truthOpen);
			}
		}
	};

	return (
		<div className="mx-7 py-1 pb-3">
			<div className="flex border-b-2 pb-1 items-center space-x-2">
				<div className="w-5">
					<div className="w-4 h-4 bg-lxl rounded-full"></div>
				</div>
				<div className="text-[15px] flex-wrap">
					{rumor.question}
					{rumor.question.endsWith("？") ? "" : "?"}
				</div>
			</div>
			<div className="flex justify-between pt-1">
				<div className="flex space-x-3">
					<div
						className={`flex items-center rounded-t-md p-1 space-x-1 ${
							rumorOpen ? "bg-gray-200" : ""
						}`}
						onClick={() => handleTab("rumor")}
					>
						<p className="text-xs">流传谣言</p>
						{rumorOpen ? (
							<AiOutlineUp className="w-3" />
						) : (
							<AiOutlineDown className="w-3" />
						)}
					</div>
					<div
						className={`flex items-center rounded-t-md p-1 space-x-1 ${
							truthOpen ? "bg-gray-200" : ""
						}`}
						onClick={() => handleTab("truth")}
					>
						<p className="text-xs">事实真相</p>
						{truthOpen ? (
							<AiOutlineUp className="w-3" />
						) : (
							<AiOutlineDown className="w-3" />
						)}
					</div>
				</div>
				<div className="flex space-x-2 py-1">
					{rumor.tags &&
						rumor.tags.map((tag, index) => {
							return (
								<div className="flex space-x-1" key={index}>
									<BsBookmark className="w-3" />
									<p className="text-xs text-lxd">{tag}</p>
								</div>
							);
						})}
				</div>
			</div>
			{truthOpen && (
				<RumorDetail
					text={rumor.truth}
					people={rumor.rumor_victim}
					posts={rumor.truth_posts}
					images={rumor.truth_images}
				/>
			)}
			{rumorOpen && (
				<RumorDetail
					text={rumor.rumor}
					people={rumor.rumor_spreader}
					posts={rumor.rumor_posts}
					images={rumor.rumor_images}
				/>
			)}
		</div>
	);
}

function RumorList({ rumors }: { rumors: Rumor[] }) {
	return (
		<div className="bg-white m-[10px] rounded-lg border-[1px] shadow-sm">
			<div className="container py-5">
				{rumors.map((rumor, index) => {
					return <RumorItem key={index} rumor={rumor} />;
				})}
			</div>
		</div>
	);
}

function RumorPage({ rumors }: { rumors: Rumor[] }) {
	const list_header = {
		title: "谣言合集与澄清",
		description:
			"本站对网友整理收集的谣言澄清进行排版展示。本章节会一直持续更新，也希望各位网友踊跃参与进来，欢迎各位点击下方按钮分享你的证据。我们会定期收录。",
		last_update: getDate(new Date(rumors[rumors.length - 1]._updatedAt)),
		menus: undefined,
		show_active: false,
		post_link: "https://wj.qq.com/s2/11424512/e925",
	};

	return (
		<div className="bg-gray-100">
			<Header {...rumor_text} />
			{/* <RumorHeader rumors={rumors} /> */}
			<ListHeader {...list_header} />
			<RumorList rumors={rumors} />
			<Footer />
		</div>
	);
}

export default RumorPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient(true);

	const post_query = `
    *[_type=="rumor"]
    `;
	const rumors: Rumor[] = await client.fetch(post_query);

	return {
		props: {
			rumors: rumors,
		},
	};
};
