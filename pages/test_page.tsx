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
