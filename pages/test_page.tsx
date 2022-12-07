import React from 'react'
// import getCategory from "../utils/getCategory"
import { Bars4Icon, ChevronDownIcon, CheckBadgeIcon } from '@heroicons/react/20/solid'
import { CSSTransition } from 'react-transition-group';
import BellIcon from '../public/icons/bell.svg';
import MessengerIcon from '../public/icons/messenger.svg';
import CaretIcon from '../public/icons/caret.svg';
import PlusIcon from '../public/icons/plus.svg';
import CogIcon from '../public/icons/cog.svg';
import ChevronIcon from '../public/icons/chevron.svg';
import ArrowIcon from '../public/icons/arrow.svg';
import BoltIcon from '../public/icons/bolt.svg';

import categories from '../categories.json'
import { Category } from '../models/sanityModel';


type NavbarProps = {
    children: React.ReactNode;
}

type NavItemProps = {
    icon: React.ReactNode;
    children?: React.ReactNode;
}

type DropdownItemProps = {
    children?: React.ReactNode;
    goToMenu?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    setActiveMenu: (goToMenu: string) => void;
}

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


function test_page(categories: Category) {
    return (
        <Navbar>
            <NavItem icon={<PlusIcon />} />
            <NavItem icon={<BellIcon />} />
            <NavItem icon={<MessengerIcon />} />

            <NavItem icon={<Bars4Icon />}>
                <DropdownMenu></DropdownMenu>
            </NavItem>
        </Navbar>
    )
}

function Navbar(props: NavbarProps) {
    return <nav className='pr-4 h-16'>
        <ul className='max-w-full h-full flex justify-end'>
            {props.children}
        </ul>
    </nav>
}

function NavItem(props: NavItemProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <li className='flex justify-center items-center w-14'>
            {/* icon-button */}
            <a href="#" className='flex w-7 h-7 p-[4px] m-1 items-center justify-center transition-[filter] duration-300 hover:brightness-200' onClick={() => setOpen(!open)}>
                {props.icon}
            </a>
            {open && props.children}
        </li>
    )
}
function DropdownItem(props: DropdownItemProps) {
    return (
        //  menu-item
        <a href="#" className="flex h-[50px] items-center p-2 rounded-lg transition-[background] duration-500 hover:bg-slate-100" onClick={() => props.goToMenu && props.setActiveMenu(props.goToMenu)}>
            <span className="icon-button mr-1">{props.leftIcon}</span>
            {props.children}
            <span className="icon-right ml-auto">{props.rightIcon}</span>
        </a>
    );
}
function DropdownMenu() {
    const [activeMenu, setActiveMenu] = React.useState('main');
    const [menuHeight, setMenuHeight] = React.useState<null | number>(null);
    const dropdownRef = React.useRef<any>(null);
    const nodeRef = React.useRef(null);
    const secRef = React.useRef(null);

    React.useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    function calcHeight(el: HTMLElement) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }


    return (
        // dropdown 
        <div className={`absolute h-${menuHeight} shadow-md top-[130px] w-[300px] overflow-hidden translate-x-[-45%] p-4 transition-height duration-500 ease-in-out`} ref={dropdownRef}>

            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames={primaryMenuClasses}
                unmountOnExit
                nodeRef={nodeRef}
                onEnter={calcHeight}>
                <div className="w-full" ref={nodeRef}>
                    <DropdownItem setActiveMenu={setActiveMenu} leftIcon={<MessengerIcon fill="black" widht='20px' height='20px' />}>My Profile</DropdownItem>
                    <DropdownItem setActiveMenu={setActiveMenu}
                        leftIcon={<CogIcon fill="black" widht='20px' height='20px' />}
                        rightIcon={<ChevronIcon fill="black" widht='20px' height='20px' />}
                        goToMenu="settings">
                        Settings
                    </DropdownItem>
                    <DropdownItem setActiveMenu={setActiveMenu}
                        leftIcon="🦧"
                        rightIcon={<ChevronIcon fill="black" widht='20px' height='20px' />}
                        goToMenu="animals">
                        Animals
                    </DropdownItem>

                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'settings'}
                timeout={500}
                classNames={secondaryMenuClasses}
                unmountOnExit
                nodeRef={secRef}
                onEnter={calcHeight}>
                <div className="w-full" ref={secRef}>
                    <DropdownItem setActiveMenu={setActiveMenu} goToMenu="main" leftIcon={<ArrowIcon fill="black" widht='20px' height='20px' />}>
                        <h2>My Tutorial</h2>
                    </DropdownItem>
                    <DropdownItem setActiveMenu={setActiveMenu} leftIcon={<BoltIcon fill="black" widht='20px' height='20px' />}>HTML</DropdownItem>
                    <DropdownItem setActiveMenu={setActiveMenu} leftIcon={<BoltIcon fill="black" widht='20px' height='20px' />}>CSS</DropdownItem>
                    <DropdownItem setActiveMenu={setActiveMenu} leftIcon={<BoltIcon fill="black" widht='20px' height='20px' />}>JavaScript</DropdownItem>
                    <DropdownItem setActiveMenu={setActiveMenu} leftIcon={<BoltIcon fill="black" widht='20px' height='20px' />}>Awesome!</DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'animals'}
                timeout={500}
                classNames={secondaryMenuClasses}
                unmountOnExit
                nodeRef={secRef}
                onEnter={calcHeight}>
                <div className="w-full" ref={secRef}>
                    <DropdownItem setActiveMenu={setActiveMenu} goToMenu="main" leftIcon={<ArrowIcon fill="black" widht='20px' height='20px' />}>
                        <h2>Animals</h2>
                    </DropdownItem>
                    <DropdownItem setActiveMenu={setActiveMenu} leftIcon="🦘">Kangaroo</DropdownItem>
                    <DropdownItem setActiveMenu={setActiveMenu} leftIcon="🐸">Frog</DropdownItem>
                    <DropdownItem setActiveMenu={setActiveMenu} leftIcon="🦋">Horse?</DropdownItem>
                    <DropdownItem setActiveMenu={setActiveMenu} leftIcon="🦔">Hedgehog</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    );
}


export default test_page