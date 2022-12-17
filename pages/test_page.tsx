// import Image from "next/image";
// const images = [
// 	{
// 		src: "https://source.unsplash.com/sQZ_A17cufs/549x711",
// 		alt: "Mechanical keyboard with white keycaps.",
// 	},
// 	{
// 		src: "https://source.unsplash.com/rsAeSMzOX9Y/768x512",
// 		alt: "Mechanical keyboard with white, pastel green and red keycaps.",
// 	},
// 	{
// 		src: "https://source.unsplash.com/Z6SXt1v5tP8/768x512",
// 		alt: "Mechanical keyboard with white, pastel pink, yellow and red keycaps.",
// 	},
// ];
// import React, { useState } from "react";
// import FsLightbox from "fslightbox-react";

import { Gallery, Item } from "react-photoswipe-gallery";

// export default function TestPage() {
// 	const [toggler, setToggler] = useState(false);

// 	return (
// 		<>
// 			<button onClick={() => setToggler(!toggler)}>
// 				Open the lightbox.
// 			</button>
// 			<FsLightbox
// 				toggler={toggler}
// 				sources={[
// 					"https://source.unsplash.com/sQZ_A17cufs/549x711",
// 					"https://source.unsplash.com/rsAeSMzOX9Y/768x512",
// 					"https://source.unsplash.com/Z6SXt1v5tP8/768x512",
// 					"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
// 				]}
// 			/>
// 		</>
// 	);
// }
import "photoswipe/dist/photoswipe.css";
const Page = () => {
	const htmlString = (val: number) => `
	<div style="
	  color: white;
	  display: flex;
	  place-content: center;
	  flex-direction: column;
	  height: 100%;
	  widht:100%,
	  text-align: center;
	">
	  <img src="https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg"/>
	</div>
	`;

	return (
		<Gallery options={{ showHideOpacity: true }}>
			<Item html={htmlString(1)}>
				{({ ref, open }) => (
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							open(e);
						}}
						ref={ref as React.MutableRefObject<HTMLAnchorElement>}
					>
						Open a slide with raw html content 1
					</a>
				)}
			</Item>
			<br />
			<Item html={htmlString(2)}>
				{({ ref, open }) => (
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							open(e);
						}}
						ref={ref as React.MutableRefObject<HTMLAnchorElement>}
					>
						{/* Open a slide with raw html content 2 */}
					</a>
				)}
			</Item>
		</Gallery>
	);
};
{
	/* <Item
cropped
original="https://source.unsplash.com/IXP_xjMntlc/1920x2879"
// thumbnail="https://source.unsplash.com/IXP_xjMntlc/1920x2879"
width="1920"
height="2879"
>
{({ ref, open }) => (
	<img
		style={smallItemStyles}
		src="https://source.unsplash.com/IXP_xjMntlc/1920x2879"
		ref={ref as React.MutableRefObject<HTMLImageElement>}
		onClick={open}
	/>
)}
</Item> */
}

export default Page;
// import "photoswipe/dist/photoswipe.css";

// import { Gallery, Item } from "react-photoswipe-gallery";

// const MyGallery = () => {
// 	const smallItemStyles: React.CSSProperties = {
// 		cursor: "pointer",
// 		objectFit: "cover",
// 		width: "150px",
// 		height: "150px",
// 	};
// 	return (
// 		<Gallery>
// 			<div
// 				style={{
// 					display: "grid",
// 					gridTemplateColumns: "repeat(3, 2fr)",
// 					gridGap: 10,
// 				}}
// 			>
// 				<Item
// 					cropped
// 					original="https://source.unsplash.com/IXP_xjMntlc/1920x2879"
// 					thumbnail="https://source.unsplash.com/IXP_xjMntlc/1920x2879"
// 					width="1920"
// 					height="2879"
// 				>
// 					{({ ref, open }) => (
// 						<img
// 							style={smallItemStyles}
// 							src="https://source.unsplash.com/IXP_xjMntlc/1920x2879"
// 							ref={
// 								ref as React.MutableRefObject<HTMLImageElement>
// 							}
// 							onClick={open}
// 						/>
// 					)}
// 				</Item>
// 				<Item
// 					cropped
// 					original="https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg"
// 					thumbnail="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
// 					width="1600"
// 					height="1600"
// 				>
// 					{({ ref, open }) => (
// 						<img
// 							style={smallItemStyles}
// 							src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
// 							ref={
// 								ref as React.MutableRefObject<HTMLImageElement>
// 							}
// 							onClick={open}
// 						/>
// 					)}
// 				</Item>
// 				<Item
// 					cropped
// 					original="https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg"
// 					thumbnail="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
// 					width="1600"
// 					height="1068"
// 				>
// 					{({ ref, open }) => (
// 						<img
// 							style={smallItemStyles}
// 							src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
// 							ref={
// 								ref as React.MutableRefObject<HTMLImageElement>
// 							}
// 							onClick={open}
// 						/>
// 					)}
// 				</Item>
// 				<Item
// 					cropped
// 					original="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg"
// 					thumbnail="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
// 					width="1600"
// 					height="1066"
// 				>
// 					{({ ref, open }) => (
// 						<img
// 							style={smallItemStyles}
// 							src="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
// 							ref={
// 								ref as React.MutableRefObject<HTMLImageElement>
// 							}
// 							onClick={open}
// 						/>
// 					)}
// 				</Item>
// 				<Item
// 					cropped
// 					original="https://farm6.staticflickr.com/5584/14985868676_b51baa4071_h.jpg"
// 					thumbnail="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg"
// 					width="1600"
// 					height="1066"
// 				>
// 					{({ ref, open }) => (
// 						<img
// 							style={smallItemStyles}
// 							src="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg"
// 							ref={
// 								ref as React.MutableRefObject<HTMLImageElement>
// 							}
// 							onClick={open}
// 						/>
// 					)}
// 				</Item>
// 				<Item
// 					cropped
// 					original="https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg"
// 					thumbnail="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg"
// 					width="1600"
// 					height="1066"
// 				>
// 					{({ ref, open }) => (
// 						<img
// 							style={smallItemStyles}
// 							src="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg"
// 							ref={
// 								ref as React.MutableRefObject<HTMLImageElement>
// 							}
// 							onClick={open}
// 						/>
// 					)}
// 				</Item>
// 			</div>
// 		</Gallery>
// 	);
// };

// export default MyGallery;
// import React, { useEffect } from "react";
// import PhotoSwipeLightbox from "photoswipe/lightbox";
// import "photoswipe/style.css";

// export default function SimpleGallery(props) {
// 	useEffect(() => {
// 		let lightbox = new PhotoSwipeLightbox({
// 			gallery: "#" + props.galleryID,
// 			children: "a",
// 			pswpModule: () => import("photoswipe"),
// 		});
// 		lightbox.init();

// 		return () => {
// 			lightbox.destroy();
// 			lightbox = null;
// 		};
// 	}, []);

// 	return (
// 		<div className="pswp-gallery" id={props.galleryID}>
// 			{props.images.map((image, index) => (
// 				<a
// 					href={image.largeURL}
// 					data-pswp-width={image.width}
// 					data-pswp-height={image.height}
// 					key={props.galleryID + "-" + index}
// 					target="_blank"
// 					rel="noreferrer"
// 				>
// 					<img src={image.thumbnailURL} alt="" />
// 				</a>
// 			))}
// 		</div>
// 	);
// }
