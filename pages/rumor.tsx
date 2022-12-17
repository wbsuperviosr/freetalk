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
import FsLightbox from "fslightbox-react";

const rumor_texts = {
	title: "「江刘之案」",
	text: [
		"一场对幸存者和证人的猎巫围剿",
		"然而真相必然具备绝对的力量，长存不灭",
	],
	subtext:
		"江秋莲诉刘鑫生命权纠纷案在公众平台、媒体的重要发布，本栏目尽力保存",
	link: "https://am3pap007files.storage.live.com/y4mrQYXPK0wzkCTllrL1t052m_p4B9ILnOE5793RgUsEtrfwfpZEulDim8xljELSTBcdy0t4yCXVxk1kCQ2augpQxMlA_Or54EpA3qvq1V7PFaPmvqr-3lolzzN1BcN2QLdvY606SqMXscShYWiUg9HaVBU0jroxFbwnZ9iDhcZrtVwxzseQu4VuPTMYvTjM6YS?width=1920&height=460&cropmode=none",
};

type RumorDetailProps = {
	text: string;
	people: string;
	images?: RumorImage[];
	posts?: RumorPost[];
};

function RumorDetail({ text, people, images, posts }: RumorDetailProps) {
	const image_urls =
		images &&
		images.map((image) => {
			return image.urlField;
		});
	const [imageOpen, setImageOpen] = React.useState(false);
	const [postOpen, setPostOpen] = React.useState(false);
	return (
		<div className="bg-gray-200 rounded-md">
			<div className="text-sm p-3 border-b-2 border-white">{text}</div>
			<div className="p-3">
				<div className="flex items-center space-x-1">
					<AiOutlineUser className="w-3" />
					<p className="text-sm text-lxd">{people}</p>
				</div>
				{images && (
					<div
						className="flex items-center space-x-1"
						onClick={() => setImageOpen(!imageOpen)}
					>
						<IoImageOutline className="w-3" />
						<p className="text-sm text-lxd">点击查看图片</p>
						<FsLightbox toggler={imageOpen} sources={image_urls} />
					</div>
				)}
				{posts && (
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
							{posts!.map((post) => {
								return (
									<li>
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
		<div className="mx-7 py-1">
			<div className="border-b-2 pb-1">
				{rumor.question}
				{rumor.question.endsWith("?") ? "" : "?"}
			</div>
			<div className="flex justify-between pt-2">
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
				{rumors.map((rumor) => {
					return <RumorItem rumor={rumor} />;
				})}
			</div>
			{/* <RumorItem rumor={rumors[0]} /> */}
		</div>
	);
}

function RumorHeader({ rumors }: { rumors: Rumor[] }) {
	return (
		<div className="m-[10px] bg-white rounded-lg border-[1px] shadow-sm">
			<div className="text-center pt-5 flow-row">
				<p className="bg-lxd text-white items-center text-[16px] tracking-[2.1px]">
					谣言合集与澄清
				</p>
				<p className="bg-freeze font-bold text-[12px] h-5 pt-[2px] ">
					最后更新:
					{getDate(new Date(rumors[rumors.length - 1]._updatedAt))}
				</p>
			</div>

			<div className="mx-8 py-5">
				<p className="tracking-[1.8px] text-[14px] text-justify">
					本站对网友整理收集的谣言澄清进行排版展示。本章节会一直持续更新，也希望各位网友踊跃参与进来，欢迎各位到@七_叶_
					（微博搜索）置顶微博下方留言分享你的证据。我们会定期收录。
				</p>
			</div>
		</div>
	);
}

function RumorPage({ rumors }: { rumors: Rumor[] }) {
	return (
		<div className="bg-gray-100">
			<Header {...rumor_texts} />
			<RumorHeader rumors={rumors} />
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
