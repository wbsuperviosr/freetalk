import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { GoTriangleRight, GoTriangleUp } from "react-icons/go";
import { ImageUrl } from "../../models/timelineModel";

function EvidenceCard({
	image_url,
	index,
}: {
	image_url: ImageUrl;
	index: number;
}) {
	return (
		<div
			className={`carousel-item ${
				index == 0 ? "active" : ""
			} relative float-left w-full`}
		>
			<img src={image_url.urlField} className="block w-full" alt="..." />
			<div className="carousel-caption absolute text-center">
				<h5 className="text-md">{image_url.url_title}</h5>
				{/* <p className="text-white">
					Some representative placeholder content for the first slide.
				</p> */}
			</div>
		</div>
	);
}

function ImageSlider({ image_urls }: { image_urls: ImageUrl[] }) {
	return (
		<div
			id="carouselExampleCaptions"
			className="carousel slide relative pt-1"
			data-bs-ride="carousel"
		>
			<div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
				{image_urls.map((_, index) => {
					return (
						<button
							type="button"
							key={index}
							data-bs-target="#carouselExampleCaptions"
							data-bs-slide-to={`${index}`}
							className={index == 0 ? "active w-5" : "w-5"}
							aria-current={index == 0 ? "true" : "false"}
							aria-label={`Slide ${index + 1}`}
						></button>
					);
				})}
			</div>
			<div className="carousel-inner relative w-full overflow-hidden">
				{image_urls.map((image_url, index) => {
					return (
						<EvidenceCard
							image_url={image_url}
							index={index}
							key={index}
						/>
					);
				})}
			</div>
			<button
				className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
				type="button"
				data-bs-target="#carouselExampleCaptions"
				data-bs-slide="prev"
			>
				<span
					className="carousel-control-prev-icon inline-block bg-no-repeat"
					aria-hidden="true"
				></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button
				className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
				type="button"
				data-bs-target="#carouselExampleCaptions"
				data-bs-slide="next"
			>
				<span
					className="carousel-control-next-icon inline-block bg-no-repeat"
					aria-hidden="true"
				></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
}

export function ImageEvidence({ image_urls }: { image_urls: ImageUrl[] }) {
	const [open, setOpen] = React.useState(false);

	const valid_images =
		image_urls &&
		image_urls.filter((image_url) => {
			return image_url.urlField && image_url.url_title;
		});

	return (
		<>
			{valid_images && valid_images.length !== 0 && (
				<div className="relative flex justify-between px-3 pt-1 space-x-1">
					<div
						className="flex space-x-1 cursor-pointer"
						onClick={() => setOpen(!open)}
					>
						<PhotoIcon className="w-4" />
						<p
							className="bg-lxd rounded-r-md pr-1 pl-[1px] text-white text-xs hover:underline underline-offset-2 hover:bg-lxl"
							// onClick={() => setOpen(!open)}
						>
							点击查看图片证据
						</p>
						{open ? (
							<GoTriangleUp className="w-4 fill-lxd" />
						) : (
							<GoTriangleRight className="w-4 fill-lxd" />
						)}
					</div>
					{open && (
						<div className="flex" onClick={() => setOpen(!open)}>
							<XMarkIcon className="w-4 fill-lxd text-lxd" />
							<p className="bg-lxd rounded-r-md pr-1 pl-[1px] text-white text-xs cursor-pointer">
								关闭
							</p>
						</div>
					)}
				</div>
			)}
			{open && <ImageSlider image_urls={image_urls} />}
		</>
	);
}
