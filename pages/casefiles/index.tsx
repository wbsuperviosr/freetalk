import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { getClient } from "../../utils/sanity";
import { CaseFile } from "../../models/casefilesModel";
import { getDate } from "../../utils/getDate";
import Link from "next/link";
import { Footer } from "../../components/Footer";

const casfile_header = {
	title: "「部分卷宗」",
	text: ["有缘见到的仅有这些，", "也已经说明了许多"],
	subtext: "2016年日本留学生被害案部分卷宗，本栏目尽力保存",
	link: "https://images.pexels.com/photos/3720483/pexels-photo-3720483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};

function CaseCard({ casefile }: { casefile: CaseFile }) {
	return (
		<Link href={`/casefiles/${casefile.slug.current}`}>
			<div className="flex m-4 bg-white p-4 rounded-lg shadow-sm">
				<img
					src={casefile.mainImageUrl}
					alt={casefile.title}
					className="w-20 h-20 object-cover"
				/>
				<div className="pl-4">
					<p className="text-lg font-bold text-lxd">
						{casefile.title}
					</p>
					<p className="text-black">
						{getDate(new Date(casefile.writtenAt))}
					</p>
					<p className="text-gray-600 text-sm">
						{casefile.description}
					</p>
				</div>
			</div>
		</Link>
	);
}

function CaseFileList({ casefiles }: { casefiles: CaseFile[] }) {
	console.log(casefiles);
	return (
		<div className="bg-gray-100">
			<Header {...casfile_header} />
			{casefiles.map((casefile, index) => {
				return <CaseCard casefile={casefile} key={index} />;
			})}

			<Footer />
		</div>
	);
}

export default CaseFileList;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient(true);

	const post_query = `
    *[_type=="casefiles"]
  `;
	const casefiles: CaseFile[] = await client.fetch(post_query);
	return {
		props: {
			casefiles: casefiles,
		},
	};
};
