import { GetStaticProps } from 'next'
import React, { Fragment } from 'react'
import { Timeline, Event } from '../models/timeLine'
import timelines from "../timeline.json"


function getUniquePeople(timeline: Timeline) {

    const peoples = timeline.details.map((detail) => {
        return detail.events.map((event) => {
            return event.people
        })
    })
    const unique = [... new Set(peoples.flat(2))]
    return unique
}

function getActivePeople(map: Map<string, boolean>): string[] {
    const activePeople = []
    for (const entry of map) {
        if (entry[1]) {
            activePeople.push(entry[0])
        }
    }
    if (activePeople.length == 0) {
        return Array.from(map.keys())
    }
    return activePeople
}

function isInActivate(eventPeople: string[], activePeople: string[]): boolean {
    // console.log(eventPeople, activePeople, activePeople.includes(eventPeople[0]))

    for (const people of eventPeople) {
        if (activePeople.includes(people)) {
            return true;
        }
    }
    return false;
}




type PeopleRegister = (name: string, toggle: boolean) => void;
type PeopleBtnProps = {
    name: string;
    initialState: boolean;
    register: PeopleRegister;
}
type PeopleBtnState = {
    isActive: boolean
}


class PeopleBtn extends React.Component<PeopleBtnProps, PeopleBtnState>{
    constructor(props: PeopleBtnProps) {
        super(props);
        this.state = { isActive: props.initialState };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
        const currentTarget = e.currentTarget.value
        this.setState({ isActive: !this.state.isActive }, () => {
            this.props.register(currentTarget, this.state.isActive)
        })
    }

    render(): React.ReactNode {
        return <button onClick={this.handleToggle} type='button' value={this.props.name} className={`py-1 px-1 text-xs font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 ${this.state.isActive ? "z-10 ring-2 ring-blue-700 text-blue-700" : ""}`}>{this.props.name}</button>
    }
}



type CategoryGroupProps = {
    timeline: Timeline
}
type CategoryGroupState = {
    map: Map<string, boolean>;
}

type EventRecordProps = {
    event: Event;
    date: string;
    activePeople: string[];
    index: string;
}
class EventRecord extends React.Component<EventRecordProps>{
    constructor(props: EventRecordProps) {
        super(props)
    }

    render(): React.ReactNode {
        return (isInActivate(this.props.event.people, this.props.activePeople)) && <li className="mb-10 ml-4" key={this.props.index}>
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <div className='flex justify-between mx-auto'>
                <time className="mb-1 text-sm font-bold leading-none text-black dark:text-gray-300">{this.props.date}</time>
                <div className='flex mb-2 text-sm font-normal leading-none text-black space-x-1'>
                    {this.props.event.people.map((p) => {
                        return <div className=' text-[#D48166]'>{p}</div>
                    })}
                </div>
            </div>

            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{this.props.event.event}</p>
        </li>
    }
}

class CategoryGroup extends React.Component<CategoryGroupProps, CategoryGroupState>{
    constructor(props: CategoryGroupProps) {
        super(props)
        const uniquePeople = getUniquePeople(props.timeline);
        this.state = { map: new Map<string, boolean> };
        uniquePeople.map(people => this.state.map.set(people, false));
        this.register = this.register.bind(this);

    }

    register = (name: string, toggle: boolean) => {
        this.setState({ map: new Map<string, boolean>(this.state.map.set(name, toggle)) });

    }


    render(): React.ReactNode {
        const uniquePeople = Array.from(this.state.map.keys())
        const activePeople = getActivePeople(this.state.map);
        return (<div className='flex flex-col'>

            <p className='text-sm font-noto text-gray-400'>按事件人物筛选:</p>

            <div className='flex flex-wrap space-x-1'>
                {uniquePeople.map((people, index) => {
                    return <PeopleBtn name={people} initialState={false} register={this.register} key={index} />
                })}
            </div>

            <div className='p-5'>
                <ol className='relative border-l border-gray-200'>
                    {this.props.timeline.details.map((detail, index1) => {
                        return detail.events.map((event, index2) => {
                            return <EventRecord event={event} activePeople={activePeople} date={detail.date} index={`${index1}-${index2}`} />
                        })
                    })}
                </ol>
            </div>

        </div>)
    }

}


function Timeline({ data }: { data: Timeline[] }) {
    const [category, setCategory] = React.useState(data[0].category)

    const categoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCategory(e.currentTarget.value)
    }

    return (
        <div className='p-5'>
            <p className='text-sm font-noto text-gray-400'>根据类型选择:</p>
            <div className="inline-flex rounded-md shadow-sm" role="group">
                {data.map((timeline, index) => {
                    return <button onClick={categoryClick} defaultChecked={index == 0 ? true : false} key={index} value={timeline.category} type="button" className="py-1 px-1 text-xs font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        {timeline.category}
                    </button>
                })}
            </div>
            <p>current select: {category}</p>
            {data.map((timeline, index) => {
                return (timeline.category == category) && <CategoryGroup timeline={timeline} key={index} />
            })}

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

