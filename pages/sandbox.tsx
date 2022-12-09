import Link from 'next/link';
import React from 'react'
import Logo from "../public/logo.svg"
import { Bars3Icon } from '@heroicons/react/20/solid'
import { CSSTransition } from 'react-transition-group';
import ChevronIcon from '../public/icons/chevron.svg';
import ArrowIcon from '../public/icons/arrow.svg';
import { Category } from '../models/sanityModel';
import categories from '../categories.json'

const primaryMenuClasses = {
	enter: "absolute translate-x-[-110%]",
	enterActive: "translate-x-[0%] transition-all duration-600 ease-linear",
	exit: "absolute",
	exitActive: "translate-x-[-110%] transition-all duration-600 ease-linear"
}

const secondaryMenuClasses = {
	enter: "translate-x-[110%]",
	enterActive: "translate-x-[0%] transition-all duration-600 ease-linear",
	exitActive: "translate-x-[110%] transition-all duration-600 ease-linear"
}


type DropdownItemProps = {
	children?: React.ReactNode;
	setActiveMenu: (goToMenu: string) => void;
	goToMenu?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;

}



type DropdownProps = {
	children?: React.ReactElement<DropdownItem> | React.ReactElement<DropdownItem>[];
	icon?: React.ReactNode;
}

type DropdownStates = {
	open: boolean;
}


type MobileMenuStates = {
	height?: number;
	activeMenu: string;
}


type MobileMenuProps = {
	categories: Category[]
}


export class DropdownItem extends React.Component<DropdownItemProps> {

	render(): React.ReactNode {
		return (
			//  menu-item
			<a href="#" className="flex h-[50px] items-center p-3 rounded-lg transition-[background] duration-500 hover:bg-slate-100" onClick={() => this.props.goToMenu && this.props.setActiveMenu(this.props.goToMenu)}>
				<span className="icon-button mr-1">{this.props.leftIcon}</span>
				{this.props.children}
				<span className="icon-right ml-auto">{this.props.rightIcon}</span>
			</a>
		);
	}
}



export class MobileMenu extends React.Component<MobileMenuProps, MobileMenuStates> {
	dropdownRef = React.createRef<any>()
	nodeRef = React.createRef<any>()
	secRef = React.createRef<any>()

	constructor(props: MobileMenuProps) {
		super(props)
		this.state = {
			height: 0,
			activeMenu: "main"
		}
		this.calcHeight = this.calcHeight.bind(this)
		this.setActiveMenu = this.setActiveMenu.bind(this)
	}


	componentDidMount(): void {
		this.setState({ height: this.dropdownRef.current?.firstChild.offsetHeight })
	}

	calcHeight(el: HTMLElement): void {
		const height = el.offsetHeight;
		this.setState({ ...this.state, height: height })
	}

	setActiveMenu(goToMenu: string): void {
		console.log("active:", goToMenu)
		this.setState({ ...this.state, activeMenu: goToMenu })
	}

	render(): React.ReactNode {
		return <div className={`absolute h-${this.state.height} shadow-md top-[260px] w-[200px] overflow-hidden translate-x-[-45%]  transition-height duration-300 ease-in-out`} ref={this.dropdownRef}>
			<CSSTransition
				in={this.state.activeMenu === 'main'}
				timeout={500}
				classNames={primaryMenuClasses}
				unmountOnExit
				nodeRef={this.nodeRef}
				onEnter={this.calcHeight}>
				<div className="w-full" ref={this.nodeRef}>
					{this.props.categories.map((category) => {
						return (
							<DropdownItem
								setActiveMenu={this.setActiveMenu}
								goToMenu={category.title}
								rightIcon={<ChevronIcon fill="black" widht='20px' height='20px' />}
							// rightIcon=">"
							>
								{category.title}
							</DropdownItem>)
					})}

				</div>
			</CSSTransition>

			{categories.map((category) => {
				return <CSSTransition
					in={this.state.activeMenu === category.title}
					timeout={500}
					classNames={secondaryMenuClasses}
					unmountOnExit
					nodeRef={this.secRef}
					onEnter={this.calcHeight}>
					<div className="w-full" ref={this.secRef}>
						<DropdownItem
							setActiveMenu={this.setActiveMenu}
							goToMenu="main"
							leftIcon={<ArrowIcon fill="black" widht='20px' height='20px' />}
						>
							<h2>返回</h2>
						</DropdownItem>
						{category.subcategory.map((subcategory) => {
							return (
								<DropdownItem setActiveMenu={this.setActiveMenu}>
									{subcategory.title}
								</DropdownItem>)
						})}
					</div>
				</CSSTransition>
			})}


		</div>
	}
}


export class Dropdown extends React.Component<DropdownProps, DropdownStates> {
	state = { open: false }

	render(): React.ReactNode {
		return (
			<li className='flex justify-center items-center w-14'>
				<a href="#" className='flex items-center justify-center transition-[filter] duration-300 hover:brightness-200' onClick={() => this.setState({ open: !this.state.open })}>
					{this.props.icon}
				</a>
				{this.state.open && this.props.children}
			</li>
		)
	}
}

type HeroImageProps = {
	title: string;
	text: string[];
	subtext: string;
	link: string;

}

const heropros: HeroImageProps = {
	title: "「九纸书笺」",
	text: ["所有的事情有因必有果。", "大家只看了结果，且结果只是一面之词"],
	subtext: "我们尽可能地保存那些微弱的声音，那些隐蔽的细节。历史的夜空中，任何一粒星屑，都有它被凝视的意义",
	link: "https://assets.wbavengers.com/background_imgs/header_main.png"
}


export class HeroImage extends React.Component<HeroImageProps> {
	render() {
		return (
			<div className='relative'>
				<img className='w-full h-52 object-cover' src={this.props.link} alt="cover" />
				<p className='absolute top-0 left-0 pt- text-white text-2xl pl-5 pt-6'>
					{this.props.title}
				</p>

				<div className='absolute top-0 left-0 pt-16 pl-9'>
					{this.props.text.map((t) => {
						return <p className='text-white text-[13px] opacity-90'>
							{t}
						</p>
					})}
				</div>

				<hr className='absolute top-0 ml-[70%] mt-[32%] h-[2px] w-20 bg-gray-200 border-5 border-white opacity-70' />

				<p className='absolute bottom-0 ml-20 mr-5 mb-10 text-white text-[10px] tracking-widest opacity-90'>
					{this.props.subtext}
				</p>
			</div>
		)
	}
}

export class Header extends React.Component {

	render() {
		return (
			<header className='flex justify-between p-5'>

				<div className='flex items-center pl-2'>
					<div className='h-8 w-8 p-[3px] rounded-full outline outline-black outline-offset-2 outline-1'>
						<Link href="/">
							<Logo fill='black' ></Logo>
						</Link>
					</div>
					<p className='text-gray-500 font-noto font-bold text-xs pl-3 tracking-[4px]'>
						LIUXIN.EXPRESS
					</p>
				</div>

				<div>
					<Dropdown icon={<Bars3Icon className='h-8 w-8 bg-black text-white rounded-full p-[1.5px] [&>path]:stroke-[3px]' />} >
						<MobileMenu categories={categories} />
					</Dropdown>

				</div>


			</header>
		)
	}
}





export default class Sandbox extends React.Component {
	render(): React.ReactNode {
		return (< div>
			<HeroImage {...heropros}></HeroImage>
			<Header></Header>

		</div>)
	}
}



