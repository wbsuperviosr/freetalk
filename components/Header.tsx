import ArrowIcon from "../public/icons/arrow.svg";
import { Bars3BottomLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import Girl from "../public/icons/girl.svg";

import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Category } from "../models/sanityModel";
import categories from "../categories.json";

export function SiteLogo() {
	return (
		<a href="/" className="flex items-center pl-5 space-x-2">
			<div>
				<Girl
					fill="black"
					className="w-9 outline-2 border border-black rounded-full"
				/>
			</div>
			<p className="text-gray-400 font-mono tracking-widest">
				LIUXIN.EXPRESS
			</p>
		</a>
	);
}

type HeroImageProps = {
	title: string;
	text: string[];
	subtext: string;
	link: string;
};

export function HeroImage(props: HeroImageProps) {
	return (
		<div className="relative">
			<img
				className="w-full h-52 object-cover"
				src={props.link}
				alt="cover"
			/>
			<p className="absolute top-0 left-0 pt- text-white text-2xl pl-5 pt-6">
				{props.title}
			</p>

			<div className="absolute top-0 left-0 pt-16 pl-9">
				{props.text.map((t, index) => {
					return (
						<p
							key={index}
							className="text-white text-[13px] opacity-90"
						>
							{t}
						</p>
					);
				})}
			</div>

			<hr className="absolute top-0 ml-[70%] mt-[32%] h-[2px] w-20 bg-gray-200 border-5 border-white opacity-70" />

			<p className="absolute bottom-0 ml-20 mr-5 mb-10 text-white text-[10px] tracking-widest opacity-90">
				{props.subtext}
			</p>
		</div>
	);
}

function Header(props: HeroImageProps) {
	return (
		<header className="border-b-2 shadow-lg">
			<HeroImage {...props} />
			<div className="flex justify-between">
				<SiteLogo />
				<Navbar>
					<NavItem
						icon={
							<Bars3BottomLeftIcon
								fill="white"
								className="w-9 text-white bg-black rounded-full p-1 items-center justify-center transition-all duration-300 hover:filter hover:brightness-200"
							/>
						}
					>
						<DropdownMenu categories={categories}></DropdownMenu>
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

			{open && props.children}
		</li>
	);
}

type DropdownItemProps = {
	children?: React.ReactNode;
	setActiveMenu: (goToMenu: string) => void;
	goToMenu?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
};

function DropdownItem(props: DropdownItemProps) {
	return (
		<a
			href="#"
			className="menu-item text-black"
			onClick={() =>
				props.goToMenu && props.setActiveMenu(props.goToMenu)
			}
		>
			{props.leftIcon && (
				<span className="icon-button">{props.leftIcon}</span>
			)}
			<div className="flex justify-between space-x-14">
				<div className="text-gray-600">{props.children}</div>
				<div>
					{props.rightIcon && (
						<span className="icon-right">{props.rightIcon}</span>
					)}
				</div>
			</div>
		</a>
	);
}

function DropdownMenu(props: { categories: Category[] }) {
	const [activeMenu, setActiveMenu] = useState("main");
	const [menuHeight, setMenuHeight] = useState<number | null>(null);
	const dropdownRef = useRef<any>(null);
	const primeRef = useRef<any>(null);
	const secRef = useRef<any>(null);

	useEffect(() => {
		setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
	}, []);

	function calcHeight(el: HTMLElement) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	return (
		//
		<div
			className={`dropdown bg-white shadow-md divide-y-2 divide-slate-400`}
			style={{ height: menuHeight! }}
			ref={dropdownRef}
		>
			<CSSTransition
				in={activeMenu === "main"}
				classNames="menu-primary"
				timeout={500}
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className="w-full" ref={primeRef}>
					{props.categories.map((category, index) => {
						return (
							<DropdownItem
								key={index}
								setActiveMenu={setActiveMenu}
								goToMenu={category.title}
								rightIcon={
									<ArrowRightIcon className="w-6 text-gray-300" />
								}
							>
								{category.title}
							</DropdownItem>
						);
					})}
				</div>
			</CSSTransition>

			{categories.map((category, cateindex) => {
				return (
					<CSSTransition
						in={activeMenu === category.title}
						key={cateindex}
						timeout={500}
						unmountOnExit
						classNames="menu-secondary"
						// nodeRef={dropdownRef}
						onEnter={calcHeight}
					>
						<div className="w-full" ref={secRef}>
							<DropdownItem
								setActiveMenu={setActiveMenu}
								goToMenu="main"
								leftIcon={
									<ArrowIcon
										fill="black"
										widht="20px"
										height="20px"
									/>
								}
							>
								<p>返回</p>
							</DropdownItem>
							{category.subcategory.map((subcategory, index) => {
								return (
									<DropdownItem
										key={index}
										setActiveMenu={setActiveMenu}
									>
										{subcategory.title}
									</DropdownItem>
								);
							})}
						</div>
					</CSSTransition>
				);
			})}
		</div>
	);
}

export default Header;
