

import Link from 'next/link'
import React from 'react'
import { PostsResponse, PostData, PostDetail } from "../models/strapi_model"


interface CardProps {
    post: PostData
    show_description: boolean
}


function Card({ post, show_description }: CardProps) {
    const display_type: string = show_description ? "" : "flex"
    const padding_left: string = show_description ? "" : "pl-6"

    const leading_class: string = 'w-full h-96 mx-auto justify-center object-none object-bottom hover:scale-105 transition-transform duration-200 ease-in-out'
    const side_class: string = 'w-32 h-40 object-cover mx-auto justify-center md:w-48 hover:scale-105 transition-transform duration-200 ease-in-out'

    const img_class = show_description ? leading_class : side_class;

    return (
        <Link className='' href={`posts/${post.attributes.uid}`}>
            <div className={`${display_type}`}>
                <div className=''>
                    <img className={img_class} src={post.attributes.thumbnail} alt="" />
                </div>

                <div className={padding_left}>
                    <div className='flex text-light text-gray-600 text-xs mb-3 space-x-2'>
                        <p className='text-light text-gray-600 text-xs '>
                            {new Date(post.attributes.publishedAt).toLocaleString()}
                        </p>
                        <p className='text-gray-500 font-bold font-kaiti'>
                            {post.attributes.author}
                        </p>
                    </div>

                    <div>
                        <h1 className='font-bold font-noto text-black text-xl mb-3 overflow-hidden'>{post.attributes.title}</h1>
                    </div>
                </div>
            </div>

            <div>

                {
                    show_description &&
                    <section className='text-sm text-gray-700'>
                        {post.attributes.description}
                    </section>
                }

            </div>
        </Link>
    )
}


function Headline({ data }: PostsResponse) {
    return (
        <div className='flex flex-col md:grid grid-rows-3 grid-cols-2 gap-12 p-10 bg-yellow-400 '>
            <div className='row-span-3'>
                < Card post={data[1]} show_description={true} />
            </div >

            <div className='row-span-1 '>
                <Card post={data[0]} show_description={false} />
            </div>
            <div className='row-span-1'>
                <Card post={data[2]} show_description={false} />
            </div>
            <div className='row-span-1' >
                <Card post={data[3]} show_description={false} />
            </div>
        </div >
    )
}

export default Headline