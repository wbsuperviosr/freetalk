import {
	EnvelopeIcon,
	FaceSmileIcon,
	HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export function Footer() {
	return (
		<div className="flex justify-center space-x-4 pt-2 pb-7">
			<Link href="/about">
				<div className="flex items-center">
					<HomeIcon className="w-3 text-black" />
					<p className="text-xs text-black">关于本站</p>
				</div>
			</Link>
			<Link href="/about/about_us">
				<div className="flex items-center">
					<FaceSmileIcon className="w-3 text-black" />
					<p className="text-xs text-black">关于我们</p>
				</div>
			</Link>
			<Link href="/about/contact">
				<div className="flex items-center">
					<EnvelopeIcon className="w-3 text-black" />
					<p className="text-xs text-black">联系我们</p>
				</div>
			</Link>
		</div>
	);
}
