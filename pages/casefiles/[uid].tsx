import { ClockIcon, NewspaperIcon } from "@heroicons/react/24/outline";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import "photoswipe/dist/photoswipe.css";
import React from "react";
import { BsBookmarks, BsCalendar3 } from "react-icons/bs";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header";
import { LXPortableTextComponents } from "../../components/PortableText";
import { CaseFile, ImageUrl } from "../../models/casefilesModel";
import { getDate } from "../../utils/getDate";
import { getClient } from "../../utils/sanity";
import { casfile_text } from "../../components/HeroText";
import { AiOutlineDownload } from "react-icons/ai";
import { RelatedArticleRender } from "../../components/PostPage";

function countText(casefile: CaseFile): number {
	const body = casefile.body;
	let total = 0;
	for (const child of body) {
		let num = child.children[0].text.length;
		if (num) {
			total += num;
		}
	}
	return total;
}

function infer_image_size(image_url: ImageUrl) {
	let height;
	let width;

	height = image_url.height
		? image_url.height
		: Number(image_url.urlField.match(/height=[0-9]+/g)![0].split("=")[1]);
	width = image_url.width
		? image_url.width
		: Number(image_url.urlField.match(/width=[0-9]+/g)![0].split("=")[1]);
	return [height, width];
}

function ImageGallery({ image_urls }: { image_urls: ImageUrl[] }) {
	const smallItemStyles: React.CSSProperties = {
		cursor: "pointer",
		objectFit: "cover",
		width: "150px",
		height: "150px",
		maxHeight: "100%",
	};

	return (
		image_urls && (
			<Gallery>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(3, 2fr)",
						gridGap: 10,
					}}
				>
					{image_urls.map((image_url, index) => {
						const [height, width] = infer_image_size(image_url);
						return (
							<Item
								cropped
								original={image_url.urlField}
								thumbnail={image_url.urlField}
								width={width}
								height={height}
								key={index}
							>
								{({ ref, open }) => (
									<img
										style={smallItemStyles}
										src={image_url.urlField}
										ref={
											ref as React.MutableRefObject<HTMLImageElement>
										}
										onClick={open}
										alt={image_url.url_title}
									/>
								)}
							</Item>
						);
					})}
				</div>
			</Gallery>
		)
	);
}

function CaseBody({ casefile }: { casefile: CaseFile }) {
	const select = casefile.writtenAt
		? casefile.writtenAt
		: casefile.publishedAt!;
	const select_date = new Date(select);
	const date_string = getDate(select_date);
	const num_words = countText(casefile);
	const time = Math.ceil(num_words / 300);
	const headers = casefile.header && casefile.header.split("\n");
	const bottomToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="m-[10px] bg-white rounded-lg">
			<div className="p-[22px]">
				<div className="text-center border-b-2">
					<div className="flex justify-between items-center pb-2">
						<div className="flex items-center space-x-2">
							<Link href="/casefiles">
								<p className="text-lxd text-[14px]">卷宗</p>
							</Link>
							<p>|</p>
							<p className="text-[14px]">
								{casefile.classification}
							</p>
						</div>

						<div className="flex">
							<BsCalendar3 className="w-3" />
							<p className="text-xs pl-1">{date_string}</p>
						</div>
					</div>
				</div>

				<div className="flex justify-between items-center space-x-1 pt-2 mb-2">
					<div className="flex items-center">
						<div>
							<NewspaperIcon className="w-3" />
						</div>
						<p className="text-xs pr-2">{num_words}字</p>
						<div>
							<ClockIcon className="w-3" />
						</div>
						<p className="text-xs pr-2">{time}分钟</p>
						<div>
							<AiOutlineDownload className="w-4 text-lxd" />
						</div>
						<p className="text-xs text-lxd pr-2">
							<a
								href={`https://assets.wbavengers.com/6部分卷宗/${casefile.order}${casefile.title}.pdf`}
							>
								下载
							</a>
						</p>
					</div>
					<div className="flex space-x-2">
						{casefile.tags &&
							casefile.tags.map((tag, index) => {
								return (
									<div
										className="flex items-center"
										key={index}
									>
										<BsBookmarks className="w-3" />
										<p className="text-lxd text-[10px]">
											{tag}
										</p>
									</div>
								);
							})}
					</div>
				</div>

				<div className="grid grid-rows-2 justify-items-center space-y-3 pt-10">
					<span className="text-lg font-bold border-b-2 pb-2">
						{casefile.title}
					</span>
					{/* <hr className="h-[2px] w-32 bg-slate-200 mx-[20%]" /> */}
					<span className=" text-gray-500 border-b-2 pb-2">
						{casefile.description}
					</span>
				</div>

				{headers && (
					<div className="border-[1px] rounded-lg border-gray-300 w-60 mx-auto py-5 px-5 my-10">
						{headers.map((header, index) => {
							return (
								<p
									key={index}
									className={`text-center ${
										header == "" ? "pb-4" : ""
									}`}
								>
									{header}
								</p>
							);
						})}
					</div>
				)}

				<div className="pb-5 space-y-3 text-justify">
					<PortableText
						value={casefile.body!}
						components={LXPortableTextComponents}
					/>
				</div>

				<ImageGallery image_urls={casefile.image_urls} />

				{casefile.related && (
					<RelatedArticleRender related={casefile.related} />
				)}

				<hr className="mb-4 mt-5 h-[2px] bg-gray-200 rounded border-0 dark:bg-gray-700" />
				<div className="flex justify-end mb-3">
					<div
						className="px-[7px] py-[3px] text-[14px] mb-1 rounded-md bg-lxd text-white tracking-[2px] hover:bg-lxd"
						onClick={bottomToTop}
					>
						回到顶部
					</div>
				</div>
			</div>
		</div>
	);
}

export default function CaseFilePost({ casefiles }: { casefiles: CaseFile[] }) {
	return (
		<div className="bg-gray-100">
			<Header {...casfile_text} />
			{casefiles.map((casefile, index) => {
				return <CaseBody casefile={casefile} key={index} />;
			})}
			<Footer />
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const client = getClient(true);

	const post_query = `
    *[_type=="casefiles"&&!(_id in path("drafts.**"))]|order(_updatedAt desc){
      _id, 
      slug,
    }`;

	const casefiles: CaseFile[] = await client.fetch(post_query);
	const paths = casefiles.map((casefile) => {
		return {
			params: {
				uid: casefile.slug.current,
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
    *[_type=="casefiles" &&!(_id in path("drafts.**"))&& slug.current==$slug]
  `;
	const casefiles: CaseFile[] = await client.fetch(post_query, {
		slug: params?.uid,
	});
	return {
		props: {
			casefiles: casefiles,
		},
	};
};
