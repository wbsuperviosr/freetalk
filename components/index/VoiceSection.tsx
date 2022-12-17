import Link from "next/link";
import React from "react";
import { getDate } from "../../utils/getDate";

type VoiceSectionProps = {
	title: string;
	subtitle: string;
	section_slug: string;
	update: string;
	post_title: string;
	post_summary: string;
	picture: string;
	slug: string;
	author?: string;
};

function VoiceSection({
	title,
	subtitle,
	section_slug,
	update,
	post_title,
	post_summary,
	picture,
	slug,
	author,
}: VoiceSectionProps) {
	return (
		<div className="m-[10px] bg-white rounded-lg shadow-sm">
			<div className="container p-5">
				<div className="flex">
					<img
						src={picture}
						alt=""
						className="w-20 md:w-40 max-h-48 md:max-h-40 grayscale-[70%] object-cover object-right"
					/>
					<div className="ml-5 w-full">
						<Link href={section_slug}>
							<div className="flex items-center space-x-3">
								<div className="w-6 h-[2px] bg-gray-300"></div>
								<div className="w-4 h-4 bg-lxd rounded-full"></div>
								<div className="font-bold text-black">
									{title}
								</div>
							</div>
						</Link>
						<p className="text-sm pt-1">{subtitle}</p>
						<div className="flex items-center space-x-2 pt-1">
							<p className="text-xs">
								<span className="font-bold">最后更新</span>:{" "}
								{getDate(new Date(update))}
							</p>
							{author && (
								<>
									<p className="text-[10px] text-lxd">|</p>
									<p className="text-xs">作者:{author}</p>
								</>
							)}
						</div>
						<hr className="bg-gray-200 w-full h-[2px] my-1" />

						<Link href={`${section_slug}/${slug}`}>
							<div className="text-right font-bold text-sm text-lxd my-2">
								{post_title}
							</div>
							<div className="text-justify text-xs text-gray-600">
								{post_summary}
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VoiceSection;
