import Header from '../components/Header'
import { GetStaticProps } from "next";
import { Category, Post, StaticProps } from "../models/sanityModel"
import { getClient } from "../utils/sanity"
import Hero from '../components/Hero';
import PostSlider from '../components/PostSlider';
import Navblock from '../components/Navblock';
import fs from "fs"


const Home = ({ posts, categories }: StaticProps) => {


	return (
		<div className='max-w-7xl mx-auto '>
			<Hero />
			<PostSlider headlinePosts={posts} />
			{/* <HeadlineSlider /> */}
			<Navblock />
		</div>
	)
}


export const getStaticProps: GetStaticProps = async (context) => {

	const client = getClient(true);

	const post_query = `
    *[_type=="post" && featured]|order(_updatedAt desc){
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
    }[0...4]
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
