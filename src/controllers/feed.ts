import { Request, Response } from "express"
import { Pool } from "pg"

//prettier-ignore
export async function getFeed(request:Request, response: Response) : Promise<void>{
  const {recipeName, ingredients, directions, notes} = request.body
  console.log(recipeName)
  console.log(request.cookies.accessToken)
  let client

  const pool = new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
	})
  try {
    client = await pool.connect()
    const getAllRecipePostsQuery = "SELECT * FROM recipe_posts"
    // const values = []

    const allRecipePosts = await client.query(getAllRecipePostsQuery)
    console.log(allRecipePosts.rows)
    response.send(allRecipePosts.rows)

  } catch (error) {
    console.log(error)
  }finally{
    client?.release()
  }

  
}

//prettier-ignore
export async function addRecipePost(request : Request, response: Response): Promise<void> {
  const {recipeName, ingredients, directions, notes, user_id} = request.body
  console.log(recipeName)
  console.log(user_id)
  console.log(request.cookies.accessToken)
  let client

  const pool = new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
	})
  try {
    client = await pool.connect()
    // const userQuery = "SELECT FROM users WHERE"
    // const selectCurrentUser = client.query()
    const addRecipePostQuery = "INSERT INTO recipe_posts(recipe_name, ingredients, directions, notes, user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *"
    const values = [recipeName, ingredients, directions, notes, user_id]

    const addRecipePost = await client.query(addRecipePostQuery, values)
    console.log(addRecipePost.rows)
    response.send(addRecipePost.rows)

  } catch (error) {
    console.log(error)
  }finally{
    client?.release()
  }
}
