import Girl from "../public/icons/girl.svg";
import { AiOutlineMenu } from "react-icons/ai";
import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import categories from "../category.json";
import Link from "next/link";

type SubCategory = {
	title: string;
	slug: string;
};

type Category = {
	title: string;
	subcategory?: SubCategory[];
	slug?: string;
};

export function SiteLogo() {
	return (
		<a href="/" className="flex items-center pl-5 space-x-2">
			<div>
				<Girl
					fill="black"
					className="w-[30px] outline-2 border border-black rounded-full"
				/>
			</div>
			<p className="text-black text-[10px] font-bold tracking-[4px]">
				LIUXIN.EXPRESS
			</p>
		</a>
	);
}

export type HeroImageProps = {
	title: string;
	text: string[];
	subtext: string;
	link: string;
};

export function HeroImage(props: HeroImageProps) {
	return (
		<div
			className="relative w-full h-[230px]"
			style={{
				backgroundImage: `url(${props.link})`,
				backgroundSize: "cover",
			}}
		>
			<p className="text-white text-[20px] px-[24px] pt-[24px] tracking-[10px]">
				{props.title}
			</p>

			<div className="pt-[10px] pl-9">
				{props.text.map((t, index) => {
					return (
						<p
							key={index}
							className="text-white text-[14px] opacity-90 tracking-widest"
						>
							{t}
						</p>
					);
				})}
			</div>

			<div className="ml-[30%] mt-10 mr-5">
				<hr className="ml-[70%] h-[2px]  bg-gray-200 border-5 border-white opacity-70" />
				<p className="mt-3 text-end text-white text-[10px] tracking-[1.5px] opacity-90 font-heiti">
					{props.subtext}
				</p>
			</div>
		</div>
	);
}

function Header(props: HeroImageProps) {
	return (
		<header className="border-b-2 shadow-lg bg-white">
			<HeroImage {...props} />
			<div className="flex justify-between">
				<SiteLogo />
				<Navbar>
					<NavItem
						icon={
							<AiOutlineMenu
								// fill="black"
								className="w-[30px] h-[30px] text-black bg-white rounded-full p-1 items-center border-[1px] border-black justify-center transition-all duration-300 hover:bg-black hover:text-white"
							/>
						}
					>
						<DropdownMenu
							categories={categories as Category[]}
						></DropdownMenu>
					</NavItem>
				</Navbar>
			</div>
		</header>
	);
}

function Navbar(props: { children: React.ReactNode }) {
	return (
		<nav className="navbar h-[60px]">
			<ul className="navbar-nav flex justify-end p-5 w-full h-full">
				{props.children}
			</ul>
		</nav>
	);
}

function NavItem(props: {
	children?: React.ReactNode;
	icon?: React.ReactNode;
	href?: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<li className="nav-item w-[48px] flex items-center justify-center">
			<a
				href={props.href ? props.href : "#"}
				onClick={() => setOpen(!open)}
			>
				{props.icon}
			</a>
			{/* <Transition
				show={open}
				enter="transition-opacity duration-100"
				enterFrom="opacity-50"
				enterTo="opacity-100"
				leave="transition-opacity duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-50"
			>
				{props.children}
			</Transition> */}
			{open && props.children}
		</li>
	);
}

function DropdownItems({ category }: { category: Category }) {
	const [open, setOpen] = React.useState(false);
	return (
		<div
			className="text-black flex-row space-y-2"
			onClick={() => setOpen(!open)}
		>
			{category.slug ? (
				<div>
					<Link
						href={category.slug}
						className="flex items-center space-x-3 cursor-pointer"
					>
						<div className="w-[25px] h-[2px] bg-gray-400"></div>
						<div className="w-4 h-4 rounded-full bg-lxl hover:bg-rose-300"></div>
						<p className=" text-black p-1 rounded-md hover:bg-lxl">
							{category.title}
						</p>
					</Link>
				</div>
			) : (
				<div className="flex items-center space-x-3 cursor-pointer">
					<div className="w-[25px] h-[2px] bg-gray-400"></div>
					<div className="w-4 h-4 rounded-full bg-lxd hover:bg-rose-300"></div>
					<p className="font-bold p-1 text-black rounded-md hover:bg-lxl">
						{category.title}
					</p>
				</div>
			)}
			{category.subcategory && (
				<Transition
					show={open}
					enter="transition-all ease duration-100 transform"
					enterFrom="opacity-0 h-0 -translate-y-5"
					enterTo="opacity-100 h-32 translate-y-0"
					leave="transition-all ease duration-100 transform"
					leaveFrom="opacity-100 h-24 translate-y-0"
					leaveTo="opacity-0 h-0 -translate-y-5"
				>
					{category.subcategory.map((subcategory, index) => {
						return (
							<div
								className="flex items-center space-x-3 pl-9"
								key={index}
								// ref={dropref}
							>
								<div className="w-4 h-4 rounded-full bg-lxl hover:bg-rose-300"></div>
								<Link href={subcategory.slug}>
									<p className="text-black p-1 hover:bg-lxl rounded-md">
										{subcategory.title}
									</p>
								</Link>
							</div>
						);
					})}
				</Transition>
			)}
		</div>
	);
}

function DropdownMenu({ categories }: { categories: Category[] }) {
	return (
		<div className="absolute flex-row top-[280px] w-[190px]  bg-white border right-[3.5rem] rounded-lg overflow-hidden z-50 p-6 space-y-2">
			{categories.map((category, index) => {
				return <DropdownItems category={category} key={index} />;
			})}
		</div>
	);
}

export default Header;
