import Header from '../components/Header'
import { GetStaticProps } from "next";
import { Category, Post, StaticProps } from "../models/sanityModel"
import { getClient } from "../utils/sanity"
import Hero from '../components/Hero';
import PostSlider from '../components/PostSlider';
import Navblock from '../components/Navblock';
import fs from "fs"
import Link from 'next/link';


const TimeLineBlock = () => {
  return <div className='flex flex-col m-5 h-60 border align-middle bg-yellow-300'>
    <p className='text-4xl text-center mt-16 text-white tracking-wide underline underline-offset-[5px] shadow-xl'>
      <Link href="/timeline">这里有时间线，还不快点到碗里来！</Link>
    </p>
    <p className='text-lg pt-5 text-center text-teal-400 font-bold shadow-sm'>
      @果酱, 这一块的艺术造型就靠你了
    </p>
  </div>
}


const Home = ({ posts, categories }: StaticProps) => {


  return (
    <div className='max-w-7xl mx-auto '>
      <Hero />
      <PostSlider headlinePosts={posts} />
      {/* <HeadlineSlider /> */}
      <TimeLineBlock />
      <Navblock />
    </div>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {

  const client = getClient(true);

  const post_query = `
    *[_type=="post" && featured&&!(_id in path("drafts.**"))]|order(_updatedAt desc){
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
      description
    }
  `
  const category_query = `
    *[_type=="category"&&!(_id in path("drafts.**"))]|order(order asc){
      title, slug, _id,
      subcategory[]->{
        _id,
        slug,
		order,
        title
      }
    }
  `

  const headlinePosts: Post[] = await client.fetch(post_query)
  const categories: Category[] = await client.fetch(category_query)

  fs.writeFile("categories.json", JSON.stringify(categories), (e) => { console.log(e) })

  return {
    props: {
      posts: headlinePosts,
      categories: categories
    }
  }
}



export default Home
