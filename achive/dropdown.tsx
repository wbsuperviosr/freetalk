import { useEffect, useRef, useState } from "react";
import { Category } from "../models/sanityModel";
import { CSSTransition } from "react-transition-group";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ArrowIcon from "../public/icons/arrow.svg";

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

			{props.categories.map((category, cateindex) => {
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
