import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { getClient } from "../../utils/sanity";
import { CaseFile } from "../../models/casefilesModel";
import { getDate } from "../../utils/getDate";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import {
	getCurrentSelectString,
	inferTarget,
} from "../../components/menu/utils";
import {
	DropDownProps,
	makeDropDownMenu,
} from "../../components/menu/DropDownSelect";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { BiCategory } from "react-icons/bi";
import { casfile_text } from "../../components/HeroText";
import { ListHeader } from "../../components/ListHeader";
import { sum, unique } from "../../utils/ArrayOps";

function CaseCard({
	casefile,
	menus,
}: {
	casefile: CaseFile;
	menus: DropDownProps[];
}) {
	const isTarget = inferTarget(casefile, menus);
	return (
		<>
			{isTarget && (
				<Link href={`/casefiles/${casefile.slug.current}`}>
					<div className="flex bg-white py-3 justify-between rounded-lg shadow-sm">
						<div className="overflow-hidden">
							<div className="flex items-center space-x-3">
								<div className="w-7 h-[2px] bg-freeze"></div>
								<div className="w-4 h-4 bg-lxl rounded-full"></div>
								<p className="text-md font-bold text-lxd">
									{casefile.title}
								</p>
							</div>
							<p className="text-black">
								{casefile.classification}
							</p>
							<p className=" text-gray-600 text-sm flex-wrap">
								{casefile.description}
							</p>
						</div>
						{casefile.mainImageUrl && (
							<img
								src={casefile.mainImageUrl}
								alt={casefile.title}
								className="w-20 max-h-20 ml-2 object-cover grayscale-[50%]"
							/>
						)}
					</div>
				</Link>
			)}
		</>
	);
}

function CaseFilesList({
	casefiles,
	menus,
}: {
	casefiles: CaseFile[];
	menus: DropDownProps[];
}) {
	const num_active = sum(
		casefiles.map((casefile) => inferTarget(casefile, menus))
	);
	return (
		<div className="bg-white rounded-lg m-[10px] border shadow-sm">
			<div className="m-6">
				<div className="flex space-x-3  pb-1 items-center border-b-2">
					<p className="text-lxd">卷宗</p>
					<p>|</p>
					<p className="text-sm">{getCurrentSelectString(menus)}</p>
				</div>
				<p className="text-[12px] mt-3">总共筛选出{num_active}份卷宗</p>

				{casefiles.map((casefile, index) => {
					return (
						<CaseCard
							key={index}
							casefile={casefile}
							menus={menus}
						/>
					);
				})}
			</div>
		</div>
	);
}

function CaseFileIndex({ casefiles }: { casefiles: CaseFile[] }) {
	const yearsList = unique<string>(
		casefiles,
		(casefile: CaseFile) => `${new Date(casefile.writtenAt).getFullYear()}`
	);
	const classesList = unique<string>(
		casefiles,
		(casefile) => casefile.classification
	);

	const years = makeDropDownMenu(
		"时间",
		<CalendarDaysIcon className="w-3" />,
		yearsList,
		(casefile) => `${new Date(casefile.writtenAt).getFullYear()}`
	);
	const classes = makeDropDownMenu(
		"类别",
		<BiCategory className="w-3" />,
		classesList,
		(casefile) => casefile.classification
	);
	const list_header = {
		title: "部分卷宗展示",
		description:
			"本站仅对【公开】卷宗进行搬运， 并为了增强阅读体验，进行了卷宗的重新排版，感谢各位网友的整理的无私分享。可以根据以下规则进行卷宗内容的筛选。",
		last_update: getDate(new Date(casefiles[0].writtenAt)),
		menus: [years, classes],
		show_active: false,
		post_link: "https://wj.qq.com/s2/11424516/0a97",
	};
	return (
		<div className="bg-gray-100">
			<Header {...casfile_text} />
			<ListHeader {...list_header} />
			<CaseFilesList casefiles={casefiles} menus={[years, classes]} />

			<Footer />
		</div>
	);
}

export default CaseFileIndex;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient(true);

	const post_query = `
    *[_type=="casefiles" &&!(_id in path("drafts.**"))]|order(_updatedAt desc){
		title,
		writtenAt,
		mainImageUrl,
		description,
		slug,
		classification
	}
  `;
	const casefiles: CaseFile[] = await client.fetch(post_query);
	casefiles.sort((a, b) => {
		return (
			new Date(b.publishedAt).getTime() -
			new Date(a.publishedAt).getTime()
		);
	});
	return {
		props: {
			casefiles: casefiles,
		},
	};
};
