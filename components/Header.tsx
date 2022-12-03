import Link from "next/link";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Bars4Icon } from '@heroicons/react/20/solid'

import React from 'react'
import { Category, Subcategory } from "../models/sanityModel";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}


export function MainMenu({ category }: { category: Category }) {
    return (
        <li key={category.slug.current} >
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        「{category.title}」
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="divide-y divide-gray-100">
                            {category.subcategory.map((subcategory) => {
                                return <Menu.Item key={subcategory.slug.current}>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            {subcategory.title}
                                        </a>
                                    )}
                                </Menu.Item>
                            })}

                        </div>
                    </Menu.Items>
                </Transition>

            </Menu>

        </li>
    )
}



function MobileSubMenu({ subcategory }: { subcategory: Subcategory }) {
    return <Menu.Item key={subcategory.slug.current}>
        {({ active }) => (
            <a
                href="#"
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                )}
            >
                {subcategory.title}
            </a>
        )}
    </Menu.Item>
}



export function MobileMenu({ categories }: { categories: Category[] }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    <Bars4Icon className="h-5 w-5" />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">

                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div>
                        {categories.map((category, index) => {
                            return <Fragment key={index}>
                                <div key={index} className="text-md font-noto ">「{category.title}」</div>
                                {category.subcategory.map((subcategory, index1) => {
                                    return <MobileSubMenu key={`${index}-${index1}`} subcategory={subcategory} />
                                })}
                            </Fragment>
                        })}

                    </div>
                </Menu.Items>
            </Transition>

        </Menu>
    )
}


function Header({ categories }: { categories: Category[] }) {

    return (
        <div className="w-full h-20 flex justify-between items-center px-6 md:justify-start">
            <Link href="/">
                <img className="w-12 h-12  pl-2 object-contain" src="/coca-leaves.png" alt="" />
            </Link>
            <ul className="hidden md:flex items-center ">
                <li key='home' className="p-5 text-sm font-medium text-gray-700">首页</li>

                {categories.map((category, index) => {
                    return <MainMenu category={category} key={index} />
                })}
            </ul>

            <div className="block md:hidden">
                <p className="text-lg text-center font-noto font-bold text-gray-700">九纸书笺</p>
                <p className="text-xs text-center text-gray-400">LIUXIN.EXPRESS</p>
            </div>

            <div className="block md:hidden">
                <MobileMenu categories={categories} />
            </div>

        </div>
    )
}

export default Header



