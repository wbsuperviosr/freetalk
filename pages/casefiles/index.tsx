import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { getClient } from "../../utils/sanity";
import { Body, CaseFile } from "../../models/casefilesModel";
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
import { unique } from "../../utils/ArrayOps";
import { AiOutlineDownload } from "react-icons/ai";
import { makeSearchState, SearchProps } from "../../components/menu/SearchBar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiSearch } from "react-icons/fi";

function CaseCard({
	casefile,
	menus,
	search,
}: {
	casefile: CaseFile;
	menus: DropDownProps[];
	search?: SearchProps;
}) {
	const isTarget = inferTarget(casefile, menus, search);
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

function getBobyText(body: Body): string {
	let text = "";
	for (const child of body.children) {
		text += child.text;
	}
	return text;
}

type SearchTarget = {
	text: string;
	key: string;
};

function inferSearchTarget(
	isTarget: boolean,
	casefile: CaseFile,
	keyword: string
): SearchTarget[] {
	let targets: SearchTarget[] = [];
	if (!isTarget) {
		return targets;
	}
	for (const body of casefile.body) {
		let text = getBobyText(body);
		let posIndex = text.indexOf(keyword);
		if (posIndex != -1) {
			targets.push({
				text: text.slice(
					Math.max(0, posIndex - 5),
					posIndex + keyword.length + 10
				),
				key: body._key,
			});
		}
	}

	return targets;
}

function CaseCardWithSearch({
	casefile,
	menus,
	search,
}: {
	casefile: CaseFile;
	menus: DropDownProps[];
	search?: SearchProps;
}) {
	const keyword = search!.state.key;
	const keyLength = keyword.length;
	const isTarget = inferTarget(casefile, menus);
	const targets = inferSearchTarget(isTarget, casefile, keyword);
	return (
		<div>
			{isTarget && targets.length != 0 && (
				<div className="bg-white py-3 justify-between rounded-lg shadow-sm">
					<Link href={`/casefiles/${casefile.slug.current}`}>
						<div className="flex justify-between">
							<div className="flex items-center space-x-3">
								<div className="w-4 h-4 bg-lxl rounded-full"></div>
								<p className="text-md font-bold text-lxd">
									{casefile.title}
								</p>
							</div>
							<p className="text-black">
								{casefile.classification}
							</p>
						</div>
					</Link>
					<ul>
						{targets.map((target, index) => {
							const posIndex = target.text.indexOf(keyword);
							return (
								<Link
									href={`/casefiles/${casefile.slug.current}?id=${target.key}&keyword=${keyword}`}
									key={index}
									target="_blank"
									rel="noopener"
								>
									<li
										className="text-gray-400 text-sm"
										key={index}
									>
										{posIndex != 0 && <span>...</span>}
										<span>
											{target.text.slice(0, posIndex)}
										</span>
										<span className="text-lxd">
											{target.text.slice(
												posIndex,
												posIndex + keyLength
											)}
										</span>
										<span>
											{target.text.slice(
												posIndex + keyLength
											)}
										</span>
										{posIndex + keyLength !=
											target.text.length && (
											<span>...</span>
										)}
									</li>
								</Link>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}

function CaseFilesList({
	casefiles,
	menus,
	search,
}: {
	casefiles: CaseFile[];
	menus: DropDownProps[];
	search?: SearchProps;
}) {
	// const num_active = sum(
	// 	casefiles.map((casefile) => inferTarget(casefile, menus))
	// );
	return (
		<div className="bg-white rounded-lg m-[10px] border shadow-sm">
			<div className="m-6">
				<div className="flex space-x-3  pb-1 items-center border-b-2">
					<p className="text-lxd">卷宗</p>
					<p>|</p>
					{/* <p className="text-sm">{getCurrentSelectString(menus)}</p> */}
					<a href="https://assets.wbavengers.com/6部分卷宗/all.7z">
						<p className="flex items-center space-x-1">
							<span className="text-lxd">下载全部</span>
							<AiOutlineDownload className="w-5 text-lxd" />
						</p>
					</a>
				</div>
				{/* <p className="text-[12px] mt-3">总共筛选出{num_active}份卷宗</p> */}

				{search?.state.key == ""
					? casefiles.map((casefile, index) => {
							return (
								<CaseCard
									key={index}
									casefile={casefile}
									menus={menus}
									search={search}
								/>
							);
					  })
					: casefiles.map((casefile, index) => {
							return (
								<CaseCardWithSearch
									key={index}
									casefile={casefile}
									menus={menus}
									search={search}
								/>
							);
					  })}
			</div>
		</div>
	);
}

function CaseFileIndex({ casefiles }: { casefiles: CaseFile[] }) {
	const router = useRouter();
	const [keyword, setKeyword] = React.useState("");
	useEffect(() => {
		const query = router.query;
		if (query.hasOwnProperty("keyword")) {
			let keyword = query.keyword as string;
			setKeyword(keyword);
			search.state.setKey(keyword);
		}
	}, [router.query]);

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
	// console.log("in index", keyword);
	const search = makeSearchState(
		(casefile: CaseFile) => {
			return [casefile.title];
		},
		"搜索",
		"例如: 法医",
		<FiSearch className="w-10" />,
		keyword
	);

	const list_header = {
		title: "部分卷宗展示",
		description:
			"本站仅对【公开】卷宗进行搬运， 并为了增强阅读体验，进行了卷宗的重新排版，感谢各位网友的整理的无私分享。可以根据以下规则进行卷宗内容的筛选。",
		last_update: getDate(new Date(casefiles[0].writtenAt)),
		menus: [years, classes],
		show_active: false,
		post_link: "https://wj.qq.com/s2/11424516/0a97",
		search: search,
	};
	return (
		<div className="bg-gray-100">
			<Header {...casfile_text} />
			<ListHeader {...list_header} />
			<CaseFilesList
				casefiles={casefiles}
				menus={[years, classes]}
				search={search}
			/>

			<Footer />
		</div>
	);
}

export default CaseFileIndex;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient(true);

	const post_query = `
    *[_type=="casefiles" &&!(_id in path("drafts.**"))]|order(order asc){
		title,
		writtenAt,
		mainImageUrl,
		description,
		slug,
		order,
		body,
		classification
	}
  `;
	const casefiles: CaseFile[] = await client.fetch(post_query);
	return {
		props: {
			casefiles: casefiles,
		},
	};
};
