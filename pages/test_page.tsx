import React from "react";
import { ImageUrl } from "../models/timelineModel";

const image_urls: ImageUrl[] = [
	{
		urlField:
			"https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		url_title: "大内公寓二楼部分结构图（标有刘鑫报警时身处的位置）",
	},
	{
		urlField:
			"https://images.pexels.com/photos/414359/pexels-photo-414359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		url_title: "乱填一张图片",
	},
	{
		urlField:
			"https://images.pexels.com/photos/345162/pexels-photo-345162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		url_title: "fdfd乱填一张图片",
	},
];

function EviImage({
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
			<div className="carousel-caption  md:block absolute text-center">
				<h5 className="text-md">{image_url.url_title}</h5>
				{/* <p className="text-white">
					Some representative placeholder content for the first slide.
				</p> */}
			</div>
		</div>
	);
}

export default function TestPage() {
	return (
		<div
			id="carouselExampleCaptions"
			className="carousel slide relative"
			data-bs-ride="carousel"
		>
			<div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
				{image_urls.map((image_url, index) => {
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
						<EviImage
							image_url={image_url}
							index={index}
							key={index}
						/>
					);
				})}

				{/* <div className="carousel-item active relative float-left w-full">
					<img
						src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
						className="block w-full"
						alt="..."
					/>
					<div className="carousel-caption hidden md:block absolute text-center">
						<h5 className="text-xl">First slide label</h5>
						<p>
							Some representative placeholder content for the
							first slide.
						</p>
					</div>
				</div>
				<div className="carousel-item relative float-left w-full">
					<img
						src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
						className="block w-full"
						alt="..."
					/>
					<div className="carousel-caption hidden md:block absolute text-center">
						<h5 className="text-xl">Second slide label</h5>
						<p>
							Some representative placeholder content for the
							second slide.
						</p>
					</div>
				</div>
				<div className="carousel-item relative float-left w-full">
					<img
						src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
						className="block w-full"
						alt="..."
					/>
					<div className="carousel-caption hidden md:block absolute text-center">
						<h5 className="text-xl">Third slide label</h5>
						<p>
							Some representative placeholder content for the
							third slide.
						</p>
					</div>
				</div> */}
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
