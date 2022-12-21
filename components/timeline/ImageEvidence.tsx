import { PhotoIcon } from "@heroicons/react/24/outline";
import React from "react";
import { GoTriangleRight, GoTriangleUp } from "react-icons/go";
import { ImageUrl } from "../../models/timelineModel";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

export function ImageEvidence({ image_urls }: { image_urls: ImageUrl[] }) {
	const valid_images =
		image_urls &&
		image_urls.filter((image_url) => {
			return image_url.urlField && image_url.url_title;
		});
	const htmlString = (url: string) => `
		<div style="
		  color: white;
		  display: flex;
		  place-content: center;
		  flex-direction: column;
		  height: 100%;
		  widht:100%,
		  text-align: center;
		">
		  <img src="${url}"/>
		</div>
		`;
	return (
		<>
			{valid_images && valid_images.length !== 0 && (
				<div className="relative flex justify-between px-3 pt-1 space-x-1">
					<div className="flex space-x-1 cursor-pointer">
						<PhotoIcon className="w-4" />

						<Gallery>
							{image_urls.map((image, index) => {
								return (
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
													<p className="text-xs pl-[1px] pr-1 bg-lxd text-white rounded-r-md hover:bg-lxl">
														点击查看图片
													</p>
												)}
											</a>
										)}
									</Item>
								);
							})}
						</Gallery>
						<GoTriangleRight className="w-4 fill-lxd" />
					</div>
				</div>
			)}
		</>
	);
}
