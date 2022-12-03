import Link from 'next/link'
import React, { Fragment } from 'react'
import { Post } from '../models/sanityModel'


export function slideButtons({ headlinePosts }: { headlinePosts: Post[] }) {
    console.log("hello world")
    return headlinePosts.map((post, index) => {
        return (<button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={`${index}`}
            className={!index ? "active" : ""}
            aria-current="true"
            aria-label={`Slide ${index + 1}`}
        />)
    })
}


export function slidePicture({ headlinePosts }: { headlinePosts: Post[] }) {
    // return <div>test</div>
    return (
        <div className="carousel-inner relative w-full overflow-hidden">
            <div className="carousel-item active float-left w-full">
                {headlinePosts.map((post) => {
                    return (

                        <Fragment>
                            <img
                                src={post.mainImageUrl}
                                className="block w-full rounded-t-xl"
                                alt="Wild Landscape"
                            />
                            <div>test text</div>
                        </Fragment>

                    )
                })}
            </div>
        </div>

    )
}



export default function PostSlider({ headlinePosts }: { headlinePosts: Post[] }) {
    return (
        <div id="carouselExampleIndicators" className="carousel slide carousel-dark relative h-80 border m-4 rounded-xl" data-bs-ride="carousel">
            <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                {headlinePosts.map((post, index) => {
                    return (<button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={`${index}`}
                        className={!index ? "active w-5" : "w-5"}
                        aria-current={!index ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                    />)
                })}
            </div>

            <div className="carousel-inner relative w-full overflow-hidden">

                {headlinePosts.map((post, index) => {
                    return (

                        <div className={`carousel-item float-left w-full ${index == 0 ? 'active' : ''}`}>
                            <Link href={`/posts/${post.slug.current}`}>
                                <img
                                    src={post.mainImageUrl}
                                    className="block w-full max-h-40 object-cover rounded-t-xl"
                                    alt=""
                                />
                                <div>
                                    <div className='text-gray-500 text-xs pl-2 pt-2 pb-1 flex flex-row divide-x space-x-1'>
                                        <p>{new Date(post.writtenAt!).toLocaleString()}</p>
                                        <p>{post.author.name}</p>
                                    </div>
                                    <div className='text-bold font-noto pl-2 text-lg'>
                                        {post.title}
                                    </div>
                                    <div className='text-xs p-2'>
                                        <p className='text-gray-500 '>{post.description}
                                            <span className='inline text-black font-bold underline'>阅读更多</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    )
                })}

            </div>
            {/* <button
                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button> */}
        </div>
    )
}

