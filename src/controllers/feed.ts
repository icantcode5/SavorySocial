import { Request, Response } from "express"
import { Pool } from "pg"

//prettier-ignore
export async function getFeed(request:Request, response: Response) : Promise<void>{
  let client

  const pool = new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
	})
  try {
    client = await pool.connect()
    const getAllRecipePostsQuery = "SELECT * FROM recipe_posts ORDER BY created_at DESC"

    const allRecipePosts = await client.query(getAllRecipePostsQuery)
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
  let client

  const pool = new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
	})
  try {
    client = await pool.connect()

    const addRecipePostQuery = "INSERT INTO recipe_posts(recipe_name, ingredients, directions, notes, user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *"
    const values = [recipeName, ingredients, directions, notes, user_id]

    const addRecipePost = await client.query(addRecipePostQuery, values)
    response.send(addRecipePost.rows)

  } catch (error) {
    console.log(error)
  }finally{
    client?.release()
  }
}

//prettier-ignore
export async function deleteRecipePost(request:Request, response:Response): Promise<void>{
  const { id} = request.params
  console.log(id)
  let client

  const pool = new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
	})
  try {
    client = await pool.connect()

    const deleteRecipePostQuery = "DELETE FROM recipe_posts WHERE post_id=$1"
    const value = [id]

    const deleteRecipePost = await client.query(deleteRecipePostQuery, value)
    response.send({message : "Successfully deleted recipe post!"})

  } catch (error) {
    console.log(error)
  }finally{
    client?.release()
  }
}
