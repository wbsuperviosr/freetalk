import { getClient } from "./sanity"

async function getMenuItems() {
	const client = getClient(true);

	const category_query = `
    *[_type=="category"&&!(_id in path("drafts.**"))]|order(order asc){
      title, slug, _id,
      subcategory[]->{
        _id,
        slug,
        title
      }
    }
  `
	const cateogries = client.fetch(category_query)
	return cateogries;
}



module.exports = async () => {
	const menuItems = await getMenuItems() // gets items from db or api
	return {
		// cacheable: true,
		code: `module.exports = ${JSON.stringify(menuItems)}`
	}
}