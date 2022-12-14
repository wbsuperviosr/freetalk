import Link from "next/link";
import React, { Fragment } from "react";
import { Post } from "../../models/sanityModel";
import { getDate } from "../../utils/getDate";

export function slideButtons({ posts }: { posts: Post[] }) {
	return posts.map((post, index) => {
		return (
			<button
				type="button"
				key={post.slug.current}
				data-bs-target="#carouselExampleIndicators"
				data-bs-slide-to={`${index}`}
				className={!index ? "active" : ""}
				aria-current="true"
				aria-label={`Slide ${index + 1}`}
			/>
		);
	});
}

export function SlidePicture({ post }: { post: Post }) {
	const has_both_categories = post.category && post.subcategory;
	return (
		<Link href={`/posts/${post.slug.current}`}>
			<div
				className="relative flex m-auto object-fit w-full h-40 rounded-t-xl items-center justify-center"
				style={{
					backgroundImage: `url(${post.mainImageUrl})`,
					backgroundSize: "cover",
				}}
			>
				<div className="">
					<div className="flex space-x-2 text-xs font-bold items-center text-center">
						{post.category && <p>{post.category.title}</p>}
						{has_both_categories && <p>|</p>}
						{post.subcategory && <p>{post.subcategory.title}</p>}
					</div>

					<div className="items-center text-center bg-white text-xl text-black font-bold px-2 py-[2px] rounded-md w-72 flex-wrap overflow-hidden">
						{post.title}
					</div>

					<div className="flex justify-end space-x-2 text-sm text-right  tracking-wide">
						<p>作者:{post.author.name}</p>
						<p>|</p>
						<p>{getDate(new Date(post.writtenAt!))}</p>
					</div>
				</div>
			</div>
			<div className="px-3 text-black text-md pt-5 tracking-wide">
				「{post.description}」
			</div>
		</Link>
	);
}

export default function PostSlider({ posts }: { posts: Post[] }) {
	return (
		<div className="py-1 ">
			<div
				id="carouselExampleIndicators"
				className="carousel slide carousel-dark relative h-80 m-4 mt-2 rounded-xl pointer-event bg-white border shadow-sm"
				data-bs-ride="carousel"
			>
				<div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
					{posts.map((post, index) => {
						return (
							<button
								type="button"
								key={post.slug.current}
								data-bs-target="#carouselExampleIndicators"
								data-bs-slide-to={`${index}`}
								className={!index ? "active w-5" : "w-5"}
								aria-current={!index ? "true" : "false"}
								aria-label={`Slide ${index + 1}`}
							/>
						);
					})}
				</div>

				<div className="carousel-inner relative w-full overflow-hidden">
					{posts.map((post, index) => {
						return (
							<div
								className={`carousel-item float-left w-full ${
									index == 0 ? "active" : ""
								}`}
								key={index}
							>
								<SlidePicture post={post} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
