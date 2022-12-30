import React from "react";
import { SourceUrl } from "../../models/timelineModel";
import { BsLink45Deg } from "react-icons/bs";
import { GoTriangleRight, GoTriangleUp } from "react-icons/go";

function ExternalEvidence({ source_urls }: { source_urls: SourceUrl[] }) {
	const [open, setOpen] = React.useState(false);
	return (
		<div className="pt-1 px-3">
			<div
				className="flex space-x-1 cursor-pointer"
				onClick={() => setOpen(!open)}
			>
				<BsLink45Deg className="w-4" />
				<p className="bg-lxd rounded-r-md pr-1 pl-[1px] text-white text-xs hover:underline underline-offset-2 hover:bg-lxl">
					点击展开文章链接
				</p>
				{open ? (
					<GoTriangleUp className="w-4 fill-lxd" />
				) : (
					<GoTriangleRight className="w-4 fill-lxd" />
				)}
			</div>
			{open && (
				<ul className="list-disc list-inside pt-1 pl-2">
					{source_urls.map((source_url, index) => {
						return (
							<li key={index}>
								<a
									href={source_url.urlField}
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="text-xs text-black underline underline-offset-4 hover:text-lxd">
										{source_url.url_title}
									</span>
								</a>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

export default ExternalEvidence;
