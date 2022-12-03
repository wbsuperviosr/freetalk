import { GetStaticPaths, GetStaticProps } from "next";
import Header from "../../components/Header";
// import PortableText from "react-portable-text"
import { getClient } from "../../utils/sanity";
import { Category, Post, StaticProps } from "../../models/sanityModel"
import { PortableText, PortableTextComponents } from '@portabletext/react'
// import { Player } from 'video-react';


interface PTC extends PortableTextComponents {
    block: any
}


const myPortableTextComponents: PTC = {

    marks: {
        link: (props: any) => {
            return (
                <a className={"text-teal-300 underline"} href={props.value.href}>{props.children}</a>
            )
        },
        imagelink: (props: any) => {
            return <img src={props.value.href} alt={props.text} />
        },
        internalLink: (props: any) => {
            return <span>{props.children}</span>
        },
        videolink: (props: any) => {
            // return <Player autoPlay>
            //     <source src={props.value.href}></source>
            // </Player>
            return <video controls autoPlay>
                <source src={props.value.href} type="video/mp4" />
            </video>
        },
        u: (props: any) => {
            return <u>{props.children}</u>
        }
    },
    list: {
        bullet: ({ children }) => <ul className="py-2 ml-1 list-sisc list-inside">{children}</ul>,
        number: ({ children }) => <ol className="py-2 ml-1 list-decimal list-inside">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="pb-2">{children}</li>,
        number: ({ children }) => <li className="pb-2">{children}</li>
    },
    block: {
        blockquote: ({ children }: { children: string }) => {
            return <blockquote className="text-gray-500 px-2 border-l-2">{children}</blockquote>
        },
        h1: ({ children }: { children: string }) => {
            return <h1 className="text-4xl font-bold py-2">{children}</h1>
        },
        h2: ({ children }: { children: string }) => {
            return <h2 className="text-3xl font-bold py-2">{children}</h2>
        },
        h3: ({ children }: { children: string }) => {
            return <h3 className="text-2xl font-bold py-2">{children}</h3>
        },
        h4: ({ children }: { children: string }) => {
            return <h4 className="text-xl font-bold py-2">{children}</h4>
        },
        h5: ({ children }: { children: string }) => {
            return <h5 className="text-lg font-bold py-2">{children}</h5>
        },
        h6: ({ children }: { children: string }) => {
            return <h6 className="text-md font-bold py-2">{children}</h6>
        },



    }
}

export default function PostPage({ posts }: StaticProps) {
    const post = posts[0]
    // console.log(post)
    return <div className="max-w-6xl mx-auto">
        <img className='w-full max-w-6xl mx-auto h-40 object-cover object-center justify-center'
            src={post.mainImageUrl} alt="" />
        <article>
            <h1 className='text-3xl mt-10 mb-3 ml-5 mr-5'>
                {post.title}
            </h1>
            <h2 className='text-sm font-light text-gray-500 mb-2  ml-5 mr-5'>{post.description}</h2>

            <div className='flex items-center space-x-2  ml-5 mr-5'>
                <p className='font-extralight text-sm'>
                    <span className='text-green-600'>{post.author.name}</span> - {new Date(post.writtenAt!).toLocaleString()}
                </p>
            </div>

            <div className="p-5 space-y-3 text-justify">
                <PortableText value={post.body!} components={myPortableTextComponents} />
            </div>

        </article>
    </div>

}

export const getStaticPaths: GetStaticPaths = async () => {

    const client = getClient(true);

    const post_query = `
    *[_type=="post"]|order(_updatedAt desc){
      _id, 
      slug,
    }`

    const posts: Post[] = await client.fetch(post_query)
    const paths = posts.map((post) => {
        return {
            params: {
                uid: post.slug.current
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

    const client = getClient(true);

    const post_query = `
    *[_type=="post"&& slug.current==$slug]{
      _id, 
      _createdAt,
      _updatedAt,
      title, 
      slug,
      author->{
        name,
        imageUrl
      },
      mainImageUrl,
      featured,
      categories,
      tags,
      publishedAt,
      writtenAt,
      description,
      body,
    }
  `
    const posts: Post[] = await client.fetch(post_query, { slug: params?.uid })
    return {
        props: {
            posts: posts,
        }
    }
}
