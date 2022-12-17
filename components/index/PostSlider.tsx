import Link from "next/link";
import React from "react";
import { Post } from "../../models/postModel";
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
	const mainCategory = post.author.name == "刘鑫" ? "暖曦话语" : "观者评说";

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
						<p>{mainCategory}</p>
						{post.category && <p>|</p>}
						{post.category && <p>{post.category}</p>}
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
			<div className="px-4 text-black text-[13px] pt-5 tracking-widest">
				「{post.description}」
			</div>
		</Link>
	);
}

export default function PostSlider({ posts }: { posts: Post[] }) {
	return (
		<div className="py-0">
			<div
				id="carouselExampleIndicators"
				className="carousel slide carousel-dark relative h-[300px] m-[10px] rounded-xl pointer-event bg-white border shadow-md"
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
