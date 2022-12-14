import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { getClient } from "../../utils/sanity";
import { CaseFile } from "../../models/casefilesModel";
import { getDate } from "../../utils/getDate";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { ClockIcon, NewspaperIcon } from "@heroicons/react/24/outline";
import { BsCalendar3 } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { PortableText } from "@portabletext/react";
import { LXPortableTextComponents } from "../../components/PortableText";

const casfile_header = {
	title: "「部分卷宗」",
	text: ["有缘见到的仅有这些，", "也已经说明了许多"],
	subtext: "2016年日本留学生被害案部分卷宗，本栏目尽力保存",
	link: "https://images.pexels.com/photos/3720483/pexels-photo-3720483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};

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

function CaseBody({ casefile }: { casefile: CaseFile }) {
	const select = casefile.writtenAt
		? casefile.writtenAt
		: casefile.publishedAt!;
	const select_date = new Date(select);
	const date_string = getDate(select_date);
	const num_words = countText(casefile);
	const time = Math.ceil(num_words / 300);

	return (
		<div className="m-4 bg-white rounded-lg">
			<div className="text-center border-b-2">
				<p className="text-lg font-bold">{casefile.title}</p>
				<p className="text-gray-500">{casefile.description}</p>
				<div className="flex justify-between px-2">
					<div className="flex">
						<BsCalendar3 className="w-3" />
						<p className="text-xs pl-1">{date_string}</p>
					</div>
					<div className="flex">
						<BiCategory className="w-3" />
						<p className="text-xs pl-1">
							{casefile.classification}
						</p>
					</div>
				</div>
			</div>
			<div className="flex items-center space-x-1 px-2 pt-2">
				<div>
					<NewspaperIcon className="w-3" />
				</div>
				<p className="text-xs pr-2">{num_words}字</p>
				<div>
					<ClockIcon className="w-3" />
				</div>
				<p className="text-xs">{time}分钟</p>
			</div>

			<div className="px-2 pb-5 pt-3 space-y-3 text-justify">
				<PortableText
					value={casefile.body!}
					components={LXPortableTextComponents}
				/>
			</div>

			{casefile.image_urls &&
				casefile.image_urls.map((image_url) => {
					return (
						<img
							src={image_url.urlField}
							alt={image_url.url_title}
							className="border-[1px] border-gray-200"
						/>
					);
				})}
		</div>
	);
}

export default function CaseFilePost({ casefiles }: { casefiles: CaseFile[] }) {
	console.log(casefiles);
	return (
		<div className="bg-gray-100">
			<Header {...casfile_header} />
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
    *[_type=="casefiles"]|order(_updatedAt desc){
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
    *[_type=="casefiles"&& slug.current==$slug]
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
