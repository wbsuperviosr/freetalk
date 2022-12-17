import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { getClient } from "../../utils/sanity";
import { CaseFile } from "../../models/casefilesModel";
import { getDate } from "../../utils/getDate";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import {
	calcMapSum,
	getSelect,
	makeMapState,
} from "../../components/menu/utils";
import {
	DropDownProps,
	DropDownSelect,
} from "../../components/menu/DropDownSelect";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { BiCategory } from "react-icons/bi";

const casfile_header = {
	title: "「部分卷宗」",
	text: ["有缘见到的仅有这些，", "也已经说明了许多"],
	subtext: "2016年日本留学生被害案部分卷宗，本栏目尽力保存",
	link: "https://am3pap007files.storage.live.com/y4mrQYXPK0wzkCTllrL1t052m_p4B9ILnOE5793RgUsEtrfwfpZEulDim8xljELSTBcdy0t4yCXVxk1kCQ2augpQxMlA_Or54EpA3qvq1V7PFaPmvqr-3lolzzN1BcN2QLdvY606SqMXscShYWiUg9HaVBU0jroxFbwnZ9iDhcZrtVwxzseQu4VuPTMYvTjM6YS?width=1920&height=460&cropmode=none",
};

function getUniqueYear(casefiles: CaseFile[]) {
	const years = new Set<string>(
		casefiles.map((casefile) => {
			return `${new Date(casefile.writtenAt).getFullYear()}`;
		})
	);
	return Array.from(years).sort();
}

function getUniqueClassification(casefiles: CaseFile[]) {
	const classes = new Set<string>(
		casefiles.map((casefile) => {
			return casefile.classification;
		})
	);
	return Array.from(classes).sort();
}

function getCurrentSelectString(
	yearState: Map<string, boolean>,
	classState: Map<string, boolean>
) {
	const years = getSelect(yearState);
	const classes = getSelect(classState);
	const string = `【时间：${years}】【类别：${classes}】`;
	// return [years, classes];
	return string;
}

function CaseFilesHeader({
	casefiles,
	years,
	classes,
}: {
	casefiles: CaseFile[];
	years: DropDownProps;
	classes: DropDownProps;
}) {
	const showText: number =
		calcMapSum(years.options.state) + calcMapSum(classes.options.state);
	return (
		<div className="m-[10px] bg-white rounded-lg border-[1px] shadow-sm">
			<div className="text-center pt-5 flow-row">
				<p className="bg-lxd text-white items-center text-[16px] tracking-[2.1px]">
					部分卷宗展示
				</p>
				<p className="bg-freeze font-bold text-[12px] h-5 pt-[2px] ">
					最后更新:{getDate(new Date(casefiles[0].writtenAt))}
				</p>
			</div>

			<div className="mx-8 pt-5">
				<p className="tracking-[1.8px] text-[14px] text-justify">
					本站仅对【公开】卷宗进行搬运,
					并为了增强阅读体验，进行了卷宗的重新排版，感谢各位网友的整理的无私分享。可以根据以下规则进行卷宗内容的删选。
				</p>

				<div className="flex justify-between my-3 mb-5 p-2 px-10 border-2 rounded-lg">
					<DropDownSelect menu={years} />
					<DropDownSelect menu={classes} />
				</div>
			</div>

			{/* {showText !== 0 && (
				<div className="text-[12px] mx-8 text-center mb-6">
					当前展示
					{getCurrentSelectString(
						years.options.state,
						classes.options.state
					)}
					范围内的卷宗
				</div>
			)} */}
		</div>
	);
}

function inferTarget(
	casefile: CaseFile,
	yearState: Map<string, boolean>,
	classState: Map<string, boolean>
) {
	let isTarget = true;
	const yearTrues = calcMapSum(yearState);
	const classTrues = calcMapSum(classState);

	if (yearTrues !== 0) {
		const currentYear = `${new Date(casefile.writtenAt).getFullYear()}`;
		if (!yearState.get(currentYear)) {
			isTarget = false;
		}
	}

	if (classTrues !== 0) {
		if (!classState.get(casefile.classification)) {
			isTarget = false;
		}
	}

	return isTarget;
}

function CaseCard({
	casefile,
	yearState,
	classState,
}: {
	casefile: CaseFile;
	yearState: Map<string, boolean>;
	classState: Map<string, boolean>;
}) {
	const isTarget = inferTarget(casefile, yearState, classState);

	return (
		<>
			{isTarget && (
				<Link href={`/casefiles/${casefile.slug.current}`}>
					<div className="flex bg-white py-3 justify-between rounded-lg shadow-sm">
						<div className="">
							<div className="flex items-center space-x-4">
								<div className="w-10 h-[2px] bg-freeze"></div>
								<div className="w-4 h-4 bg-lxl rounded-full"></div>
								<p className="text-lg font-bold text-lxd">
									{casefile.classification}
								</p>
							</div>
							<p className="text-black">{casefile.title}</p>
							<p className="text-gray-600 text-sm">
								{casefile.description}
							</p>
						</div>
						{casefile.mainImageUrl && (
							<img
								src={casefile.mainImageUrl}
								alt={casefile.title}
								className="w-20 h-20 object-cover grayscale-[50%]"
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
	years,
	classes,
}: {
	casefiles: CaseFile[];
	years: DropDownProps;
	classes: DropDownProps;
}) {
	return (
		<div className="bg-white rounded-lg m-[10px] border shadow-sm">
			<div className="m-6">
				<div className="flex space-x-3  pb-1 items-center border-b-2">
					<p className="text-lxd">卷宗</p>
					<p>|</p>
					<p className="text-sm">
						{getCurrentSelectString(
							years.options.state,
							classes.options.state
						)}
					</p>
				</div>
				<p className="text-[12px] my-3">
					这一行用来展示有多少卷宗属于该类别
				</p>

				{casefiles.map((casefile) => {
					return (
						<CaseCard
							casefile={casefile}
							yearState={years.options.state}
							classState={classes.options.state}
						/>
					);
				})}
			</div>
		</div>
	);
}

function CaseFileIndex({ casefiles }: { casefiles: CaseFile[] }) {
	const yearsList = getUniqueYear(casefiles);
	const classesList = getUniqueClassification(casefiles);

	const initialYears = makeMapState(yearsList);
	const initialClass = makeMapState(classesList);

	const [yearState, setYearState] = React.useState(initialYears);
	const [classState, setClassState] = React.useState(initialClass);

	const years: DropDownProps = {
		title: "时间",
		options: { state: yearState, setState: setYearState },
		icon: <CalendarDaysIcon className="w-3" />,
	};

	const classes: DropDownProps = {
		title: "类别",
		options: { state: classState, setState: setClassState },
		icon: <BiCategory className="w-3" />,
	};

	return (
		<div className="bg-gray-100">
			<Header {...casfile_header} />
			<CaseFilesHeader
				casefiles={casefiles}
				years={years}
				classes={classes}
			/>

			<CaseFilesList
				casefiles={casefiles}
				years={years}
				classes={classes}
			/>

			<Footer />
		</div>
	);
}

export default CaseFileIndex;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient(true);

	const post_query = `
    *[_type=="casefiles"]{
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
			new Date(b.writtenAt).getTime() - new Date(a.writtenAt).getTime()
		);
	});
	return {
		props: {
			casefiles: casefiles,
		},
	};
};
