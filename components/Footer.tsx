import {
	EnvelopeIcon,
	FaceSmileIcon,
	HomeIcon,
} from "@heroicons/react/24/outline";

export function Footer() {
	return (
		<div className="flex justify-center space-x-4 py-4">
			<div className="flex items-center">
				<HomeIcon className="w-3" />
				<p className="text-xs ">关于本站</p>
			</div>
			<div className="flex items-center">
				<FaceSmileIcon className="w-3" />
				<p className="text-xs ">关于我们</p>
			</div>
			<div className="flex items-center">
				<EnvelopeIcon className="w-3" />
				<p className="text-xs ">联系我们</p>
			</div>
		</div>
	);
}
