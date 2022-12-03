import { GetStaticProps } from 'next'
import React, { Fragment } from 'react'
import { Timeline } from '../models/timeLine'
import timelines from "../timeline.json"


function getUniquePeople(data: Timeline[]) {
    const map = new Map<string, string[]>()
    data.map((timeline) => {
        const peoples = timeline.details.map((detail) => {
            return detail.events.map((event) => {
                return event.people
            })
        })
        const unique = [... new Set(peoples.flat(2))]
        unique.unshift('所有')
        return map.set(timeline.category, unique)
    })
    return map
}

function getSelectedCategory(cateMap: Map<string, boolean>): string {
    for (const entry of cateMap) {
        if (entry[1]) {
            return entry[0]
        }
    }
    return "Error"
}


const CategoryGroup = ({ data }: { data: Timeline[] }) => {
    const uniquePeople = getUniquePeople(data)
    const [category, setCategory] = React.useState(data[0].category)

    const setBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        console.log(e.currentTarget.value)
        const currentSelect = e.currentTarget.value
        e.preventDefault();
        setCategory(currentSelect);
    }

    const curTimeline = data.filter((timeline) => {
        return timeline.category === category
    })[0]
    console.log(curTimeline)
    return <div className='flex flex-col'>
        <p className='text-sm font-noto text-gray-400'>根据类型选择:</p>
        <div className="inline-flex rounded-md shadow-sm" role="group">
            {data.map((timeline, index) => {
                return <button onClick={setBtnClick} defaultChecked={index == 0 ? true : false} value={timeline.category} type="button" className="py-1 px-1 text-xs font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    {timeline.category}
                </button>
            })}
        </div>
        <p>current select: {category}</p>
        <p className='text-sm font-noto text-gray-400'>按事件人物筛选:</p>
        <div className='flex flex-wrap space-x-1'>
            {uniquePeople.get(category)!.map((people) => {
                return <div className="py-1 px-1 text-xs font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">{people}</div>
            })}
        </div>
        <div className='p-5'>
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                {curTimeline.details.map((detail, index1) => {
                    return detail.events.map((event, index2) => {
                        return <li className="mb-10 ml-4" key={index1}>
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <div className='flex justify-between mx-auto'>
                                <time className="mb-1 text-sm font-bold leading-none text-black dark:text-gray-300">{detail.date}</time>
                                <div className='flex mb-2 text-sm font-normal leading-none text-black space-x-1'>
                                    {event.people.map((p) => {
                                        return <div className=' text-[#D48166]'>{p}</div>
                                    })}
                                </div>
                            </div>

                            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{event.event}</p>
                        </li>
                    })
                })}


            </ol>
        </div>



    </div>
}
// return <li className="mb-10 ml-4" key={index}>
// <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
// <time className="mb-1 text-sm font-normal leading-none text-black dark:text-gray-300">{detail.date}</time>
// <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>


function Timeline({ data }: { data: Timeline[] }) {

    return (<div className='p-5'>
        <CategoryGroup data={data} />
    </div>)
}

export default Timeline

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            data: timelines
        }
    }
}


// return (
    // <div className='p-5'>
    //     <ol className="relative border-l border-gray-200 dark:border-gray-700">
    //         <li className="mb-10 ml-4">
    //             <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
    //             <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February 2022</time>
    //             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Application UI code in Tailwind CSS</h3>
    //             <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>

    //         </li>
    //         <li className="mb-10 ml-4">
    //             <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
    //             <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">March 2022</time>
    //             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Marketing UI design in Figma</h3>
    //             <p className="text-base font-normal text-gray-500 dark:text-gray-400">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
    //         </li>
    //         <li className="ml-4">
    //             <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
    //             <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">April 2022</time>
    //             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">E-Commerce UI code in Tailwind CSS</h3>
    //             <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p>
    //         </li>
    //     </ol>
    // </div>
// )